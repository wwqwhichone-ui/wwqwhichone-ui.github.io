# Changelog

All notable changes to the **Weiqi Wang — Personal AI & Robotics Developer Portfolio** are documented in this file.
The project adheres to [Semantic Versioning](https://semver.org/).

---

## [0.2.0] — 2026-11-07

### 🚀 Major Improvements & Sprint Features
* **Bilingual i18n Architecture (EN / 中文)**:
  * Implemented zero-flash instant language switching (`LanguageToggle.astro`) powered by dual CSS rules (`html[data-lang="zh"] .i18n-en { display: none !important; }`).
  * Pre-paint synchronization in `<head>` preventing language layout shift on initial load.
  * Added dual-language support to the interactive path planning canvas demo.
* **Recruiter-Focused Hero Section**:
  * Added "At a Glance" candidate summary card highlighting HKU MSc degree, NWPU Engineering Mechanics foundation, active job search targets, and 100% verified test metrics.
  * Streamlined quick-action CTAs for instant project exploration and resume access.
* **Interactive Architecture Schematics for Core Projects**:
  * Created `ProjectArchitectureDiagram.astro` with custom, high-fidelity SVGs:
    * `llm-robot-task-planner`: 3-layer safety air-gap (JSON Schema Draft 2020-12 $\rightarrow$ Spatial Grounding $\rightarrow$ Precondition State Machine).
    * `robot-arm-kinematics`: Numerical DLS Inverse Kinematics loop with Levenberg-Marquardt damping, random restarts, and SO(3) matrix logarithms.
    * `mobile-robot-path-planning`: 2D Occupancy grid inflation, A* vs RRT* dual-engine comparison, and line-of-sight shortcutting.
    * `voice-controlled-mobile-manipulator`: End-to-end multimodal speech intent parsing, acoustic confidence thresholding, clarification dialog, and hardware air-gap.
* **Enhanced Projects Catalog**:
  * Added dynamic category count badges: `All (7)`, `Robotics (2)`, `AI (1)`, `LLM & Agent (2)`, `Software Eng (1)`, `Academic (2)`.
  * Added real-time filtered results counter (e.g. `Showing 3 of 7 projects`) and an instant "Reset Filters" action button.
* **Skills Matrix Direct Verification**:
  * Added 1-click verification pill links (`Verified in Project →`) directly connecting skills to the corresponding open-source repository and unit test suites.
* **Strict Authenticity & "Needs User Input" Policy**:
  * Standardized explicit `[Needs User Input]` badges on pending resume sections (unconfirmed corporate internships, awards) to prevent speculative claims.

### 🛠️ Bug Fixes & Refactoring
* Fixed TypeScript strict typing in `demo/path-planning.astro` (`RRTResult` properties: `edges`, `nodes`, `seed`).
* Added accessible `:focus-visible` styling and smooth touch target sizes across mobile navigation.
* Expanded test suite in `tests/data.test.ts` to 13 comprehensive assertions covering slug validation, bilingual completeness, and skill-to-project links.

---

## [0.1.0] — 2026-11-06

### Initial Release
* Baseline Astro v7 setup with static site generation.
* Core routes: Home (`/`), Projects (`/projects`), Research (`/research`), About (`/about`), Resume (`/resume`), 404 (`/404`), and Demo (`/demo/path-planning`).
* TypeScript models for projects and profile data.
* Initial Vitest test suite and Astro check diagnostics.
