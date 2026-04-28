<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing new code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 个人网站（单源 React 架构）

## 定位
Next.js 16 App Router + `next-intl`，内容与交互全部为 React；视觉沿用迁移自原克隆站的 CSS（`src/styles/legacy/`），主题 0–16 档由 `ThemeProvider` 写 `body.theme--NN` 驱动。

## 技术栈
- **运行**：Next.js 16、React 19、TypeScript strict
- **i18n**：`next-intl`，`localePrefix: "always"`（路径形如 `/zh`、`/en`）
- **文案**：`messages/zh.json`、`messages/en.json`（唯一内容源）
- **样式**：legacy 聚合入口 `src/styles/legacy/index.css`；可选 Tailwind 见 `src/app/globals.css`（若未在 layout 引入则不影响线上）

## 命令
- `npm run dev` — 本地开发
- `npm run build` — 生产构建（`output: "standalone"` 可用于容器）
- `npm run lint` / `npm run typecheck`
- `npm run check` — lint + typecheck + build
- `npm run visual-diff -- <baseline.png> <candidate.png> [diff.png]` — pixelmatch 对比（候选图需自行截图导出）

## 目录要点
```
src/app/[locale]/page.tsx    # 首页：AppShell + 各 section
src/components/system/       # ThemeProvider、AppNav、AppAside、GridOverlay 等
src/components/sections/   # Cover / Intro / Work / Values / …
messages/*.json              # 全部可见文案
public/images/               # 作品拼贴、头像等
public/seo/                  # favicon、OG 图
src/styles/legacy/           # 视觉真源 CSS（勿与旧 jQuery 混用）
```

## 设计原则
- 改字只动 `messages/*.json`，勿再写平行 HTML 片段。
- 保留 legacy class 名以匹配 `style.css`（像素级依赖选择器）。
- 不恢复 jQuery：`script.js` 行为已由 `ThemeProvider` 与系统组件接管。

@docs/research/INSPECTION_GUIDE.md
