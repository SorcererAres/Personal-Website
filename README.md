# 个人网站

基于 Next.js 16、React 19、`next-intl` 的单页作品集站点。内容与交互均为 React；视觉样式沿用迁移自原克隆站的 CSS（`src/styles/legacy/`）。

## 前置

- Node.js 24+

## 命令

```bash
npm install
npm run dev          # http://localhost:3000 → /zh、/en
npm run build
npm run start
npm run check        # lint + typecheck + build
npm run visual-diff -- <基线.png> <对比.png> [diff-out.png]
```

## 结构速览

| 路径 | 说明 |
|------|------|
| `messages/zh.json` · `en.json` | 全部可见文案 |
| `src/components/system/` | 主题、导航、侧栏、网格叠加 |
| `src/components/sections/` | 各区块（Cover、Intro、Work…） |
| `src/styles/legacy/` | 站点主样式（随 `app/[locale]/layout` 引入） |
| `public/images/` · `public/seo/` | 图片、favicon、分享图 |

AI / 协作说明见 **AGENTS.md**（唯一指令源）。`CLAUDE.md` 仅指向该文件。

## 许可

详见 [LICENSE](LICENSE)。
