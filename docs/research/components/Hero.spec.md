# Hero Specification

## Overview
- **Target file:** `src/components/Hero.tsx`
- **Screenshot:** `docs/design-references/billysweeney.com/desktop-full.png`
- **Interaction model:** static

## DOM Structure
- 外层 `section#intro`
  - 顶部一行“受众导航”（For anyone / Recruiters / … / Engineers）
  - 大标题（多行断行）

## Computed Styles (exact values from getComputedStyle)
N/A（当前以截图对齐为主；后续用浏览器 computed styles 补齐精确值）

## Text Content (verbatim)
- For anyone / Recruiters / Design Directors / Product Designers / Product Managers / Engineers
- Hello there, I’m a designer who cares about making beautiful things that help people.

## Responsive Behavior
- **Desktop (1440px):** 大标题左对齐，行高紧凑，右侧留白大
- **Mobile (390px):** 字号缩小，仍保持多行断行；受众导航可能被截断/换行

