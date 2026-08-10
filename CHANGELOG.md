# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- （尚无）

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

[Unreleased]: https://github.com/sorcererdesign/Personal-Website/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/sorcererdesign/Personal-Website/releases/tag/v1.0.0
