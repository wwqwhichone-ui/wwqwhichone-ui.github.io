export type Lang = 'en' | 'zh';

export interface TranslationDictionary {
  nav: {
    projects: string;
    research: string;
    about: string;
    skills: string;
    resume: string;
  };
  home: {
    heroEyebrow: string;
    lead: string;
    viewProjects: string;
    researchBtn: string;
    contactBtn: string;
    focusEyebrow: string;
    focusTitle: string;
    featuredEyebrow: string;
    featuredTitle: string;
    allProjectsLink: string;
    dissertationEyebrow: string;
    dissertationTitle: string;
    dissertationDesc: string;
    contactEyebrow: string;
    contactTitle: string;
    verifiedBadge: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    lead: string;
    searchPlaceholder: string;
    filterAll: string;
    categories: Record<string, string>;
    viewCode: string;
    liveDemo: string;
    privateRepo: string;
    detailsLink: string;
    emptySearch: string;
  };
  about: {
    eyebrow: string;
    title: string;
    educationEyebrow: string;
    educationTitle: string;
    skillsEyebrow: string;
    skillsTitle: string;
    skillsDesc: string;
    philosophyEyebrow: string;
    philosophyTitle: string;
    careerEyebrow: string;
    careerTitle: string;
    careerDesc: string;
  };
  skills: {
    eyebrow: string;
    title: string;
    lead: string;
    usingTitle: string;
    learningTitle: string;
    verifiedNote: string;
  };
  resume: {
    eyebrow: string;
    title: string;
    leadAvailable: string;
    leadPending: string;
    downloadBtn: string;
    comingSoon: string;
    placeholderNote: string;
  };
}

