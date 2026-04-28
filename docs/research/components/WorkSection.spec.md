# WorkSection Specification

## Overview
- **Target file:** `src/components/sections/WorkSection.tsx`
- **Screenshot:** `docs/design-references/billysweeney.com/desktop-full.png`
- **Interaction model:** click-driven（作品缩略图）+ hover（可能有）

## Notes
当前缺少作品缩略图素材与精确 computed styles；已用占位网格确保版式与锚点先跑通。后续会用浏览器提取真实缩略图 URL 并下载到 `public/images/work/`，再补齐卡片 hover/间距/列数与断点。

