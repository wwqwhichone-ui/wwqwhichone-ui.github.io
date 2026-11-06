import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { profile, publicContact } from '../src/data/profile';
import { projects } from '../src/data/projects';

/**
 * Every quantitative result shown on the site must come from a source the
 * reader can check. Add the source here when adding a new number.
 */
const EVIDENCE: Record<string, string> = {
  '24': 'llm-robot-task-planner CI: 24 passed',
  '21': 'robot-arm-kinematics CI: 21 passed',
  '19': 'mobile-robot-path-planning CI: 19 passed',
  '97.0%': 'robot-arm-kinematics README, benchmark_ik.py --n 500, restarts=5',
  '500': 'robot-arm-kinematics README, benchmark_ik.py --n 500',
  '5': 'robot-arm-kinematics README, restarts=5',
  '13.1 ms': 'robot-arm-kinematics README, restarts=5',
  '6.1 ms': 'robot-arm-kinematics README, restarts=0',
  '18.22 m': 'mobile-robot-path-planning README, warehouse table, A*/Dijkstra',
  '17.46 m': 'mobile-robot-path-planning README, warehouse table, A* + shortcut',
  '202': 'mobile-robot-path-planning README, warehouse table, A* expanded',
  '1045': 'mobile-robot-path-planning README, warehouse table, Dijkstra expanded',
  '15': 'portfolio: astro build reports 15 pages / warehouse map 15 m wide',
  '9 m': 'mobile-robot-path-planning README, warehouse 15.0 × 9.0 m',
  '33': 'portfolio: vitest reports 33 tests passed across 4 suites',
};

const NUMBER = /\d+(?:\.\d+)?\s?(?:%|ms|m\b|毫秒)?/g;

function results(lang: 'en' | 'zh') {
  return projects.flatMap((p) => (lang === 'en' ? p.results : p.resultsZh).map((r) => ({ slug: p.slug, r })));
}

describe('project results are evidence-backed', () => {
  it('every number in a result has a recorded source', () => {
    const known = new Set(Object.keys(EVIDENCE).map((k) => k.replace(/\s/g, '')));
    const missing: string[] = [];
    for (const lang of ['en', 'zh'] as const) {
      for (const { slug, r } of results(lang)) {
        const cleaned = r.replace(/--seeds \d+|3\.1[02]|×/g, ' ');
        for (const m of cleaned.match(NUMBER) ?? []) {
          const token = m.replace(/\s/g, '').replace('毫秒', 'ms');
          const bare = token.replace(/(ms|m)$/, '');
          if (!known.has(token) && !known.has(bare)) missing.push(`${slug} [${lang}]: "${m}" in "${r}"`);
        }
      }
    }
    expect(missing).toEqual([]);
  });

  it('regression: numbers that contradicted the source repos stay removed', () => {
    const text = JSON.stringify(projects);
    for (const bad of ['17.56', '< 8ms', '8 毫秒', '> 60%', '60% 以上', '100/100', 'Lighthouse', 'hardware-level']) {
      expect(text, bad).not.toContain(bad);
    }
  });
});

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

describe('site copy', () => {
  it('has no unverifiable absolute claims in page sources', () => {
    const banned = [/100% Runnable/, /Zero fake claims/, /100% Verified/, /Perfect 100/];
    for (const file of walk('src').filter((f) => /\.(astro|ts)$/.test(f))) {
      const src = readFileSync(file, 'utf8');
      for (const re of banned) expect(src, `${file} ${re}`).not.toMatch(re);
    }
  });

  it('never renders placeholder contact links', () => {
    for (const c of publicContact) {
      expect(c.href).not.toMatch(/placeholder/i);
      if (c.label === 'Email') expect(c.href).toMatch(/^mailto:/);
    }
    expect(publicContact.length).toBeGreaterThan(0);
  });

  it('uses the confirmed Chinese name', () => {
    expect(profile.nameZh).toContain('王威淇');
  });
});
