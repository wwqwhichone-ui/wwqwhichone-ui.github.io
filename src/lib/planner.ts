/**
 * Browser port of the grid planners from mobile-robot-path-planning (A* / Dijkstra / RRT).
 * Pure functions, no DOM, so they can be unit-tested with vitest.
 */

export interface Cell {
  x: number;
  y: number;
}

export interface Grid {
  width: number;
  height: number;
  /** row-major, true = occupied */
  occupied: boolean[];
}

export interface SearchResult {
  path: Cell[] | null;
  /** cells in the order they were closed (for animation) */
  expandedOrder: Cell[];
  length: number;
}

export interface RRTResult {
  path: Array<[number, number]> | null;
  edges: Array<[[number, number], [number, number]]>;
  length: number;
  nodes: number;
}

const SQRT2 = Math.SQRT2;
const MOVES: Array<[number, number]> = [
  [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1],
];

export function makeGrid(width: number, height: number): Grid {
  return { width, height, occupied: new Array<boolean>(width * height).fill(false) };
}

export function isFree(g: Grid, x: number, y: number): boolean {
  return x >= 0 && y >= 0 && x < g.width && y < g.height && !g.occupied[y * g.width + x];
}

export function octile(a: Cell, b: Cell): number {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  return dx + dy + (SQRT2 - 2) * Math.min(dx, dy);
}

/** Minimal binary heap keyed on f, with insertion order as tie-breaker. */
class Heap {
  private items: Array<[number, number, number]> = []; // [f, seq, index]
  private seq = 0;
  get size(): number {
    return this.items.length;
  }
  push(f: number, index: number): void {
    const a = this.items;
    a.push([f, this.seq++, index]);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (less(a[i]!, a[p]!)) {
        [a[i], a[p]] = [a[p]!, a[i]!];
        i = p;
      } else break;
    }
  }
  pop(): number {
    const a = this.items;
    const top = a[0]!;
    const last = a.pop()!;
    if (a.length) {
      a[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1;
        const r = l + 1;
        let m = i;
        if (l < a.length && less(a[l]!, a[m]!)) m = l;
        if (r < a.length && less(a[r]!, a[m]!)) m = r;
        if (m === i) break;
        [a[i], a[m]] = [a[m]!, a[i]!];
        i = m;
      }
    }
    return top[2];
  }
}

function less(a: [number, number, number], b: [number, number, number]): boolean {
  return a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
}

/** A* with octile heuristic on an 8-connected grid, no corner cutting. weight 0 = Dijkstra. */
export function astar(g: Grid, start: Cell, goal: Cell, weight = 1): SearchResult {
  const empty: SearchResult = { path: null, expandedOrder: [], length: Infinity };
  if (!isFree(g, start.x, start.y) || !isFree(g, goal.x, goal.y)) return empty;
  const n = g.width * g.height;
  const gScore = new Float64Array(n).fill(Infinity);
  const parent = new Int32Array(n).fill(-1);
  const closed = new Uint8Array(n);
  const idx = (x: number, y: number) => y * g.width + x;
  const s = idx(start.x, start.y);
  const t = idx(goal.x, goal.y);
  gScore[s] = 0;
  const open = new Heap();
  open.push(weight * octile(start, goal), s);
  const order: Cell[] = [];

  while (open.size) {
    const cur = open.pop();
    if (closed[cur]) continue;
    closed[cur] = 1;
    const cx = cur % g.width;
    const cy = (cur - cx) / g.width;
    order.push({ x: cx, y: cy });
    if (cur === t) {
      const path: Cell[] = [];
      for (let k = cur; k !== -1; k = parent[k]!) path.push({ x: k % g.width, y: Math.floor(k / g.width) });
      path.reverse();
      return { path, expandedOrder: order, length: gScore[t]! };
    }
    for (const [dx, dy] of MOVES) {
      const nx = cx + dx;
      const ny = cy + dy;
      if (!isFree(g, nx, ny)) continue;
      if (dx && dy && !(isFree(g, cx + dx, cy) && isFree(g, cx, cy + dy))) continue;
      const ni = idx(nx, ny);
      if (closed[ni]) continue;
      const ng = gScore[cur]! + (dx && dy ? SQRT2 : 1);
      if (ng < gScore[ni]!) {
        gScore[ni] = ng;
        parent[ni] = cur;
        open.push(ng + weight * octile({ x: nx, y: ny }, goal), ni);
      }
    }
  }
  return { ...empty, expandedOrder: order };
}

