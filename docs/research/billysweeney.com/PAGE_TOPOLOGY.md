# billysweeney.com 页面拓扑文档

## 页面结构概览

页面采用单页结构，自上而下分为多个垂直堆叠的内容区块。

## Overlay / Sticky 元素

### 左侧导航栏（Sticky）
- **类型**：固定定位（推测 `position: fixed`）
- **位置**：屏幕左侧，垂直排列
- **z-index**：高于主内容区，始终可见
- **内容**：
  - Logo/首字母 “B”（顶部）
  - 导航项列表（中间）：Intro / Work / Values / Background / References / About / Contact
  - 主题切换 + 视图切换按钮（底部）

## 主要区块（自上而下）

### 1. Hero 区块
- **名称**：Hero / Intro
- **内容**：
  - 主标题：Billy Sweeney — Designer
  - 文案：Hello there, I’m a designer who cares about making beautiful things that help people.
  - 受众导航：For anyone / Recruiters / Design Directors / Product Designers / Product Managers / Engineers
- **交互模型**：static（静态展示）

### 2. Work 区块（作品集）
- **名称**：Work / Portfolio
- **内容**：作品缩略图网格（历史项目截图）
- **交互模型**：click-driven（缩略图/链接可能可点击，需进一步验证）
- **布局**：
  - 桌面端：多列网格（约 3–4 列）
  - 移动端：单列纵向堆叠

### 3. Values 区块（核心价值观）
- **名称**：Values
- **内容**：Useful / Considered / Beautiful / Well made + 大段说明文字
- **交互模型**：static

### 4. Background 区块（工作经历）
- **名称**：Background / Experience
- **内容**：按时间倒序的经历条目（Figma/Cocoon/Dropbox/Facebook/Thread/Squarespace/Freelance）
- **交互模型**：click-driven（公司/外部链接）

### 5. References 区块（推荐）
- **名称**：References / Testimonials
- **内容**：多条推荐语 + 推荐人姓名/职位
- **交互模型**：click-driven（推荐人可能为链接）

### 6. About 区块（关于 + 成就）
- **名称**：About
- **内容**：
  - 个人简介段落
  - Accolades（奖项列表，含 “View Award” 链接）
  - Press（媒体报道列表，含 “View Article” 链接）
- **交互模型**：click-driven

### 7. Colophon 区块（署名/版权）
- **名称**：Colophon
- **内容**：Design and code by… / Typeset in… / © 年份
- **交互模型**：click-driven（字体/厂商名可能为链接）

### 8. Contact 区块（联系）
- **名称**：Contact
- **内容**：
  - 状态：No longer exploring new opportunities / I’ve recently joined Figma.
  - 个人照片
  - 邮箱 + LinkedIn
- **交互模型**：click-driven

## 区块交互模型总结

- **Hero**：static
- **Work**：click-driven（待验证）
- **Values**：static
- **Background**：click-driven
- **References**：click-driven
- **About**：click-driven
- **Colophon**：click-driven
- **Contact**：click-driven
- **左侧导航栏**：scroll-driven（可能用于锚点定位/滚动浏览，待验证）

