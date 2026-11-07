import { GITHUB_USERNAME } from './profile';

export type ProjectStatus = 'Proof of concept' | 'In progress' | 'Planned' | 'Ongoing';

export type ProjectCategory =
  | 'Robotics'
  | 'Artificial Intelligence'
  | 'LLM & AI Agent'
  | 'Software Engineering'
  | 'Automation'
  | 'Academic Projects';

export const categoryZh: Record<ProjectCategory, string> = {
  Robotics: '机器人',
  'Artificial Intelligence': '人工智能',
  'LLM & AI Agent': '大模型与智能体',
  'Software Engineering': '软件工程',
  Automation: '自动化',
  'Academic Projects': '学术课题',
};

export interface Project {
  slug: string;
  title: string;
  titleZh: string;
  category: ProjectCategory;
  summary: string;
  summaryZh: string;
  problemStatement: string;
  problemStatementZh: string;
  overview: string;
  overviewZh: string;
  architecture: string;
  architectureZh: string;
  highlights: string[];
  highlightsZh: string[];
  keyFeatures: string[];
  keyFeaturesZh: string[];
  myContributions: string[];
  myContributionsZh: string[];
  challenges: string[];
  challengesZh: string[];
  limitations: string[];
  limitationsZh: string[];
  results: string[];
  resultsZh: string[];
  stack: string[];
  status: ProjectStatus;
  featured: boolean;
  /** Omit for private repositories. */
  repo?: string;
  /** Only set when a live demo really exists. Absolute https URL or a site-relative path. */
  demo?: string;
  screenshots?: string[];
}

const gh = (name: string) => `https://github.com/${GITHUB_USERNAME}/${name}`;

