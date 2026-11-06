import { describe, expect, it } from 'vitest';
import { applyLanguage, resolveLang, type LangDocument } from '../src/lib/lang';

function el(en: string, zh: string, opts: { children?: number; placeholder?: boolean } = {}) {
  const attrs: Record<string, string> = { 'data-en': en, 'data-zh': zh };
  const node: any = {
    getAttribute: (n: string) => attrs[n] ?? null,
    dataset: opts.placeholder ? { i18nTarget: 'placeholder' } : {},
    children: { length: opts.children ?? 0 },
    textContent: en,
  };
  if (opts.placeholder) node.placeholder = en;
  return node;
}

function fakeDoc(elements: any[], lang = 'en'): LangDocument {
  return {
    documentElement: { dataset: { lang }, lang: 'en' },
    querySelectorAll: () => elements,
  };
}

describe('resolveLang', () => {
  it('only accepts zh, everything else falls back to en', () => {
    expect(resolveLang('zh')).toBe('zh');
    expect(resolveLang('en')).toBe('en');
    expect(resolveLang(null)).toBe('en');
    expect(resolveLang('fr')).toBe('en');
  });
});

describe('applyLanguage', () => {
  it('swaps text of leaf elements and sets html lang', () => {
    const h1 = el("Things I'm building", '实际构建的项目与工程');
    const doc = fakeDoc([h1]);
    applyLanguage(doc, 'zh');
    expect(h1.textContent).toBe('实际构建的项目与工程');
    expect(doc.documentElement.lang).toBe('zh-CN');
    expect(doc.documentElement.dataset.lang).toBe('zh');
  });

  it('updates input placeholders and leaves elements with children intact', () => {
    const input = el('Search', '搜索', { placeholder: true });
    const wrapper = el('Wrapper', '容器', { children: 2 });
    applyLanguage(fakeDoc([input, wrapper]), 'zh');
    expect(input.placeholder).toBe('搜索');
    expect(wrapper.textContent).toBe('Wrapper');
  });

  it('regression: a saved zh preference is re-applied on a fresh page load', () => {
    // The head script sets data-lang="zh" before paint; the component must then
    // translate the text, otherwise the page shows English with a "中" button.
    const h1 = el("Things I'm building", '实际构建的项目与工程');
    const doc = fakeDoc([h1], 'zh');
    applyLanguage(doc, resolveLang(doc.documentElement.dataset.lang));
    expect(h1.textContent).toBe('实际构建的项目与工程');
  });
});
