# SidebarNav Specification

## Overview
- **Target file:** `src/components/SidebarNav.tsx`
- **Screenshot:** `docs/design-references/billysweeney.com/desktop-full.png`
- **Interaction model:** click-driven（锚点滚动）+ hover（轻微）

## DOM Structure
- `aside` fixed 容器
  - 顶部 Logo（单字母 “B”）
  - 导航列表（Intro/Work/Values/Background/References/About/Contact）
  - 底部两枚圆形图标按钮（主题 / 视图）

## Computed Styles (exact values from getComputedStyle)
N/A（当前以截图对齐为主；后续用浏览器 computed styles 补齐精确值）

## States & Behaviors
- **Anchor scroll**：点击导航项滚动到对应区块（`#intro` 等），使用 `scrollIntoView({ behavior: "smooth" })`
- **Active state（可选）**：随着滚动高亮当前 section（后续如需要用 IntersectionObserver 补）

## Assets
- 无（按钮图标先用简化 SVG，后续可替换为真实）

## Responsive Behavior
- **Desktop (1440px):** 固定在左侧，文字较小，内容居中偏右大留白
- **Mobile (390px):** 仍固定在左侧，但整体更紧凑（宽度更窄、字号更小）