export const projects: Project[] = [
  {
    slug: 'llm-robot-task-planner',
    title: 'LLM Robot Task Planner',
    titleZh: '大模型机器人任务规划器与三层安全验证',
    category: 'LLM & AI Agent',
    summary:
      'Natural-language instructions become structured task plans that must pass JSON Schema, world-grounding and precondition checks before a mock robot executes them.',
    summaryZh:
      '将自然语言指令解析为结构化机器人任务规划，并在执行前通过严格的 JSON Schema、环境物理空间接地与状态机前置条件三层验证。',
    problemStatement:
      'How to allow language models to plan robot tasks without ever letting unconstrained, hallucinated tokens directly command physical robotic actuators?',
    problemStatementZh:
      '如何在利用大语言模型理解复杂自然语言指令的同时，彻底杜绝模型幻觉或非法输出直接驱动物理机器人执行器带来的安全隐患？',
    overview:
      'A proof-of-concept for safe LLM robotics: planners (rule-based or API-driven) propose candidate actions as untrusted JSON. A strict three-tier verification engine acts as an air-gap before reaching a mock state-machine robot interface.',
    overviewZh:
      '专为安全机器人大模型应用打造的概念验证系统：规划器仅生成候选任务建议，必须穿过三层确定性验证安全隔离带，方可被机器人执行状态机采纳。',
    architecture:
      'Speech/Text Instruction → Planner (Rule-based / Claude API) → Untrusted JSON → [Layer 1: JSON Schema Draft 2020-12 Whitelist] → [Layer 2: World Grounding & Spatial Coordinate Checks] → [Layer 3: Precondition Dry-Run State Machine] → Validated TaskPlan → MockRobotExecutor',
    architectureZh:
      '语音/文本输入 → 规划器 (规则引擎 / Claude API) → 非受信 JSON → [第一层：JSON Schema 动作白名单] → [第二层：环境实体与空间坐标接地] → [第三层：前置条件试运行状态机] → 严格定型的 TaskPlan → 机器人仿真状态机执行',
    highlights: [
      'Action whitelist with typed, range-limited parameters',
      'Three-layer validation: schema → grounding → dry-run',
      'Offline rule-based planner + optional Claude backend',
      '24 unit tests, CI on Python 3.10 and 3.12',
    ],
    highlightsZh: [
      '动作白名单机制，严格限定动作类型与参数范围',
      '三层验证体系：模式校验 → 实体接地 → 试运行验证',
      '离线确定性规则引擎 + 可选 Claude API 后端',
      '24 个单元测试，支持 Python 3.10 / 3.12 双版本 CI',
    ],
    keyFeatures: [
      'Strict Draft 2020-12 JSON Schema forbidding arbitrary keys and invalid action enums',
      'Spatial and object existence validation against dynamic world state dictionaries',
      'Precondition state machine dry-run (e.g. arm must be ungrasped before picking another object)',
      'Deterministic execution trace generator logging all validation passes and rejections',
    ],
    keyFeaturesZh: [
      '基于 JSON Schema Draft 2020-12 严格规范，禁止额外字段与非法动作类型',
      '基于世界状态字典的物理空间存在性与坐标范围验证',
      '状态机前置条件推演（如抓取前机械爪必须为空闲、目标物体必须处于无遮挡状态）',
      '确定性执行链路追踪器，完整记录每一步的验证结果与拦截原因',
    ],
    myContributions: [
      'Architected the 3-tier validation pipeline separating generation from verification',
      'Authored the complete JSON Schema specification and world-state grounding engine',
      'Built mock robot execution environment and comprehensive 24-case pytest test suite',
    ],
    myContributionsZh: [
      '设计了“生成与验证分离”的三层确定性安全验证架构',
      '独立编写了完整的机器人动作 JSON Schema 规范与物理空间接地校验引擎',
      '构建了无外部依赖的仿真状态机执行器，并设计了 24 组高覆盖率单元测试',
    ],
    challenges: [
      'Handling non-deterministic LLM output formats without failing unpredictably',
      'Balancing expressiveness of natural language with strict robotics action constraints',
    ],
    challengesZh: [
      '如何应对大模型输出格式的非确定性，做到无论模型输出何种脏数据均能优雅拦截与报错',
      '在保持自然语言丰富表达力与物理机器人严格执行约束之间取得平衡',
    ],
    limitations: [
      'The rule-based grammar is deliberately small; it exists to make the pipeline demo-able offline.',
      'The executor is a symbolic simulator, not a physics simulation, and there is no ROS interface yet.',
      'No benchmark results are claimed. The Claude backend has not been evaluated systematically.',
    ],
    limitationsZh: [
      '基于规则的小型语法仅用于离线演示管线。',
      '执行器为符号化状态机模拟，暂无物理仿真或 ROS 接口。',
      '未声明基准测试结果，Claude 后端尚未进行系统评估。',
    ],
    results: [
      'Every invalid-plan case in the 24-test suite is rejected before reaching the mock executor',
      'No benchmark results are claimed; the optional Claude backend has not been evaluated systematically',
    ],
    resultsZh: [
      '24 个单元测试中覆盖的所有非法任务提议均在到达仿真执行器之前被拦截',
      '暂不声称任何基准评测结果；可选的 Claude 后端尚未经过系统评估',
    ],
    stack: ['Python', 'JSON Schema', 'pytest', 'Claude API', 'GitHub Actions'],
    status: 'Proof of concept',
    featured: true,
    repo: gh('llm-robot-task-planner'),
  },
  {
    slug: 'robot-arm-kinematics',
    title: 'Robot Arm Kinematics',
    titleZh: '纯 NumPy 串联机械臂运动学与 UR5 逆解库',
    category: 'Robotics',
    summary:
      'A tested NumPy library for serial manipulators: DH forward kinematics, geometric Jacobians, damped-least-squares inverse kinematics and quintic joint trajectories, with a UR5 model.',
    summaryZh:
      '基于纯 NumPy 构建的轻量级串联机械臂运动学库：包含标准 DH 正运动学、几何雅可比矩阵、阻尼最小二乘法逆运动学 (UR5) 与五次多项式关节轨迹生成。',
    problemStatement:
      'How to build an educational yet mathematically rigorous kinematics engine without heavy C++ dependencies, while maintaining numerical stability near singularities?',
    problemStatementZh:
      '如何在不引入庞大 C++ 依赖的前提下，构建兼具数学严谨性与数值稳定性的机械臂运动学算法库，并有效解决奇异点邻近的数值震荡？',
    overview:
      'A clean, modular Python library implementing forward and numerical inverse kinematics for serial manipulators. Includes official Denavit-Hartenberg parameters for the Universal Robots UR5 industrial manipulator.',
    overviewZh:
      '模块化纯 Python/NumPy 运动学库，完整实现串联机械臂正逆运动学解析。内置 Universal Robots UR5 官方 DH 参数模型，支持任意自由度串联机构扩展。',
    architecture:
      'Kinematics Pipeline: Transforms (Standard DH & SO(3) Matrix Log) → SerialRobot (FK & Geometric Jacobian) → Damped Least Squares IK with step clamping & random restarts → Quintic Trajectory Generator',
    architectureZh:
      '运动学计算流：坐标变换 (标准 DH 参数与稳定 SO(3) 矩阵对数) → 串联机器人基类 (正解与几何雅可比) → 带步长截断与多起点重试的阻尼最小二乘逆解 → 五次多项式轨迹规划',
    highlights: [
      'UR5 full-pose IK: 97.0% success on 500 random targets with 5 restarts',
      'Jacobian verified against finite differences',
      'Stable SO(3) log map near 0 and π',
      '21 unit tests, CI on Python 3.10 and 3.12',
    ],
    highlightsZh: [
      'UR5 6自由度全姿态逆解：500个随机目标点（5次重试）收敛成功率达 97.0%',
      '几何雅可比矩阵与有限差分数值微分交叉比对验证',
      '在旋转角接近 0 和 π 处均保持数值稳定的 SO(3) 矩阵对数映射',
      '21 个数学与工程单元测试，CI 支持 Python 3.10 / 3.12',
    ],
    keyFeatures: [
      'Standard DH transformation matrices with rotational matrix normalization',
      'Numerically stable SO(3) logarithmic mapping handling identity and antipodal rotations',
      'Geometric Jacobian supporting both revolute and prismatic joints',
      'Damped Least Squares (Levenberg-Marquardt style) IK with joint limits and random restarts',
      'Yoshikawa manipulability index computation and visualization',
      'Quintic polynomial joint-space trajectory planner with zero boundary acceleration',
    ],
    keyFeaturesZh: [
      '标准 DH 齐次变换矩阵与正交旋转矩阵归一化处理',
      '支持 0 角度与 π 附近退化情形的高精度 SO(3) 矩阵对数姿态误差算法',
      '支持旋转关节与移动关节的通用几何雅可比矩阵构造',
      '带关节限位裁剪、阻尼自适应与随机重试的阻尼最小二乘数值逆解',
      'Yoshikawa 可操作度指标计算与二维/三维操作度椭球分析',
      '边界速度与加速度均为零的五次多项式平滑关节轨迹规划',
    ],
    myContributions: [
      'Derived and implemented DH transformations, geometric Jacobians, and SO(3) error metrics',
      'Formulated the damped-least-squares solver with adaptive damping factor and restart logic',
      'Benchmarked IK convergence rates on UR5 and validated against finite differences',
    ],
    myContributionsZh: [
      '推导并用向量化 NumPy 实现了 DH 正解、几何雅可比矩阵与 SO(3) 姿态误差计算',
      '编写了自适应阻尼因子的逆解求解器，加入了关节边界限制与多起点探索机制',
      '在 UR5 模型上进行了 500 次随机姿态的逆解基准评测，并通过数值差分完成梯度验证',
    ],
    challenges: [
      'Singularity avoidance when the Jacobian loses rank at workspace boundaries',
      'Gimbal lock and discontinuity in 3D rotation representation resolved via matrix logarithms',
    ],
    challengesZh: [
      '机械臂处于伸展或奇异构型时雅可比矩阵秩退化导致的数值发散',
      '利用 Lie 代数与 SO(3) 矩阵对数彻底消除欧拉角万向节死锁及四元数双倍覆盖不连续性',
    ],
    limitations: [
      'From a single zero-configuration seed, DLS IK misses about 1 in 6 targets (local minima / joint-limit clipping); five random restarts raise success to 97%.',
      'A closed-form UR5 solver would be the next step for guaranteed solutions.',
    ],
    limitationsZh: [
      '单次零初值阻尼最小二乘逆解因局部极值与关节限位截断约有 1/6 失败率（5 次随机重启提升至 97%）。',
      '进一步获得保证解完备性需要实现 UR5 封闭解析解求解器。',
    ],
    results: [
      '97.0% IK convergence rate on 500 uniform random reachable poses',
      '13.1 ms per full-pose solve with 5 restarts (6.1 ms without restarts) on Apple Silicon',
    ],
    resultsZh: [
      '在 500 个均匀随机可达目标位姿下获得 97.0% 逆解收敛率',
      'Apple Silicon 上全姿态单次求解耗时 13.1 ms（5 次重试），不重试时为 6.1 ms',
    ],
    stack: ['Python', 'NumPy', 'Matplotlib', 'pytest', 'Linear Algebra'],
    status: 'Proof of concept',
    featured: true,
    repo: gh('robot-arm-kinematics'),
  },
  {
    slug: 'mobile-robot-path-planning',
    title: 'Mobile Robot Path Planning',
    titleZh: '移动机器人栅格与采样路径规划基准评测',
    category: 'Robotics',
    summary:
      'A*, Dijkstra, RRT and RRT* on occupancy grids with obstacle inflation and path shortcutting, compared on warehouse and narrow-corridor maps with a reproducible benchmark.',
    summaryZh:
      '在占据栅格地图上实现 A*、Dijkstra、RRT 与 RRT* 规划算法，集成基于机器人半径的障碍物膨胀与视线平滑算法，并在仓储地图上进行基准比对。',
    problemStatement:
      'How do deterministic grid search and stochastic sampling-based algorithms compare when subjected to real robot footprint inflation and reproducible benchmark scenarios?',
    problemStatementZh:
      '在考虑移动机器人实体半径障碍物膨胀的约束下，确定性网格搜索与随机采样算法在计算开销与路径最优性上有何权衡差异？',
    overview:
      'A comprehensive motion planning study for ground mobile robots. Compares search-based (A*, Dijkstra) and sampling-based (RRT, RRT*) algorithms with collision-safe disk inflation and post-processing line-of-sight shortcutting.',
    overviewZh:
      '移动机器人地面自主导航算法的系统性实现与对比。集成了栅格化障碍物圆盘膨胀、八向对角移动防切角检查、RRT* 树状结构局部重连以及视线平滑算法。',
    architecture:
      'Occupancy Map Loading & ASCII Parsing → Disk Inflation (Robot Radius) → Planner (A* / Dijkstra / RRT / RRT*) → Line-of-Sight Path Shortcutting → Benchmark Metrics & Interactive Web Canvas',
    architectureZh:
      '占据栅格地图加载与解析 → 基于机器人半径的圆形膨胀 → 路径规划求解 (A* / Dijkstra / RRT / RRT*) → 视线检测无碰撞路径平滑 → 基准统计输出与浏览器交互式 Canvas 演示',
    highlights: [
      'A* expands 5× fewer cells than Dijkstra on the warehouse map',
      'RRT* with subtree cost propagation during rewiring',
      'Shortcutting that never lengthens a path',
      '19 unit tests, CI on Python 3.10 and 3.12',
    ],
    highlightsZh: [
      '在典型仓储地图中，A* 探索节点数较 Dijkstra 减少超过 5 倍',
      'RRT* 重布线过程中实现了子树成本级联递推更新',
      '视线贪心平滑算法保证路径长度单调递减且始终无碰撞',
      '19 个单元测试，支持 Python 3.10 / 3.12 双版本 CI',
    ],
    keyFeatures: [
      '2D Occupancy Grid with ASCII serialization and disk obstacle inflation for robot footprint',
      'A* with Octile distance admissible heuristic preventing diagonal corner cutting',
      'RRT and RRT* with goal-biasing and subtree cost propagation upon rewiring',
      'Greedy line-of-sight path shortcutting providing smooth piecewise trajectories',
      'Fully interactive in-browser canvas demo for real-time obstacle drawing and algorithm comparison',
    ],
    keyFeaturesZh: [
      '二维占据栅格管理，支持 ASCII 导入导出与基于机器人外径的圆形障碍物自动膨胀',
      '采用 Octile 八连通距离可采纳启发式函数的 A*，内建严格对角防穿墙切角检查',
      '具备目标引导采样与重连时子树代价递推更新的 RRT 与 RRT* 算法',
      '贪心视线平滑模块，消除栅格锯齿并在保证无碰撞前提下单调缩短路径',
      '完全基于浏览器 Canvas 的可交互式实时路径规划演示系统',
    ],
    myContributions: [
      'Implemented the unified occupancy grid and geometric collision-checking primitives',
      'Implemented RRT* rewiring logic with subtree cost updates',
      'Engineered an interactive TypeScript browser canvas simulation running client-side',
    ],
    myContributionsZh: [
      '设计了统一的占据栅格数据结构与高效率直线段连续碰撞检测原语',
      '实现了采样规划中 RRT* 的邻域选择与重布线子树代价更新逻辑',
      '使用纯原生 TypeScript 与 Canvas 移植并实现了无需后端的全前端交互式规划模拟器',
    ],
    challenges: [
      'Preventing diagonal corner cutting across intersecting obstacle vertices',
      'Managing subtree depth cost propagation in RRT* efficiently without stack overflow',
    ],
    challengesZh: [
      '解决八向邻域搜索中穿越两相邻对角障碍物顶点的“穿墙穿角”假碰撞漏洞',
      '在密集采样环境下保证 RRT* 重连子树深度搜索更新时不出现堆栈溢出与性能骤降',
    ],
    limitations: [
      'The robot is modelled as a point on an inflated grid (no orientation or kinematic constraints).',
      'Collision checks sample segments every 0.2 cells, which is conservative but not exact.',
    ],
    limitationsZh: [
      '机器人被建模为膨胀栅格地图上的质点，未考虑航向角或非完整运动学约束。',
      '碰撞检测按每 0.2 格步长进行离散线段采样，策略保守但非连续严格精确。',
    ],
    results: [
      'Warehouse map (15 × 9 m): A* expands 202 cells vs Dijkstra 1045 for the same 18.22 m path',
      'Line-of-sight shortcutting shortens the A* path to 17.46 m and stays collision-free (examples/benchmark.py --seeds 10)',
    ],
    resultsZh: [
      '仓储地图（15 × 9 m）实测：同为 18.22 m 的最优路径，A* 扩展 202 个栅格，Dijkstra 扩展 1045 个',
      '视线平滑将 A* 路径缩短至 17.46 m，且保持无碰撞（examples/benchmark.py --seeds 10）',
    ],
    stack: ['Python', 'NumPy', 'Matplotlib', 'TypeScript', 'HTML5 Canvas', 'pytest'],
    status: 'Proof of concept',
    featured: true,
    repo: gh('mobile-robot-path-planning'),
    demo: 'demo/path-planning/',
  },
  {
    slug: 'voice-controlled-mobile-manipulator',
    title: 'Voice-Controlled Mobile Manipulator',
    titleZh: '基于语音指令的移动工业机械臂动作生成与安全控制',
    category: 'Academic Projects',
    summary:
      'MSc dissertation: generating actions for a mobile industrial manipulator from spoken commands, from speech recognition through LLM task planning to safety-validated robot actions.',
    summaryZh:
      '香港大学硕士学位论文课题：针对移动工业机械臂平台，研究从语音识别、大模型多步任务规划到确定性安全验证动作生成的端到端系统架构。',
    problemStatement:
      'How to enable shopfloor operators to safely instruct a mobile manipulator using casual spoken speech, while guaranteeing kinematic feasibility, collision avoidance, and spatial safety?',
    problemStatementZh:
      '如何让工业车间操作人员能够通过口头自然语言指令指挥移动机械臂协同作业，并在执行前验证运动学可达性、环境防碰撞与物理安全性？',
    overview:
      'Current MSc dissertation project at The University of Hong Kong. Developing a modular, safety-critical architecture that captures speech, generates structured task plans with an LLM, and is designed to pass them through spatial and kinematic feasibility checks before execution.',
    overviewZh:
      '香港大学在读硕士学位论文课题（进行中）。开发一套高安全性模块化架构：捕获人声语音输入，经由大模型生成候选动作，设计上在下发到底盘与机械臂底层之前通过几何可达性与空间防碰撞验证。',
    architecture:
      'Audio Input → Speech-to-Text with Confidence Scoring → Disambiguation & Confirmation Dialog → LLM Task Decomposition → Safety & Reachability Air-Gap → Coordinated Base Navigation & Arm Trajectory Execution',
    architectureZh:
      '音频输入 → 带置信度评分的语音识别与意图提取 → 歧义对话消除与人机确认闭环 → 大模型结构化任务解构 → 空间可达与安全验证隔离带 → 移动底盘自主导航与机械臂轨迹协同执行',
    highlights: [
      'Modular pipeline with typed interfaces between stages',
      'Safety validation layer before any robot command',
      'Confirmation step on low speech-recognition confidence',
    ],
    highlightsZh: [
      '阶段间具备严格类型定义的模块化架构设计',
      '下发物理硬件执行器前的强制性安全准入验证层',
      '语音识别置信度低于阈值时的主动式人机确认机制',
    ],
    keyFeatures: [
      'Multi-modal intent parsing bridging vague verbal commands to exact industrial task domains',
      'Confidence-thresholded confirmation prompt to prevent acoustic misinterpretation',
      'Decoupled mobile base positioning and arm manipulation task synthesis',
      'Planned hardware target: Mobile base + multi-DOF industrial manipulator arm',
    ],
    keyFeaturesZh: [
      '跨模态意图解析引擎，将口语化指令对齐至工业标准作业库',
      '低置信度指令主动人机询问防误触机制',
      '移动底座大范围导航与机械臂灵巧操作的解耦与协同规划',
      '目标硬件平台：全向/差速移动底盘 + 工业机械臂集成系统',
    ],
    myContributions: [
      'Formulated the overall dissertation proposal and modular software pipeline',
      'Conducted literature survey on LLM task planning, tool-calling, and safety verification in robotics',
      'Designing the validation architecture bridging spoken intent to ROS 2 execution nodes',
    ],
    myContributionsZh: [
      '独立完成硕士开题立项、系统方案设计与模块化软件技术管线规划',
      '系统调研大模型任务规划、具身智能安全约束与机械臂动作生成前沿文献',
      '设计连接语音语义意图到 ROS 2 机器人底层控制节点的中间件安全校验层',
    ],
    challenges: [
      'Resolving ambiguous spatial referents in oral communication (e.g., "the tool next to the red container")',
      'Ensuring real-time responsiveness while conducting multi-tier kinematic and collision checks',
    ],
    challengesZh: [
      '解决口语指令中模糊空间指代实体的语义消歧与场景坐标映射',
      '在保证多层运动学逆解验证与碰撞检查完备性的同时维持系统实时响应性能',
    ],
    limitations: [
      'Repository scaffold and module interfaces only; no experimental results reported yet.',
      'Simulation environment and evaluation protocol not yet built.',
      'Research content is published only after supervisor review.',
    ],
    limitationsZh: [
      '当前仅完成工程脚手架与模块抽象接口，暂未报告实验结果。',
      '仿真验证环境与系统评测协议尚未搭建。',
      '学术研究数据与实验成果须经导师审阅后公开。',
    ],
    results: [
      'Dissertation proposal submitted; research has just started',
      'Repository scaffold and typed module interfaces completed; simulation environment not yet built',
    ],
    resultsZh: [
      '已提交开题报告（proposal），研究刚刚开始',
      '已完成仓库脚手架与模块接口定义；仿真环境尚未搭建',
    ],
    stack: ['Python', 'Speech Recognition', 'LLM Planning', 'Robotics Simulation', 'ROS 2 (Planned)'],
    status: 'In progress',
    featured: true,
  },
  {
    slug: 'robotics-learning',
    title: 'Robotics Learning & Exercises',
    titleZh: '机器人学理论笔记与从零算法推演',
    category: 'Academic Projects',
    summary: 'My own notes and from-scratch exercises in kinematics, path planning and simulation.',
    summaryZh: '个人在机器人学领域的理论推导笔记与从零编码实践，涵盖刚体运动学、李群李代数、轨迹优化与仿真测试。',
    problemStatement:
      'Deepening fundamental understanding of robotics mathematical foundations through clean, self-contained implementations without black-box packages.',
    problemStatementZh:
      '拒绝黑盒调用，通过从零推导与动手编码，深入夯实机器人学运动学、动力学与优化算法的数理底层根基。',
    overview:
      'A collection of study notebooks and scripts covering DH parameters, Euler angles vs unit quaternions, manipulability ellipsoids, and obstacle inflation.',
    overviewZh:
      '收录了关于 DH 参数推导、旋转表示比较（欧拉角、轴角、四元数）、雅可比矩阵性质及占据网格算法的独立练习脚本与数理笔记。',
    architecture:
      'Independent modules for analytical kinematics derivations, benchmark scripts, and mathematical validation experiments.',
    architectureZh:
      '按专题划分的独立模块，包含运动学解析推导、基准脚本与数学验证程序。',
    highlights: ['Kinematics derivations', 'Path planning exercises', 'Simulation experiments'],
    highlightsZh: ['运动学系统推导', '路径规划练习', '仿真对比实验'],
    keyFeatures: [
      'From-scratch derivation of forward kinematics for multiple kinematic chains',
      'Comparative study of rotation formalisms and spatial velocity representations',
      'Clean pedagogical Python code with full mathematical comments',
    ],
    keyFeaturesZh: [
      '多种机械臂拓扑结构正向运动学的符号与数值推导实现',
      '空间旋转描述与空间速度表达方式的系统对比研读',
      '附带详尽数学注释的清晰教学型 Python 源代码',
    ],
    myContributions: [
      'Authored all numerical exercises and derivations from primary robotics textbooks',
    ],
    myContributionsZh: [
      '独立完成经典机器人教材例题的数值代码编写与公式推演验证',
    ],
    challenges: [
      'Understanding singularity degeneracies across different robotic arm geometries',
    ],
    challengesZh: [
      '透彻理解不同构型机械臂在奇异点处自由度退化的几何本质',
    ],
    limitations: [
      'Not yet documented',
    ],
    limitationsZh: [
      '暂未记录',
    ],
    results: [
      'Notes and exercises on the same topics as robot-arm-kinematics and mobile-robot-path-planning',
    ],
    resultsZh: [
      '与 robot-arm-kinematics、mobile-robot-path-planning 同主题的学习笔记与练习',
    ],
    stack: ['Python', 'NumPy', 'Robotics Theory', 'Linear Algebra'],
    status: 'Ongoing',
    featured: false,
    repo: gh('robotics-learning'),
  },
  {
    slug: 'ai-agent-experiments',
    title: 'AI Agent Experiments',
    titleZh: '大模型智能体与工具调用实验日志',
    category: 'LLM & AI Agent',
    summary: 'A log of small, real experiments with LLM agents, tool calling and automation.',
    summaryZh: '聚焦大模型智能体架构、函数调用 (Tool Calling) 与沙箱自动化能力的实证实验日志。',
    problemStatement:
      'Evaluating the boundaries, reliability, and error-recovery behaviors of agentic LLM workflows when interacting with external tools.',
    problemStatementZh:
      '评估大模型智能体在多轮工具调用、异常反馈重试与代码沙箱执行中的可靠性边界与容错行为。',
    overview:
      'Focused experiments testing prompt patterns, multi-tool orchestration, and feedback loops for goal-driven autonomous tasks.',
    overviewZh:
      '记录结构化提示词设计、多工具链式组合调度及自主容错修复策略的小型实测项目。',
    architecture:
      'Goal Prompt → Reasoning Agent → Tool Invocation (API / Sandbox) → Feedback Loop → Termination Check',
    architectureZh:
      '目标定义 → 思考决策中枢 → 工具调度（API / 沙箱） → 结果反馈闭环 → 目标达成核验',
    highlights: ['Backed by reproducible code', 'Goal · Setup · Findings format'],
    highlightsZh: ['每个实验均有代码可复现', '统一遵循“目标-方案-结论”实验报告规范'],
    keyFeatures: [
      'Standardized schema for tool definitions and parameter checking',
      'Error handling and loop breakout mechanisms for agent deadlocks',
    ],
    keyFeaturesZh: [
      '标准化的工具函数元数据定义与入参校验规范',
      '智能体死循环防卡死与主动降级重试机制',
    ],
    myContributions: [
      'Designed experimental setups and evaluated failure modes across agent tasks',
    ],
    myContributionsZh: [
      '设计实验对照方案，归纳记录智能体在复杂调用链路中的典型失效模式',
    ],
    challenges: [
      'Preventing agents from getting trapped in endless tool retry loops on unexpected outputs',
    ],
    challengesZh: [
      '在外部工具持续返回非预期数据时，如何避免智能体陷入无意义的循环重试',
    ],
    limitations: [
      'Not yet documented',
    ],
    limitationsZh: [
      '暂未记录',
    ],
    results: [
      'Planned: no experiments published yet',
    ],
    resultsZh: [
      '规划中：尚未发布实验结果',
    ],
    stack: ['Python', 'LLM APIs', 'Agent Frameworks', 'Automation'],
    status: 'Planned',
    featured: false,
    repo: gh('ai-agent-experiments'),
  },
  {
    slug: 'wwqwhichone-ui.github.io',
    title: 'Developer Portfolio & Research Hub',
    titleZh: '个人作品集与学术研究展示平台',
    category: 'Software Engineering',
    summary:
      'Modern, responsive, high-performance static portfolio website built with Astro, TypeScript, Tailwind CSS, and GitHub Actions.',
    summaryZh:
      '基于 Astro、TypeScript、Tailwind CSS 与 GitHub Actions 打造的现代化、极速响应式双语学术与工程作品集。',
    problemStatement:
      'How to create a high-speed, zero-server-cost portfolio showcasing complex robotics projects, interactive demos, and bilingual content without unnecessary bloat?',
    problemStatementZh:
      '如何构建兼具极致加载速度、零服务器成本、支持双语即时切换与复杂机器人交互演示的高质量技术主页？',
    overview:
      'The source code of this portfolio website. Built on static Astro architecture with TypeScript typing, custom theme system, live path-planning canvas demo, and automated CI/CD.',
    overviewZh:
      '本站点的完整开源实现。采用 Astro 静态站点生成架构，全面拥抱 TypeScript 类型安全，内建深浅主题、中英双语切换与前端 Canvas 机器人算法模拟器。',
    architecture:
      'Astro Static Site Generator + TypeScript Data Models + Tailwind CSS + GitHub Actions (CI & GitHub Pages Automated Deployment)',
    architectureZh:
      'Astro 静态网页编译 + TypeScript 强类型数据模型 + Tailwind CSS 现代化样式 + GitHub Actions 自动化持续集成与 Pages 托管',
    highlights: [
      'Fully static output generated at build time (Astro SSG)',
      'Bilingual support (English & Chinese) with instant client toggle',
      'Built-in interactive A*/RRT path planning simulator',
      'Strict TypeScript verification and automated test coverage',
    ],
    highlightsZh: [
      '构建时生成的纯静态站点（Astro SSG）',
      '支持中英文双语平滑即时切换',
      '内置实时交互式 A* 与 RRT* 路径规划模拟画板',
      '严格的 TypeScript 类型安全与 Vitest 自动化单元测试保护',
    ],
    keyFeatures: [
      'Modular TypeScript data structures: adding projects never requires rewriting layouts',
      'Accessible dark / light theme switcher respecting system preferences without paint flash',
      'Automated GitHub Actions pipeline verifying types, unit tests, and production build',
      'Full SEO metadata, Open Graph cards, sitemap generation, and JSON-LD structured data',
    ],
    keyFeaturesZh: [
      '高度模块化的数据驱动架构：新增项目或更新资料只需维护数据文件',
      '无闪烁的系统级深色/浅色自适应主题切换器',
      '涵盖类型检查、单元测试与编译发布的完整 GitHub Actions CI/CD 流水线',
      '完善的 SEO 元信息、Open Graph 社交分享卡片、自动站点地图与 Schema.org 结构化数据',
    ],
    myContributions: [
      'Engineered full frontend architecture, i18n switching engine, and UI component hierarchy',
      'Implemented the client-side Canvas path planner demo with custom map presets',
      'Configured GitHub Actions CI workflows and deployment automation',
    ],
    myContributionsZh: [
      '独立主导了完整的前端架构、双语即时切换引擎与组件系统搭建',
      '基于原生 Canvas 实现了高帧率算法可视化画板与预设地图加载器',
      '编写了 GitHub Actions 持续集成与 GitHub Pages 自动化发布脚本',
    ],
    challenges: [
      'Rendering complex mathematical robotics concepts in an accessible, aesthetic web interface',
      'Maintaining 100% truthful project information with strict test assertions',
    ],
    challengesZh: [
      '如何在简约克制的高级科技美学下生动呈现复杂的机器人学数学概念',
      '通过自动化测试断言坚决捍卫项目陈述的客观真实性，杜绝任何数据虚构',
    ],
    limitations: [
      'Not yet documented',
    ],
    limitationsZh: [
      '暂未记录',
    ],
    results: [
      'Fully static output: 15 pages, no client-side API calls',
      'Continuous verification on every git push with GitHub Actions',
    ],
    resultsZh: [
      '纯静态输出：15 个页面，无客户端 API 请求',
      '每一次代码提交均通过 GitHub Actions 自动化回归验证',
    ],
    stack: ['Astro', 'TypeScript', 'Tailwind CSS', 'Vitest', 'GitHub Pages', 'GitHub Actions'],
    status: 'Proof of concept',
    featured: false,
    repo: gh('wwqwhichone-ui.github.io'),
    demo: 'https://wwqwhichone-ui.github.io',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