/** Deterministic PRNG (mulberry32) so demo runs are reproducible from a seed. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function segmentFree(g: Grid, a: [number, number], b: [number, number], step = 0.2): boolean {
  const n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / step));
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    if (!isFree(g, Math.floor(a[0] + t * (b[0] - a[0])), Math.floor(a[1] + t * (b[1] - a[1])))) return false;
  }
  return true;
}

/** Plain RRT in continuous cell coordinates; returns at the first connection to the goal. */
export function rrt(
  g: Grid,
  start: Cell,
  goal: Cell,
  opts: { maxIter?: number; step?: number; goalBias?: number; seed?: number } = {},
): RRTResult {
  const { maxIter = 6000, step = 1.5, goalBias = 0.08, seed = 1 } = opts;
  const rand = mulberry32(seed);
  const s: [number, number] = [start.x + 0.5, start.y + 0.5];
  const t: [number, number] = [goal.x + 0.5, goal.y + 0.5];
  const xs: Array<[number, number]> = [s];
  const parent: number[] = [-1];
  const edges: RRTResult['edges'] = [];
  if (!isFree(g, start.x, start.y) || !isFree(g, goal.x, goal.y)) return { path: null, edges, length: Infinity, nodes: 0 };

  for (let it = 0; it < maxIter; it++) {
    const sample: [number, number] = rand() < goalBias ? t : [rand() * g.width, rand() * g.height];
    let best = 0;
    let bestD = Infinity;
    for (let i = 0; i < xs.length; i++) {
      const d = (xs[i]![0] - sample[0]) ** 2 + (xs[i]![1] - sample[1]) ** 2;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    const from = xs[best]!;
    const d = Math.sqrt(bestD);
    const to: [number, number] =
      d <= step ? sample : [from[0] + ((sample[0] - from[0]) * step) / d, from[1] + ((sample[1] - from[1]) * step) / d];
    if (!segmentFree(g, from, to)) continue;
    xs.push(to);
    parent.push(best);
    edges.push([from, to]);
    if (Math.hypot(to[0] - t[0], to[1] - t[1]) <= 1 && segmentFree(g, to, t)) {
      const path: Array<[number, number]> = [t];
      for (let k = xs.length - 1; k !== -1; k = parent[k]!) path.push(xs[k]!);
      path.reverse();
      return { path, edges, length: polylineLength(path), nodes: xs.length };
    }
  }
  return { path: null, edges, length: Infinity, nodes: xs.length };
}

export function polylineLength(pts: Array<[number, number]>): number {
  let s = 0;
  for (let i = 1; i < pts.length; i++) s += Math.hypot(pts[i]![0] - pts[i - 1]![0], pts[i]![1] - pts[i - 1]![1]);
  return s;
}

/** Warehouse-like preset: shelf blocks with aisles. */
export function warehousePreset(width = 40, height = 24): { grid: Grid; start: Cell; goal: Cell } {
  const grid = makeGrid(width, height);
  const block = (x0: number, y0: number, x1: number, y1: number) => {
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) grid.occupied[y * width + x] = true;
  };
  for (const y0 of [4, 10, 16]) for (let x0 = 5; x0 + 5 <= width - 4; x0 += 8) block(x0, y0, x0 + 5, y0 + 3);
  block(0, 21, 14, 22);
  return { grid, start: { x: 2, y: 22 }, goal: { x: width - 3, y: 1 } };
}
