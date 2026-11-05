/**
 * Single source of truth for personal information shown on the site.
 * Only add facts that are true and that you are happy to make public.
 */

export interface Education {
  school: string;
  degree: string;
  field: string;
  period?: string;
  notes?: string[];
}

export interface ContactLink {
  label: string;
  href: string;
}

/** Change this once, everywhere (README links, project URLs, footer). */
export const GITHUB_USERNAME = 'wwqwhichone-ui';

export const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

export const profile = {
  name: 'Weiqi Wang',
  headline: 'Robotics × AI × Intelligent Systems',
  tagline: 'MSc Robotics & Intelligent Systems @ HKU — exploring embodied AI, LLM agents and intelligent robotics.',
  summary:
    'I am a master’s student in robotics at The University of Hong Kong with an engineering mechanics background. ' +
    'I work on making robots easier to instruct with natural language — and on the engineering needed to keep ' +
    'language-driven robots predictable and safe.',
  roles: ['Robotics Engineer', 'AI Engineer', 'LLM Application Engineer', 'Embodied AI Engineer'],
  focus: [
    {
      title: 'Embodied Intelligence',
      text: 'Grounding language and perception in physical action.',
    },
    {
      title: 'LLM Task Planning',
      text: 'Turning instructions into structured, verifiable robot plans.',
    },
    {
      title: 'Voice-Controlled Manipulation',
      text: 'Speech as a practical interface for industrial manipulators.',
    },
    {
      title: 'Human-Robot Interaction',
      text: 'Confirmation, feedback and safe failure when people and robots share work.',
    },
    {
      title: 'Autonomous Systems',
      text: 'Navigation and manipulation pipelines for mobile robots.',
    },
  ],
  education: [
    {
      school: 'The University of Hong Kong (HKU)',
      degree: 'MSc(Eng)',
      field: 'Robotics & Intelligent Systems',
      notes: ['Dissertation: Action Generation of Mobile Industrial Manipulator based on Voice Commands'],
    },
    {
      school: 'Northwestern Polytechnical University (NWPU)',
      degree: 'B.Eng.',
      field: 'Engineering Mechanics',
    },
  ] satisfies readonly Education[],
  skills: {
    using: ['Python', 'Git & GitHub', 'VS Code', 'pytest', 'JSON Schema', 'LLM APIs', 'AI coding agents'],
    learning: ['ROS 2', 'Robot simulation', 'LLM agent design'],
  },
  contact: [
    { label: 'GitHub', href: GITHUB_URL },
    // Add LinkedIn / public email only after confirming they should be public.
  ] satisfies readonly ContactLink[],
  resume: {
    /** Set to true after adding public/resume/Weiqi_Wang_Resume.pdf */
    available: false,
    file: 'resume/Weiqi_Wang_Resume.pdf',
  },
} as const;
