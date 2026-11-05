import { GITHUB_USERNAME } from './profile';

export type ProjectStatus = 'Proof of concept' | 'In progress' | 'Planned' | 'Ongoing';

export interface Project {
  slug: string;
  title: string;
  summary: string;
  highlights: string[];
  stack: string[];
  status: ProjectStatus;
  featured: boolean;
  /** Omit for private repositories. */
  repo?: string;
  /** Only set when a live demo really exists. */
  demo?: string;
}

const gh = (name: string) => `https://github.com/${GITHUB_USERNAME}/${name}`;

export const projects: Project[] = [
  {
    slug: 'llm-robot-task-planner',
    title: 'LLM Robot Task Planner',
    summary:
      'Natural-language instructions become structured task plans that must pass JSON Schema, world-grounding and ' +
      'precondition checks before a mock robot executes them.',
    highlights: [
      'Action whitelist with typed, range-limited parameters',
      'Three-layer validation: schema → grounding → dry-run',
      'Offline rule-based planner + optional Claude backend',
      '24 unit tests, CI on Python 3.10 and 3.12',
    ],
    stack: ['Python', 'JSON Schema', 'pytest', 'Claude API'],
    status: 'Proof of concept',
    featured: true,
    repo: gh('llm-robot-task-planner'),
  },
  {
    slug: 'robot-arm-kinematics',
    title: 'Robot Arm Kinematics',
    summary:
      'A tested NumPy library for serial manipulators: DH forward kinematics, geometric Jacobians, damped-least-squares ' +
      'inverse kinematics and quintic joint trajectories, with a UR5 model.',
    highlights: [
      'UR5 full-pose IK: 97.0% success on 500 random targets with 5 restarts',
      'Jacobian verified against finite differences',
      'Stable SO(3) log map near 0 and π',
      '21 unit tests, CI on Python 3.10 and 3.12',
    ],
    stack: ['Python', 'NumPy', 'Matplotlib', 'pytest'],
    status: 'Proof of concept',
    featured: true,
    repo: gh('robot-arm-kinematics'),
  },
  {
    slug: 'mobile-robot-path-planning',
    title: 'Mobile Robot Path Planning',
    summary:
      'A*, Dijkstra, RRT and RRT* on occupancy grids with obstacle inflation and path shortcutting, compared on ' +
      'warehouse and narrow-corridor maps with a reproducible benchmark.',
    highlights: [
      'A* expands 5× fewer cells than Dijkstra on the warehouse map',
      'RRT* with subtree cost propagation during rewiring',
      'Shortcutting that never lengthens a path',
      '19 unit tests, CI on Python 3.10 and 3.12',
    ],
    stack: ['Python', 'NumPy', 'Matplotlib', 'pytest'],
    status: 'Proof of concept',
    featured: true,
    repo: gh('mobile-robot-path-planning'),
  },
  {
    slug: 'voice-controlled-mobile-manipulator',
    title: 'Voice-Controlled Mobile Manipulator',
    summary:
      'MSc dissertation: generating actions for a mobile industrial manipulator from spoken commands, from speech ' +
      'recognition through LLM task planning to safety-validated robot actions.',
    highlights: [
      'Modular pipeline with typed interfaces between stages',
      'Safety validation layer before any robot command',
      'Confirmation step on low speech-recognition confidence',
    ],
    stack: ['Python', 'LLMs', 'Speech-to-text', 'ROS 2 (planned)'],
    status: 'In progress',
    featured: true,
  },
  {
    slug: 'robotics-learning',
    title: 'Robotics Learning',
    summary: 'My own notes and from-scratch exercises in kinematics, path planning and simulation.',
    highlights: ['Kinematics', 'Path planning', 'Simulation exercises'],
    stack: ['Python'],
    status: 'Ongoing',
    featured: false,
    repo: gh('robotics-learning'),
  },
  {
    slug: 'ai-agent-experiments',
    title: 'AI Agent Experiments',
    summary: 'A log of small, real experiments with LLM agents, tool calling and automation.',
    highlights: ['Each entry backed by code', 'Goal · setup · findings format'],
    stack: ['Python', 'LLM APIs'],
    status: 'Planned',
    featured: false,
    repo: gh('ai-agent-experiments'),
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
