import { describe, expect, it } from 'vitest';
import { astar, isFree, makeGrid, mulberry32, octile, rrt, segmentFree, warehousePreset } from '../src/lib/planner';

function wall(g: ReturnType<typeof makeGrid>, x: number, y0: number, y1: number) {
  for (let y = y0; y < y1; y++) g.occupied[y * g.width + x] = true;
}

describe('astar', () => {
  it('finds the straight-line optimum', () => {
    const g = makeGrid(10, 1);
    const r = astar(g, { x: 0, y: 0 }, { x: 9, y: 0 });
    expect(r.length).toBeCloseTo(9);
    expect(r.path).toHaveLength(10);
  });

  it('matches Dijkstra cost with fewer expansions on the preset', () => {
    const { grid, start, goal } = warehousePreset();
    const a = astar(grid, start, goal);
    const d = astar(grid, start, goal, 0);
    expect(a.path).not.toBeNull();
    expect(a.length).toBeCloseTo(d.length, 9);
    expect(a.expandedOrder.length).toBeLessThan(d.expandedOrder.length);
  });

  it('returns null when the goal is walled off', () => {
    const g = makeGrid(5, 3);
    wall(g, 2, 0, 3);
    expect(astar(g, { x: 0, y: 1 }, { x: 4, y: 1 }).path).toBeNull();
  });

  it('does not cut corners', () => {
    const g = makeGrid(2, 2);
    g.occupied[1] = true; // (1,0)
    g.occupied[2] = true; // (0,1)
    expect(astar(g, { x: 0, y: 0 }, { x: 1, y: 1 }).path).toBeNull();
  });

  it('every path cell is free', () => {
    const { grid, start, goal } = warehousePreset();
    for (const c of astar(grid, start, goal).path ?? []) expect(isFree(grid, c.x, c.y)).toBe(true);
  });
});

describe('octile', () => {
  it('is exact for diagonal and mixed moves', () => {
    expect(octile({ x: 0, y: 0 }, { x: 3, y: 3 })).toBeCloseTo(3 * Math.SQRT2);
    expect(octile({ x: 0, y: 0 }, { x: 4, y: 1 })).toBeCloseTo(3 + Math.SQRT2);
  });
});

describe('rrt', () => {
  it('is reproducible and collision-free on the preset', () => {
    const { grid, start, goal } = warehousePreset();
    const a = rrt(grid, start, goal, { seed: 7 });
    const b = rrt(grid, start, goal, { seed: 7 });
    expect(a.path).not.toBeNull();
    expect(a.path).toEqual(b.path);
    const p = a.path!;
    for (let i = 1; i < p.length; i++) expect(segmentFree(grid, p[i - 1]!, p[i]!)).toBe(true);
  });

  it('is never shorter than the A* lower bound minus diagonal slack', () => {
    const { grid, start, goal } = warehousePreset();
    const a = astar(grid, start, goal);
    const r = rrt(grid, start, goal, { seed: 3 });
    expect(r.length).toBeGreaterThan(a.length * 0.9);
  });

  it('fails cleanly when disconnected', () => {
    const g = makeGrid(6, 4);
    wall(g, 3, 0, 4);
    const r = rrt(g, { x: 0, y: 0 }, { x: 5, y: 3 }, { maxIter: 300 });
    expect(r.path).toBeNull();
    expect(r.length).toBe(Infinity);
  });
});

describe('mulberry32', () => {
  it('produces values in [0, 1) deterministically', () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    for (let i = 0; i < 100; i++) {
      const v = a();
      expect(v).toBe(b());
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});
