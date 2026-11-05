import { describe, expect, it } from 'vitest';
import { profile } from '../src/data/profile';
import { projects } from '../src/data/projects';
import { isActive, withBase } from '../src/lib/url';

describe('projects data', () => {
  it('has unique slugs', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('only links demos and repos with https URLs', () => {
    for (const p of projects) {
      if (p.repo) expect(p.repo).toMatch(/^https:\/\/github\.com\//);
      if (p.demo) expect(p.demo).toMatch(/^(https:\/\/|demo\/)/);
    }
  });

  it('does not claim a public repo for the private dissertation project', () => {
    const diss = projects.find((p) => p.slug === 'voice-controlled-mobile-manipulator');
    expect(diss?.repo).toBeUndefined();
    expect(diss?.status).toBe('In progress');
  });

  it('features at least one project', () => {
    expect(projects.some((p) => p.featured)).toBe(true);
  });
});

describe('demo links', () => {
  it('internal demos point at a page that exists', async () => {
    const { existsSync } = await import('node:fs');
    for (const p of projects.filter((x) => x.demo && !x.demo.startsWith('https://'))) {
      const page = `src/pages/${p.demo!.replace(/\/$/, '')}.astro`;
      expect(existsSync(page), page).toBe(true);
    }
  });
});

describe('profile data', () => {
  it('does not publish an email address or phone number', () => {
    const text = JSON.stringify(profile);
    expect(text).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+/);
    expect(text).not.toMatch(/\+?\d[\d\s-]{8,}\d/);
  });

  it('keeps the resume placeholder until a real file is added', () => {
    expect(typeof profile.resume.available).toBe('boolean');
  });
});

describe('url helpers', () => {
  it('prefixes paths with the base', () => {
    expect(withBase('projects/', '/')).toBe('/projects/');
    expect(withBase('/projects/', '/portfolio')).toBe('/portfolio/projects/');
    expect(withBase('', '/portfolio/')).toBe('/portfolio/');
  });

  it('matches active nav items with or without trailing slash', () => {
    expect(isActive('/projects', '/projects/')).toBe(true);
    expect(isActive('/', '/')).toBe(true);
    expect(isActive('/about/', '/projects/')).toBe(false);
  });
});
