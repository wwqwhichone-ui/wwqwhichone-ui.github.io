export type Lang = 'en' | 'zh';

/** Normalise any stored or attribute value to a supported language. */
export function resolveLang(value: string | null | undefined): Lang {
  return value === 'zh' ? 'zh' : 'en';
}

interface TranslatableElement {
  getAttribute(name: string): string | null;
  dataset: { i18nTarget?: string };
  children: { length: number };
  textContent: string | null;
  placeholder?: string;
}

/** Minimal slice of `Document` used here, so the logic can be unit-tested without a DOM library. */
export interface LangDocument {
  documentElement: { dataset: { lang?: string }; lang: string };
  querySelectorAll(selector: string): Iterable<TranslatableElement>;
}

/**
 * Apply `lang` to every element carrying both `data-en` and `data-zh`.
 * Must run on every page load, not only on toggle clicks, or a saved
 * preference is lost after navigation or refresh.
 */
export function applyLanguage(doc: LangDocument, lang: Lang): void {
  doc.documentElement.dataset.lang = lang;
  doc.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  for (const el of doc.querySelectorAll('[data-en][data-zh]')) {
    const text = el.getAttribute(lang === 'zh' ? 'data-zh' : 'data-en');
    if (!text) continue;
    if (el.dataset.i18nTarget === 'placeholder' && 'placeholder' in el) {
      el.placeholder = text;
    } else if (el.children.length === 0) {
      el.textContent = text;
    }
  }
}
