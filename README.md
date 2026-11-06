# Weiqi Wang — Personal Developer Portfolio & Research Hub

> Source repository of <https://wwqwhichone-ui.github.io>, built with [Astro](https://astro.build), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/). Automated testing and continuous deployment via [GitHub Actions](.github/workflows/deploy.yml).

[![CI](https://github.com/wwqwhichone-ui/wwqwhichone-ui.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/wwqwhichone-ui/wwqwhichone-ui.github.io/actions/workflows/deploy.yml)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6)

---

## Overview

This website serves as the primary technical portfolio and research hub for **Weiqi Wang**, candidate for **MSc(Eng) in Robotics & Intelligent Systems** at **The University of Hong Kong (HKU)** with a **B.Eng. in Engineering Mechanics** from **Northwestern Polytechnical University (NWPU)**.

It targets engineering roles in:
* **Robotics Software Engineering** (Kinematics, Jacobians, Motion & Path Planning)
* **AI & LLM Application Engineering** (Structured Outputs, JSON Schema Validation, Tool Calling)
* **Embodied AI & Human-Robot Interaction** (Multi-tier Safety Air-Gaps, Spoken Intent Grounding)

---

## Key Engineering Features

1. **Bilingual i18n Architecture (English & Chinese)**:
   * Instant, zero-flash language toggling (`EN / 中文`).
   * Pre-paint synchronization in `<head>` preventing layout shifts on reload.
2. **Interactive Path Planning Simulator (`/demo/path-planning/`)**:
   * Client-side HTML5 Canvas simulator for A*, Dijkstra, and RRT.
   * Freehand obstacle drawing, disk obstacle inflation, and real-time benchmark execution.
3. **Evidence-Grounded Skills Matrix (`/skills/`)**:
   * Every skill in active use links directly to the open-source repository where it is exercised and tested.
   * Strictly separates *In Active Use* from *Currently Learning*; zero speculative percentages.
4. **Project Deep-Dive System (`/projects/[slug]/`)**:
   * Custom SVG architectural diagrams for top projects (`llm-robot-task-planner`, `robot-arm-kinematics`, `mobile-robot-path-planning`, `voice-controlled-mobile-manipulator`).
   * Explains problem statements, technical challenges, personal contributions, and numerical test results.
5. **Strict Anti-Hallucination & Privacy Policy**:
   * No unverified corporate internships, awards, or fake metrics. Unconfirmed fields are clearly flagged with `[Needs User Input]`.
   * Zero sensitive personal contact data published in source files.

---

## Project Structure

```text
portfolio/
├── .github/workflows/
│   ├── ci.yml               # Automated TypeScript, Vitest, and Build checks on PRs
│   └── deploy.yml           # GitHub Pages deployment pipeline
├── public/
│   ├── favicon.svg          # Robotics manipulator brand icon
│   ├── og.png               # Social preview card
│   ├── resume/              # Place Weiqi_Wang_Resume.pdf here
│   └── github-profile/      # Standalone GitHub profile README & assets
├── src/
│   ├── components/
│   │   ├── Header.astro     # Sticky navigation with language & theme switchers
│   │   ├── Footer.astro     # Minimal footer with verified links
│   │   ├── ProjectCard.astro# Filterable project card
│   │   ├── StatusBadge.astro# Standardized status pill
│   │   ├── ThemeToggle.astro# Dark / Light theme switcher
│   │   ├── LanguageToggle.astro # Instant zero-flash language switcher
│   │   └── ProjectArchitectureDiagram.astro # High-fidelity SVG schematics
│   ├── data/
│   │   ├── profile.ts       # Single source of truth for personal information
│   │   ├── projects.ts      # Structured project metadata and technical specs
│   │   └── i18n.ts          # Bilingual UI dictionaries (EN & ZH)
│   ├── layouts/
│   │   └── Base.astro       # HTML skeleton, SEO metadata, JSON-LD Schema.org
│   ├── lib/
│   │   ├── planner.ts       # Pure TypeScript A*, Dijkstra, and RRT engine
│   │   └── url.ts           # URL path resolution utility
│   ├── pages/
│   │   ├── index.astro      # Hero, recruiter glance, focus areas, featured projects
│   │   ├── about.astro      # Education timeline, engineering philosophy, career goals
│   │   ├── projects/
│   │   │   ├── index.astro  # Searchable & filterable projects catalog
│   │   │   └── [slug].astro # Dynamic project deep-dive pages
│   │   ├── skills.astro     # Evidence-linked skills matrix
│   │   ├── research.astro   # HKU MSc dissertation brief & milestones
│   │   ├── resume.astro     # Web-based CV & verified PDF downloader
│   │   ├── demo/
│   │   │   └── path-planning.astro # Interactive canvas simulator
│   │   └── 404.astro        # Robotics out-of-bounds error page
│   └── styles/
│       └── global.css       # Tailwind CSS v4 + Design tokens & dark/light themes
├── tests/
│   ├── data.test.ts         # Data integrity, URLs, and privacy unit tests
│   └── planner.test.ts      # Path planning algorithm verification tests
├── astro.config.mjs         # Astro configuration with Vite Tailwind plugin
├── package.json
└── tsconfig.json
```

---

## Local Development & Quality Commands

```bash
# Install dependencies
npm ci

# Start local hot-reloading development server (http://localhost:4321)
npm run dev

# Run TypeScript and Astro template diagnostics
npm run check

# Run Vitest automated unit test suites
npm run test

# Build static production output to dist/
npm run build

# Run the full release verification pipeline (check + test + build)
npm run verify
```

---

## License

Code is licensed under the [MIT License](LICENSE). Personal content, text descriptions, and resume are copyrighted © Weiqi Wang.
