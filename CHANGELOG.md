# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Security
- 依赖安全升级，`npm audit` 由 11 项（1 critical / 6 high）降至 0：
  - `sanitize-html` `^2.17.3` → `^2.17.6`（critical：`javascript:` URI 绕过、`xmp` raw-text 穿透；该库直接用于清洗 `messages/*` 中的 HTML）
  - `next` `16.2.1` → `16.3.0`（high：Proxy bypass、cache poisoning、CSP nonce XSS 等；其中 Turbopack + 单 locale 一条直接影响 `src/proxy.ts`）
  - `next-intl` `^4.9.1` → `^4.13.5`（moderate：prototype pollution）
  - `tsx` `^4.21.0` → `^4.23.12`（拉入已修复的 `esbuild` 0.28.2）；`postcss`、`sharp` 随 `next` 一并解决
  - 版本下界一并提升至已修复版，避免删除 lockfile 重装时解析回受影响版本

### Added
- 作品新增 Galt（[galt.muduo.art](https://galt.muduo.art/)），含官网截图预览（1440/2400 两档），为首个带「查看案例」CTA 的条目
- 作品预览图渲染通道：条目声明 `previewImage` 时输出 `img` + `srcset`，否则回退原有纯 CSS 占位；schema 限定其只能是站内 `/images/` 路径
- 作品标题支持在 `messages/*` 中以 `\n` 控制换行（`white-space: pre-line`）

### Changed
- 作品列表精简为 3 条，Galt 置于首位
- Work 说明文案由施工备注改为讲价值的一句
- 作品标题字号按实测收敛（桌面 `6.2vw` → `4vw`，≥1800px `5.6vw` → `4vw`），1024–2400px 六档均为两行
- Intro 受众选项由（失效的）横向滚动改为折行显示
- 仓库地址更正为 `SorcererAres/Personal-Website`（`package.json` 的 `repository`/`bugs` 与本文件底部链接）
- `.gitignore` 忽略本地开发配置 `.claude/launch.json`

### Fixed
- 窄屏横向溢出：375px 下文档 `scrollWidth` 为 544。`.section.work .projects` 在移动端仍是 12 列，轨道被压成 0px 后跨列的 `.project` 失去 grid area 并退回 max-content；`.section.intro .options` 作为 grid 子项缺 `min-width: 0` 致 `overflow-x` 未生效
- CI 触发分支由 `master` 改为 `main`——此前工作流从未真正运行
- `README` / `AGENTS` 中 `npm run check` 的描述补上 `validate` 一步；`AGENTS` 移除已不存在的 Tailwind / `globals.css` 说明

### Removed
- 作品卡片顶部的 PROJECT 标签条，连同 `.project-tabs` / `.project-tab` 样式、4 组 `--work-tab-*` 变量与 `projectLabel` 文案
- Intro 的横向滚动、两侧渐变遮罩 DOM/CSS 与组件内的 `scrollLeft` 监听
- CHANGELOG 中 0.1.0–0.3.1 的模板仓库历史（本仓库无对应提交与 tag）

## [1.0.0] - 2026-04-28

### Changed
- 迁移为单源 React 架构：移除 jQuery / legacy HTML 注入、`public/billy-legacy/scripts` 与 `src/legacy`；内容与交互由 `messages/*`、`ThemeProvider` 与各 section 承担
- 静态资源统一到 `public/images/`、`public/seo/`；`localePrefix: "always"`（`/zh`、`/en`）
- `package.json` 元数据、LICENSE（UNLICENSED）与 README 对齐个人仓库

### Added
- `scripts/visual-diff.mjs`（pixelmatch 对比截图）
- `CLAUDE.md`、`GEMINI.md` 指向 `AGENTS.md`

### Removed
- Docker 三件套、部分多平台 AI 配置目录与 `sync-agent-rules.sh` / `sync-skills.mjs`
- 未使用的 npm 依赖（shadcn CLI、lucide、@base-ui 等）

> 1.0.0 之前的版本属于本站起步时使用的克隆模板仓库
> （[JCodesMore/ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template)），
> 其变更历史不在本仓库范围内。

[Unreleased]: https://github.com/SorcererAres/Personal-Website/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/SorcererAres/Personal-Website/releases/tag/v1.0.0