export const translations: Record<Lang, TranslationDictionary> = {
  en: {
    nav: {
      projects: 'Projects',
      research: 'Research',
      about: 'About',
      skills: 'Skills',
      resume: 'Resume',
    },
    home: {
      heroEyebrow: 'Robotics × AI × Intelligent Systems',
      lead: 'MSc Robotics & Intelligent Systems @ HKU — exploring embodied AI, safe LLM task planning, and intelligent manipulation.',
      viewProjects: 'View Projects',
      researchBtn: 'Research',
      contactBtn: 'Contact Me',
      focusEyebrow: 'Focus',
      focusTitle: 'Core Technical Directions',
      featuredEyebrow: 'Selected Work',
      featuredTitle: 'Featured Projects',
      allProjectsLink: 'All projects →',
      dissertationEyebrow: 'MSc Dissertation · In Progress',
      dissertationTitle: 'From Voice to Verified Robot Action',
      dissertationDesc: 'Generating safe, structured action sequences for mobile industrial manipulators from spoken natural language instructions.',
      contactEyebrow: 'Get in Touch',
      contactTitle: 'Open to Robotics & AI Engineering Roles',
      verifiedBadge: 'Verified & Tested Code · Zero Fabricated Claims',
    },
    projects: {
      eyebrow: 'Projects',
      title: 'Things I Am Building',
      lead: 'Every project presents factual architecture and honest progress. Demos are linked when functional; private research code is marked accurately.',
      searchPlaceholder: 'Search projects by name, technology, or keywords...',
      filterAll: 'All',
      categories: {
        Robotics: 'Robotics',
        'Artificial Intelligence': 'Artificial Intelligence',
        'LLM & AI Agent': 'LLM & AI Agent',
        'Software Engineering': 'Software Engineering',
        Automation: 'Automation',
        'Academic Projects': 'Academic Projects',
      },
      viewCode: 'Code',
      liveDemo: 'Live Demo',
      privateRepo: 'Private Repository',
      detailsLink: 'Deep Dive →',
      emptySearch: 'No projects match your current search or filter criteria.',
    },
    about: {
      eyebrow: 'About Me',
      title: 'Mechanics Background, Robotics & AI Focus',
      educationEyebrow: 'Education',
      educationTitle: 'Educational Background',
      skillsEyebrow: 'Toolbox',
      skillsTitle: 'Technical Capabilities',
      skillsDesc: 'Transparently classified by practical project use vs. ongoing active learning.',
      philosophyEyebrow: 'Engineering Philosophy',
      philosophyTitle: 'Verification Before Physical Execution',
      careerEyebrow: 'Career Horizons',
      careerTitle: 'Roles & Opportunities',
      careerDesc: 'Seeking engineering roles where robotics and machine intelligence meet to build reliable, physically grounded systems.',
    },
    skills: {
      eyebrow: 'Technical Stack',
      title: 'Skills & Proficiencies',
      lead: 'Strictly factual: only tools and concepts verified in code are listed as in active use. No speculative ratings or fake percentages.',
      usingTitle: 'In Active Use & Verified in Projects',
      learningTitle: 'Currently Learning & Exploring',
      verifiedNote: 'All primary projects are validated with CI test suites and numerical baselines.',
    },
    resume: {
      eyebrow: 'Resume',
      title: 'Curriculum Vitae',
      leadAvailable: 'Preview in browser or download the verified PDF resume.',
      leadPending: 'The formal English resume will be published here upon final review.',
      downloadBtn: 'Download PDF',
      comingSoon: 'PDF Resume (Under Final Review)',
      placeholderNote: 'Placeholder — To protect authenticity, the resume will be downloadable once confirmed.',
    },
  },
  zh: {
    nav: {
      projects: '项目作品',
      research: '学术研究',
      about: '关于我',
      skills: '技术技能',
      resume: '个人简历',
    },
    home: {
      heroEyebrow: '机器人 × 人工智能 × 智能系统',
      lead: '香港大学 机器人与智能系统 硕士研究生 —— 专注于具身智能、安全大模型任务规划与智能移动机械臂控制。',
      viewProjects: '浏览项目',
      researchBtn: '研究课题',
      contactBtn: '联系我',
      focusEyebrow: '研究方向',
      focusTitle: '核心技术领域',
      featuredEyebrow: '精选成果',
      featuredTitle: '代表性工程项目',
      allProjectsLink: '查看全部项目 →',
      dissertationEyebrow: '硕士课题 · 进行中',
      dissertationTitle: '从语音指令到可验证的机器人动作序列',
      dissertationDesc: '基于大模型与自然语言理解，为移动工业机械臂生成具有多重安全性验证的结构化操作序列。',
      contactEyebrow: '联系方式',
      contactTitle: '求职意向：机器人与 AI 算法/软件工程师',
      verifiedBadge: '真实可验证工程代码 · 严禁捏造与虚构',
    },
    projects: {
      eyebrow: '项目库',
      title: '实际构建的工程项目',
      lead: '每个项目均保持真实准确的状态标注。在线演示仅在真实部署时开放，私有学术课题代码如实声明。',
      searchPlaceholder: '输入项目名、技术栈或关键词搜索...',
      filterAll: '全部',
      categories: {
        Robotics: '机器人',
        'Artificial Intelligence': '人工智能',
        'LLM & AI Agent': '大模型与智能体',
        'Software Engineering': '软件工程',
        Automation: '自动化',
        'Academic Projects': '学术研究',
      },
      viewCode: '源码',
      liveDemo: '在线演示',
      privateRepo: '私有仓库',
      detailsLink: '技术架构与深度解析 →',
      emptySearch: '没有找到符合当前搜索或筛选条件的项目。',
    },
    about: {
      eyebrow: '个人概况',
      title: '工程力学底色，深耕机器人与具身智能',
      educationEyebrow: '教育经历',
      educationTitle: '高等教育与专业背景',
      skillsEyebrow: '技术栈',
      skillsTitle: '工程能力与技术储备',
      skillsDesc: '严格区分“已在实际项目中验证掌握”与“正在学习探索”的技术栈。',
      philosophyEyebrow: '工程哲学',
      philosophyTitle: '执行前必须通过多重验证 (Verification Before Execution)',
      careerEyebrow: '职业发展',
      careerTitle: '目标岗位与方向',
      careerDesc: '寻求机器人、人工智能、大模型应用、智能体及机器人软件工程领域的研发机会。',
    },
    skills: {
      eyebrow: '技术全景',
      title: '专业技能矩阵',
      lead: '拒绝无依据的百分比熟练度。只客观展示真实代码仓库中运用与验证的技术栈。',
      usingTitle: '已在项目工程中实测并应用',
      learningTitle: '正在系统研读与实践探索',
      verifiedNote: '核心开源项目均配备完整自动化测试套件 (Pytest) 与持续集成 (CI) 检验。',
    },
    resume: {
      eyebrow: '个人简历',
      title: '完整个人简历',
      leadAvailable: '支持在线直接预览或下载经过校验的正式 PDF 简历。',
      leadPending: '正式英文版 PDF 简历正在最终润色核验中，即将上线。',
      downloadBtn: '下载 PDF 简历',
      comingSoon: 'PDF 简历准备中',
      placeholderNote: '占位声明 —— 严格遵循信息真实性原则，简历文件在最终确认后开放下载。',
    },
  },
};
