/** Prefix an internal path with the configured base (needed for project-site GitHub Pages). */
export function withBase(path: string, base: string = import.meta.env.BASE_URL): string {
  const b = base.endsWith('/') ? base : `${base}/`;
  const p = path.replace(/^\/+/, '');
  return `${b}${p}`;
}

/** True when `current` (a pathname) is the page for nav item `href`. */
export function isActive(current: string, href: string): boolean {
  const norm = (s: string) => (s.length > 1 ? s.replace(/\/+$/, '') : s);
  return norm(current) === norm(href);
}
