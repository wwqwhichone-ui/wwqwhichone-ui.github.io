<!--
  GitHub Profile README for https://github.com/wwqwhichone-ui
  To update: Review changes, copy content to the `wwqwhichone-ui` repository, and commit.
-->

<p align="center">
  <img src="https://raw.githubusercontent.com/wwqwhichone-ui/wwqwhichone-ui/main/assets/header.svg" alt="Weiqi Wang — Robotics × AI × Intelligent Systems" width="100%">
</p>

<h2 align="center">Weiqi Wang (王威淇)</h2>
<p align="center">
  <b>Robotics & AI Engineer | MSc(Eng) in Robotics & Intelligent Systems @ HKU</b><br>
  <i>Exploring Embodied AI, Safe LLM Task Planning, and Intelligent Industrial Manipulation</i>
</p>

<p align="center">
  <a href="https://wwqwhichone-ui.github.io"><b>🌐 Personal Portfolio Website</b></a> •
  <a href="https://wwqwhichone-ui.github.io/demo/path-planning/"><b>⚡ Live Path Planning Demo</b></a> •
  <a href="https://github.com/wwqwhichone-ui?tab=repositories"><b>📦 All Repositories</b></a>
</p>

---

### 👨‍💻 About Me

I am a master's student in **Robotics & Intelligent Systems** at **The University of Hong Kong (HKU)**, holding a B.Eng. in **Engineering Mechanics** from **Northwestern Polytechnical University (NWPU)**.

My research and engineering focus centers on **bridging natural language understanding with deterministic robotic execution**:
* How to use Large Language Models (LLMs) and speech interfaces to generate expressive robot task plans.
* How to design deterministic, multi-layer safety verification layers (spatial grounding, JSON Schema whitelisting, kinematic feasibility) to ensure physical robots never execute unsafe or hallucinated actions.

I am actively preparing for full-time roles as a **Robotics Software Engineer**, **AI / LLM Application Engineer**, or **Embodied AI Engineer**.

---

### 🔬 Current Research (MSc Dissertation)

> **Voice Command-Based Action Generation for Mobile Industrial Manipulators**  
> *Affiliation: The University of Hong Kong (In Progress)*

Developing a modular, safety-critical architecture that captures human voice instructions in an industrial shopfloor environment, extracts structured intent via LLM task planners, and enforces strict reachability and spatial collision checks before commanding mobile manipulator hardware.
* **Key Architecture:** Speech Recognition (ASR) with confidence thresholding → Disambiguation & Confirmation Dialog → LLM Task Decomposition → 3-tier Safety Air-Gap → Coordinated Base & Arm Trajectory Execution.

---

### 🚀 Featured Open-Source Projects

All repositories are backed by automated test suites (`pytest`), verifiable math, and continuous integration (`GitHub Actions`).

| Repository | Focus & Architecture | Status & Verification |
| :--- | :--- | :--- |
| [**llm-robot-task-planner**](https://github.com/wwqwhichone-ui/llm-robot-task-planner) | **Safe LLM Task Planning with 3-Layer Validation**<br>Natural language → strict JSON Schema (Draft 2020-12) → world grounding → precondition state machine → mock execution trace. | ![CI](https://github.com/wwqwhichone-ui/llm-robot-task-planner/actions/workflows/ci.yml/badge.svg) `Proof of concept`<br>• 24 unit tests<br>• Zero hallucinated hardware calls |
| [**robot-arm-kinematics**](https://github.com/wwqwhichone-ui/robot-arm-kinematics) | **Serial-Manipulator Kinematics in Pure NumPy**<br>Standard DH forward kinematics, geometric Jacobians (revolute/prismatic), Damped Least-Squares IK (UR5 industrial arm), Yoshikawa manipulability, and quintic trajectories. | ![CI](https://github.com/wwqwhichone-ui/robot-arm-kinematics/actions/workflows/ci.yml/badge.svg) `Proof of concept`<br>• 97.0% IK success on 500 UR5 poses<br>• Finite-difference verified Jacobians |
| [**mobile-robot-path-planning**](https://github.com/wwqwhichone-ui/mobile-robot-path-planning) | **Mobile Robot Search & Sampling Benchmark**<br>A*, Dijkstra, RRT and RRT* on 2D occupancy grids with disk obstacle inflation, anti-corner-cutting checks, and line-of-sight shortcutting.<br>👉 **[Try Live Browser Demo](https://wwqwhichone-ui.github.io/demo/path-planning/)** | ![CI](https://github.com/wwqwhichone-ui/mobile-robot-path-planning/actions/workflows/ci.yml/badge.svg) `Proof of concept`<br>• 19 unit tests<br>• Interactive web simulator |
| [**wwqwhichone-ui.github.io**](https://github.com/wwqwhichone-ui/wwqwhichone-ui.github.io) | **Developer Portfolio & Research Hub**<br>Modern static portfolio built with Astro, TypeScript, and Tailwind CSS. Features full bilingual (EN/中) instant switching, dark/light theme, and automated CI/CD. | ![CI](https://github.com/wwqwhichone-ui/wwqwhichone-ui.github.io/actions/workflows/ci.yml/badge.svg) `Production`<br>• 100% static & fast |

---

### 🛠️ Technical Capabilities & Stack

* **Programming Languages:** Python (NumPy, Matplotlib, Pytest), TypeScript / JavaScript, Shell / Bash, C / C++ (Foundations)
* **Robotics Algorithms:** Forward/Inverse Kinematics (DH, DLS, Jacobian), Singularity Analysis, Path Planning (A*, Dijkstra, RRT, RRT*), Quintic Trajectories, Occupancy Grids, UR5 Modeling
* **Artificial Intelligence & LLMs:** Structured Output Generation, JSON Schema (Draft 2020-12), Multi-tier Safety Validation, Prompt Engineering, Tool Calling & Agentic Workflows
* **Engineering & Tools:** Git & GitHub, GitHub Actions CI/CD, Linux / macOS, Vitest, Astro, Tailwind CSS, VS Code

---

### 🧭 Engineering Philosophy

> **"Verification Before Physical Execution"**  
> Probabilistic models propose; deterministic architectures dispose. In robotics, no model output should command physical actuators without spatial validation, geometric reachability, and automated safety interlocks.

---

### 📬 Contact & Links

* 🌐 **Website:** [wwqwhichone-ui.github.io](https://wwqwhichone-ui.github.io)
* 💻 **GitHub:** [@wwqwhichone-ui](https://github.com/wwqwhichone-ui)
* 💼 **LinkedIn:** *[Add LinkedIn Profile URL in config]*
* 📧 **Email:** *[Add Academic Email in config]*

<p align="right">
  <sub>Last verified & updated: November 2026 • Built with factual evidence</sub>
</p>
