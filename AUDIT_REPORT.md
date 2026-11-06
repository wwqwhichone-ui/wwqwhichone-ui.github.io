# Engineering Audit Report: Personal AI & Robotics Portfolio

**Audited Repository**: `wwqwhichone-ui.github.io`  
**Candidate**: Wang Weiqi (MSc in Robotics & Intelligent Systems, HKU)  
**Target Roles**: Robotics Software Engineer, AI / LLM Application Engineer, Embodied AI Engineer  
**Audit Lead**: Principal Full-Stack Engineer + QA Automation Lead  
**Audit Date**: November 2026  
**Status**: Sprint 1 Active (P0/P1 in Progress)

---

## Executive Summary

The initial version of the portfolio successfully validated that the Astro static architecture, TypeScript data models, and baseline test suites are functional. However, transitioning the portfolio into a **production-ready, recruiter-grade showcase for top-tier Robotics & AI teams** requires systematic resolution of key engineering and UX gaps.

This document classifies all findings by priority, defines root causes, specifies technical fixes, and tracks verification status.

---

## Issue Matrix by Priority

| ID | Priority | Category | Issue Description | Status |
| :--- | :--- | :--- | :--- | :--- |
| **P0-1** | **P0** | i18n / Hydration | Language sync flash on initial load and partial translation in path planning demo | 🟢 Resolved & Verified |
| **P0-2** | **P0** | UI / Architecture | Project deep dive pages lack visual architectural schematics (text-only pre blocks) | 🟢 Resolved & Verified |
| **P0-3** | **P0** | Content Integrity | Resume placeholders lack clear `[Needs User Input]` indicators for pending user credentials | 🟢 Resolved & Verified |
| **P1-1** | **P1** | Hiring UX | Hero section lacks recruiter quick-scan summary and instant copyable contact handles | 🟢 Resolved & Verified |
| **P1-2** | **P1** | Search & Filter | Projects catalog lacks dynamic result counter, category count badges, and filter reset | 🟢 Resolved & Verified |
| **P1-3** | **P1** | Evidence Grounding| Skills matrix lacks direct 1-click links to verifying repository code/tests | 🟢 Resolved & Verified |
| **P2-1** | **P2** | A11y & Visuals | Keyboard `:focus-visible` states and card hover micro-interactions need refinement | 🟢 Resolved & Verified |
| **P2-2** | **P2** | Mobile UX | Navigation bar on narrow devices (<480px) needs better layout and touch targets | 🟢 Resolved & Verified |
| **P2-3** | **P2** | Demo Feature | Path planning demo lacks real-time comparative benchmark metrics overlay | 🟢 Resolved & Verified |
| **P3-1** | **P3** | Documentation | Missing formal `CHANGELOG.md`, `TEST_REPORT.md`, `RELEASE_CHECKLIST.md` & `README.md` update | 🟢 Resolved & Verified |
| **P3-2** | **P3** | QA Automation | Test matrix needs expansion to cover i18n key consistency and route generation | 🟢 Resolved & Verified |

---

## Detailed Root Cause Analysis & Action Plans

### P0-1: i18n Synchronization & Complete Demo Localization
* **Root Cause**: Language preference was stored in `localStorage`, but DOM text replacement ran post-hydration in `LanguageToggle.astro`. This caused a noticeable text flash from English to Chinese on initial page load if `'zh'` was selected. Furthermore, `/demo/path-planning.astro` had hardcoded English labels in toolbar radio buttons and stats displays.
* **Fix**:
  1. Add pre-paint text swap logic to `<head>` inline script in `Base.astro`.
  2. Implement dual-class CSS rules (`.i18n-en` and `.i18n-zh`) for zero-flash instantaneous rendering.
  3. Fully localize all controls, legends, and status notes in `/demo/path-planning.astro`.

### P0-2: Rich Visual Architecture Schematics for Core Projects
* **Root Cause**: `src/pages/projects/[slug].astro` used a basic `<pre class="architecture-flow mono">` to output architecture strings. Recruiters assessing complex robotics pipelines (e.g. LLM 3-layer validation, kinematics Jacobians, occupancy grid collision checks) need clear visual diagrams.
* **Fix**:
  1. Create modular SVG architecture components:
     - `LLMPlannerArch.astro`: Speech $\rightarrow$ Intent Parser $\rightarrow$ 3-Layer Validation (Schema, Grounding, Dry-run) $\rightarrow$ Robot Interface.
     - `KinematicsArch.astro`: Standard DH $\rightarrow$ Forward Kinematics $\rightarrow$ Geometric Jacobian $\rightarrow$ DLS IK with Singularity Damping $\rightarrow$ Quintic Joint Trajectory.
     - `PathPlanningArch.astro`: Occupancy Grid $\rightarrow$ Disk Inflation $\rightarrow$ Search (A*) vs Sampling (RRT*) $\rightarrow$ LOS Shortcutting $\rightarrow$ Waypoints.
     - `DissertationArch.astro`: Voice Intent $\rightarrow$ Confidence Check $\rightarrow$ Dialogue Confirmation $\rightarrow$ Decomposition $\rightarrow$ Mobile Base + Arm Control.
  2. Render the matching SVG diagram in each project's deep dive page.

### P0-3: Strict "Needs User Input" Labeling on Unconfirmed Resume Items
* **Root Cause**: To maintain absolute honesty, unconfirmed items (commercial internships, specific GPA, formal award lists, and LinkedIn URL) must be explicitly flagged so recruiters know they are intentionally pending user confirmation.
* **Fix**:
  1. Add visible, stylish `[Needs User Input]` badges on placeholder sections.
  2. Add developer comments and structured fields in `src/data/profile.ts` so the user can easily update them.

---

## Verification Strategy & Exit Criteria
1. `npm run check` (Astro Check): 0 errors, 0 warnings.
2. `npm test` (Vitest): 100% pass rate across expanded test matrix.
3. `npm run build`: All static pages compile cleanly with zero broken links.
4. Preview server check: All routes return HTTP 200 with proper responsive layouts.
5. All 4 release documents created: `AUDIT_REPORT.md`, `CHANGELOG.md`, `TEST_REPORT.md`, `RELEASE_CHECKLIST.md`.
