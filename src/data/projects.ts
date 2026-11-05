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
      '24 unit tests, CI on Python 3.9 and 3.12',
    ],
    stack: ['Python', 'JSON Schema', 'pytest', 'Claude API'],
    status: 'Proof of concept',
    featured: true,
    repo: gh('llm-robot-task-planner'),
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
