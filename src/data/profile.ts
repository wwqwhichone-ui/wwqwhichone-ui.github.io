/**
 * Single source of truth for personal information shown on the site.
 * Only add facts that are true and that you are happy to make public.
 */

export interface Education {
  school: string;
  schoolZh?: string;
  degree: string;
  degreeZh?: string;
  field: string;
  fieldZh?: string;
  period?: string;
  notes?: string[];
  notesZh?: string[];
}

export interface ContactLink {
  label: string;
  href: string;
  isPlaceholder?: boolean;
}

export interface SkillCategory {
  title: string;
  titleZh: string;
  items: Array<{
    name: string;
    level: 'using' | 'learning';
    note?: string;
    projectSlug?: string;
  }>;
}

/** Change this once, everywhere (README links, project URLs, footer). */
export const GITHUB_USERNAME = 'wwqwhichone-ui';

export const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

export const profile = {
  name: 'Weiqi Wang',
  nameZh: '王威淇 (Weiqi Wang)',
  headline: 'Robotics & AI Engineer | Intelligent Systems',
  headlineZh: '机器人与人工智能工程师 · 智能系统方向',
  tagline: 'MSc Robotics & Intelligent Systems @ HKU — exploring embodied AI, LLM agents and intelligent robotics.',
  taglineZh: '香港大学 机器人与智能系统 硕士在读 — 专注于具身智能、大模型任务规划与智能移动机械臂控制。',
  summary:
    'I am a master’s student in robotics at The University of Hong Kong with an engineering mechanics background from Northwestern Polytechnical University. ' +
    'I focus on making robots easier to instruct with natural language and large models, while engineering deterministic validation layers to guarantee predictable and safe physical execution.',
  summaryZh:
    '香港大学机器人与智能系统专业理学硕士在读，本科毕业于西北工业大学工程力学专业。' +
    '专注于研究通过大语言模型与自然语言接口提升机器人的交互能力，同时构建确定性的空间语义接地与三层安全验证架构，确保模型在物理世界中的安全执行。',
  roles: ['Robotics Engineer', 'AI / LLM Application Engineer', 'Embodied AI Engineer', 'Robot Software Engineer'],
  rolesZh: ['机器人软件工程师', 'AI / 大模型应用工程师', '具身智能算法工程师', '运动规划工程师'],
  philosophy:
    'Verification before Physical Execution: Language models propose, but deterministic validation disposes. In robotics, probabilistic outputs must never directly drive actuators without schema compliance, spatial grounding, and safety checks.',
  philosophyZh:
    '执行前必须严格验证（Verification Before Execution）：大模型负责生成任务假设，确定性架构负责安全审查。在机器人系统中，概率性的生成输出绝不能绕过结构化模式校验、几何空间接地与安全互锁直接驱动物理执行器。',
  focus: [
    {
      title: 'Embodied Intelligence',
      titleZh: '具身智能与语义接地',
      text: 'Grounding natural language commands and spatial perception directly into physical robotic actions.',
      textZh: '将自然语言指令与环境感知语义精准映射至机器人物理空间与动作执行。',
    },
    {
      title: 'Safe LLM Task Planning',
      titleZh: '安全可控的大模型任务规划',
      text: 'Transforming fuzzy instructions into structured, verifiable multi-step robot plans with three-layer validation.',
      textZh: '将模糊的语音或文本转化为具有严格 JSON Schema 验证与前置条件推演的结构化动作序列。',
    },
    {
      title: 'Voice-Controlled Manipulation',
      titleZh: '语音驱动的移动机械臂协同控制',
      text: 'Designing reliable speech interfaces and task-planning pipelines for mobile industrial manipulators.',
      textZh: '为移动工业机械臂打造从语音识别、意图推断到机械臂安全轨迹执行的端到端管线。',
    },
    {
      title: 'Kinematics & Motion Planning',
      titleZh: '机械臂运动学与移动规划',
      text: 'Numerical inverse kinematics (Damped Least-Squares), geometric Jacobians, obstacle inflation, and search/sampling path planning.',
      textZh: '机械臂数值逆解（阻尼最小二乘法）、雅可比矩阵分析、障碍物膨胀与网格搜索/随机采样路径规划。',
    },
    {
      title: 'Human-Robot Interaction',
      titleZh: '人机交互与容错机制',
      text: 'Interactive confirmation loops, confidence thresholding, and safe graceful degradation when commands are ambiguous.',
      textZh: '置信度低阈值确认机制、交互反馈循环与指令歧义状态下的安全降级策略。',
    },
  ],
  education: [
    {
      school: 'The University of Hong Kong (HKU)',
      schoolZh: '香港大学 (HKU)',
      degree: 'MSc(Eng)',
      degreeZh: '工学硕士',
      field: 'Robotics & Intelligent Systems',
      fieldZh: '机器人与智能系统',
      period: '2025 to Present',
      notes: [
        'Curriculum: Robot Dynamics & Control, Machine Learning, Computer Vision, Autonomous Systems',
        'Dissertation: Voice Command-Based Action Generation for Mobile Industrial Manipulators',
      ],
      notesZh: [
        '核心课程：机器人动力学与控制、机器学习、计算机视觉、自主系统等',
        '硕士论文课题：基于语音指令的移动工业机械臂动作生成与安全验证',
      ],
    },
    {
      school: 'Northwestern Polytechnical University (NWPU)',
      schoolZh: '西北工业大学 (NWPU)',
      degree: 'B.Eng.',
      degreeZh: '工学学士',
      field: 'Engineering Mechanics',
      fieldZh: '工程力学',
      period: '2021 to 2025',
      notes: [
        'Solid foundation in theoretical mechanics, continuum mechanics, computational methods, and linear algebra',
      ],
      notesZh: [
        '扎实的工程力学、理论力学、数值计算与线性代数数学物理基础',
      ],
    },
  ] satisfies readonly Education[],
  skillsMatrix: [
    {
      title: 'Programming Languages',
      titleZh: '编程语言',
      items: [
        { name: 'Python', level: 'using', note: 'Primary language: robotics libraries, numerical computing, testing', projectSlug: 'robot-arm-kinematics' },
        { name: 'TypeScript / JavaScript', level: 'using', note: 'Web demos, Astro portfolio, Vite', projectSlug: 'wwqwhichone-ui.github.io' },
        { name: 'C / C++', level: 'learning', note: 'Mechanics computing foundations, studying modern ROS 2 C++' },
        { name: 'Shell / Bash', level: 'using', note: 'Automation, CI/CD scripting, environment setup' },
      ],
    },
    {
      title: 'Robotics & Control',
      titleZh: '机器人算法与控制',
      items: [
        { name: 'Serial Kinematics (FK / IK)', level: 'using', note: 'Standard DH, Damped Least-Squares IK for UR5, step clamping', projectSlug: 'robot-arm-kinematics' },
        { name: 'Geometric Jacobian & Manipulability', level: 'using', note: 'Singularity analysis, Yoshikawa index', projectSlug: 'robot-arm-kinematics' },
        { name: 'Path Planning (A*, Dijkstra, RRT, RRT*)', level: 'using', note: 'Occupancy grids, obstacle inflation, line-of-sight shortcutting', projectSlug: 'mobile-robot-path-planning' },
        { name: 'Trajectory Generation', level: 'using', note: 'Quintic joint polynomials with boundary constraints', projectSlug: 'robot-arm-kinematics' },
        { name: 'ROS 2 / Simulation', level: 'learning', note: 'Studying nodes, topics and URDF; not yet used in a project' },
      ],
    },
    {
      title: 'AI & Large Language Models',
      titleZh: '大模型与人工智能',
      items: [
        { name: 'Structured Outputs & JSON Schema', level: 'using', note: 'Draft 2020-12 strict typing and whitelist parameter validation', projectSlug: 'llm-robot-task-planner' },
        { name: 'Multi-Layer Safety Validation', level: 'using', note: 'Schema → world grounding → precondition state machine', projectSlug: 'llm-robot-task-planner' },
        { name: 'LLM API Integration', level: 'using', note: 'Structured outputs via an optional Claude API planner backend (not yet systematically evaluated)', projectSlug: 'llm-robot-task-planner' },
        { name: 'Autonomous Agent Design', level: 'learning', note: 'Tool-use agents, multi-step error recovery workflows', projectSlug: 'ai-agent-experiments' },
      ],
    },
    {
      title: 'Libraries & Frameworks',
      titleZh: '核心库与框架',
      items: [
        { name: 'NumPy', level: 'using', note: 'Matrix transformations, vectorization, numerical calculus', projectSlug: 'robot-arm-kinematics' },
        { name: 'Matplotlib', level: 'using', note: 'Manipulability ellipsoids, 2D/3D kinematic reachability plots', projectSlug: 'robot-arm-kinematics' },
        { name: 'pytest', level: 'using', note: 'Test-driven development, parametrized tests, fixture design', projectSlug: 'llm-robot-task-planner' },
        { name: 'Astro & Tailwind CSS', level: 'using', note: 'Modern high-performance static portfolio architecture', projectSlug: 'wwqwhichone-ui.github.io' },
        { name: 'Vitest', level: 'using', note: 'Unit testing frontend data pipelines', projectSlug: 'wwqwhichone-ui.github.io' },
      ],
    },
    {
      title: 'Tools & DevOps',
      titleZh: '开发工具与工程协作',
      items: [
        { name: 'Git & GitHub', level: 'using', note: 'Version control for all public repos; CI on every push', projectSlug: 'mobile-robot-path-planning' },
        { name: 'GitHub Actions', level: 'using', note: 'Automated CI test matrices on Python 3.10/3.12, Pages deploy', projectSlug: 'llm-robot-task-planner' },
        { name: 'Linux / macOS', level: 'using', note: 'Unix CLI, shell tooling, virtual environments' },
      ],
    },
  ] satisfies readonly SkillCategory[],
  // Flat legacy structure for backward-compatibility with tests
  skills: {
    using: ['Python', 'NumPy', 'Matplotlib', 'pytest', 'JSON Schema', 'LLM APIs', 'Git & GitHub', 'AI coding agents'],
    learning: ['ROS 2', 'Robot simulation', 'LLM agent design'],
  },
  contact: [
    { label: 'GitHub', href: GITHUB_URL },
    // Add LinkedIn / email here once confirmed. Entries marked isPlaceholder are never rendered.
  ] satisfies readonly ContactLink[],
  resume: {
    /** Set to true after placing public/resume/Weiqi_Wang_Resume.pdf */
    available: false,
    file: 'resume/Weiqi_Wang_Resume.pdf',
  },
} as const;

/** Contact links that are safe to render (placeholders filtered out). */
export const publicContact: readonly ContactLink[] = (profile.contact as readonly ContactLink[]).filter((c) => !c.isPlaceholder);
