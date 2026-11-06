# Test & Quality Verification Report

**Project**: Weiqi Wang — Personal Developer Portfolio & Research Hub (`wwqwhichone-ui.github.io`)  
**Testing Framework**: Vitest v5.1.0, Astro Check, TypeScript v6.0.3  
**Date**: November 2026  
**Status**: Passing

---

## 1. Test Execution Summary

| Test Suite | File Path | Total Tests | Passed | Failed |
| :--- | :--- | :--- | :--- | :--- |
| **Astro & TypeScript Diagnostics** | All `.astro`, `.ts` files | 30 files | 30 | 0 |
| **Data Integrity & Authenticity** | `tests/data.test.ts` | 13 | 13 | 0 |
| **Path Planning Algorithm Suite** | `tests/planner.test.ts` | 10 | 10 | 0 |
| **i18n Language Persistence** | `tests/lang.test.ts` | 4 | 4 | 0 |
| **Content Evidence Verification** | `tests/content.test.ts` | 6 | 6 | 0 |
| **Static Production Build** | `astro build` | 15 routes | 15 | 0 |
| **Total** | | **33 tests + 15 routes** | **33** | **0** |

---

## 2. Detailed Test Cases & Assertions

### Suite A: Data Integrity & Anti-Hallucination Policy (`tests/data.test.ts`)
* `has unique slugs`: Asserts all project identifiers are strictly unique without collision.
* `only links demos and repos with https URLs`: Enforces HTTPS protocols on all external repositories and legitimate relative demo links.
* `does not claim a public repo for the private dissertation project`: Asserts that `voice-controlled-mobile-manipulator` is strictly private with `repo: undefined` and `status: 'In progress'`.
* `features at least one project`: Verifies featured project array is populated for the home page.
* `provides bilingual title and overview for every project`: Asserts English and Chinese titles, problem statements, architectures, and overviews are fully defined.
* `assigns valid categories to all projects`: Validates project categories match the strict enum (`Robotics`, `Artificial Intelligence`, `LLM & AI Agent`, `Software Engineering`, `Automation`, `Academic Projects`).
* `internal demos point at a page that exists`: Verifies file existence for all internal demo targets (`src/pages/demo/path-planning.astro`).
* `does not publish an email address or phone number`: Regex assertion guarding against accidental exposure of unconfirmed private contact details.
* `keeps the resume placeholder until a real file is added`: Verifies `profile.resume.available` boolean flag.
* `contains honest skills categorized with using or learning levels`: Verifies that all skill entries define valid proficiency levels (`using` or `learning`) and that all `projectSlug` links resolve to existing projects.
* `verifies every project has comprehensive technical details`: Asserts non-empty arrays for contributions, challenges, results, and features in both English and Chinese.
* `prefixes paths with the base`: Tests `withBase` URL utility under root `/` and subpath `/portfolio`.
* `matches active nav items with or without trailing slash`: Validates navigation highlighting logic.

### Suite B: Robotics & Path Planning Algorithms (`tests/planner.test.ts`)
* `astar: finds the straight-line optimum`: Verifies A* yields the mathematical straight-line distance on empty grids.
* `astar: matches Dijkstra cost with fewer expansions on the preset`: Validates that heuristic guidance in A* reduces expanded nodes by >5x while matching Dijkstra's optimal path cost.
* `astar: returns null when the goal is walled off`: Validates complete obstacle containment handling.
* `astar: does not cut corners`: Asserts diagonal obstacle vertices are blocked to prevent diagonal pass-through.
* `astar: every path cell is free`: Asserts zero collision intersections across all returned path coordinates.
* `octile: is exact for diagonal and mixed moves`: Tests mathematical fidelity of the Octile distance formula.
* `rrt: is reproducible and collision-free on the preset`: Validates deterministic seeded RNG and continuous segment collision safety.
* `rrt: is never shorter than the A* lower bound minus diagonal slack`: Asserts geometric lower bound consistency.
* `rrt: fails cleanly when disconnected`: Verifies graceful failure and infinity cost on disconnected goals.
* `mulberry32: produces values in [0, 1) deterministically`: Validates PRNG uniform distribution.

### Suite C: i18n Language Persistence (`tests/lang.test.ts`)
* `resolveLang`: Normalises stored or attribute values to a supported language.
* `applyLanguage`: Swaps text of leaf elements, updates input placeholders, and preserves elements with children.
* `preference persistence`: Re-applies saved language choice across page navigation and reloads.

### Suite D: Content Evidence Verification (`tests/content.test.ts`)
* `recorded evidence`: Verifies all quantitative results map to a documented, inspectable source in the repository.
* `regression guard`: Guarantees unverified or contradictory metrics stay removed.
* `unverifiable claims`: Prevents absolute marketing claims in page sources.
* `contact verification`: Asserts only valid, public contact links are rendered.
* `name verification`: Verifies candidate Chinese name matches confirmed identity.
* `metric verification`: Dynamically asserts homepage Vitest counter matches total test cases across test files.

---

## 3. Production Build & Route Verification

Static routes generated by `astro build`:
* `dist/index.html` (Home)
* `dist/about/index.html` (About)
* `dist/projects/index.html` (Projects Catalog)
* `dist/projects/llm-robot-task-planner/index.html` (Deep Dive)
* `dist/projects/robot-arm-kinematics/index.html` (Deep Dive)
* `dist/projects/mobile-robot-path-planning/index.html` (Deep Dive)
* `dist/projects/voice-controlled-mobile-manipulator/index.html` (Deep Dive)
* `dist/projects/robotics-learning/index.html` (Deep Dive)
* `dist/projects/ai-agent-experiments/index.html` (Deep Dive)
* `dist/projects/wwqwhichone-ui.github.io/index.html` (Deep Dive)
* `dist/skills/index.html` (Skills Matrix)
* `dist/research/index.html` (MSc Research)
* `dist/resume/index.html` (Resume & Credentials)
* `dist/demo/path-planning/index.html` (Interactive Simulator)
* `dist/404.html` (Custom 404)
* `dist/sitemap-index.xml` (Automated SEO Sitemap)

All routes were probed via local HTTP preview (`astro preview --background`) and verified with **HTTP 200 OK**.
