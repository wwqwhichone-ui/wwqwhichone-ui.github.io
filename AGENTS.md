# portfolio — AI 协作规范（Claude Code / Codex CLI / Antigravity 共用）

> `CLAUDE.md` 是本文件的软链接。开工前先读 `.ai/handoff.md`，收工前更新它。

## 项目简介
个人作品集网站 + 研究主页，部署在 GitHub Pages（仓库 `wwqwhichone-ui/wwqwhichone-ui.github.io`）。网站中英双语，内容包括项目展示、技能矩阵、简历，以及一个路径规划交互演示（A* / Dijkstra / RRT）。

## 技术栈
- Astro 7（纯静态输出）+ TypeScript（strict）+ Tailwind CSS v4（通过 `@tailwindcss/vite` 接入）
- 测试：Vitest；类型检查：`astro check`
- Node ≥ 22（CI 用 24）；用 npm 管理依赖，`package-lock.json` 要提交
- CI：`.github/workflows/ci.yml`（PR / push 时跑 check + test + build）；`deploy.yml` 部署到 Pages

## 目录结构
```
src/pages/          页面：index / about / skills / research / resume / projects/[slug] / demo/path-planning / 404
src/components/     Header、Footer、ProjectCard、StatusBadge、ThemeToggle、LanguageToggle、ProjectArchitectureDiagram
src/layouts/Base.astro   HTML 骨架、SEO、JSON-LD
src/data/           profile.ts（个人信息唯一来源）、projects.ts（项目数据）、i18n.ts（中英文案）
src/lib/            planner.ts（纯 TS 路径规划）、url.ts（withBase）、lang.ts（语言切换）
src/styles/global.css    Tailwind v4 与设计变量（深色 / 浅色主题）
tests/              content / data / lang / planner 四组测试
public/             favicon、og.png、resume/（放 PDF 简历）、github-profile/
scripts/make_og_image.py  生成社交分享图
```

## 常用命令
```bash
npm ci              # 安装依赖
npm run dev         # 本地开发 http://localhost:4321
npm run check       # Astro + TS 诊断
npm run test        # Vitest
npm run build       # 输出到 dist/
npm run verify      # check + test + build，提交 / 开 PR 前必须跑通
```

## 代码规范
- 所有站内链接用 `withBase()`（`src/lib/url.ts`）拼接，因为部署时 `BASE_PATH` / `SITE_URL` 由工作流注入，不要写死 `/` 开头的路径。
- 新增文案必须中英两份（`i18n.ts`，或项目数据里的 `*Zh` 字段）；测试会检查每个项目都有双语标题和概述。
- 个人信息只在 `src/data/profile.ts` 修改；项目元数据只在 `src/data/projects.ts` 修改。
- 外链只用 https。
- 改动通过分支 + PR 合入 `main`，分支命名沿用 `fix/`、`chore/`、`content/` 前缀。

## 注意事项（重要）
- **不能编造内容**：项目结果里的每个数字都要有记录在案的来源（`tests/content.test.ts` 会检查）。不能写未经确认的实习、奖项或指标，也不能用绝对化的说法。没确认的信息标 `[Needs User Input]`。
- **隐私**：不能在源码里公开电话、住址、证件等敏感信息；不能出现占位用的联系链接。学位论文项目是私有的，不能挂公开仓库链接。
- 首页显示的 Vitest 用例数要和实际测试数一致；增删测试后要同步修改（有测试检查）。
- 不要提交 `.env*`（`.env.example` 除外）、`dist/`、`.astro/`、`.ai/`。

## 云端会话（Claude Code on the web 等 Linux 沙箱）
- 这个项目可以在云端完整开发：`npm ci && npm run verify`（check + test + build）都能在 Linux 上跑。
- 云端改完开分支 + PR；合入 `main` 后由 `deploy.yml` 自动部署到 GitHub Pages，不需要本机参与。
- `.ai/handoff.md` 不在仓库里，云端看不到；需要交接的信息写进 PR 描述。
