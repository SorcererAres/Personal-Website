#!/usr/bin/env node
/**
 * 用 pixelmatch 对比两张 PNG（须同尺寸）。
 * 用法：
 *   node scripts/visual-diff.mjs <baseline.png> <candidate.png> [diff-out.png]
 *
 * 基线可取自 docs/design-references/…；候选图为本地导出整页截图（如 1440×900）。
 * 退出码：0 差异在阈值内；2 尺寸不符；3 差异像素过多。
 */
import fs from "node:fs";
import process from "node:process";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const [, , baselinePath, candidatePath, diffOutPath] = process.argv;

if (!baselinePath || !candidatePath) {
  console.error(
    "用法: node scripts/visual-diff.mjs <baseline.png> <candidate.png> [diff-out.png]",
  );
  process.exit(1);
}

const img1 = PNG.sync.read(fs.readFileSync(baselinePath));
const img2 = PNG.sync.read(fs.readFileSync(candidatePath));
const { width, height } = img1;
if (img2.width !== width || img2.height !== height) {
  console.error(
    "尺寸不一致:",
    `${width}×${height}`,
    "vs",
    `${img2.width}×${img2.height}`,
  );
  process.exit(2);
}

const diff = new PNG({ width, height });
const numDiffPixels = pixelmatch(
  img1.data,
  img2.data,
  diff.data,
  width,
  height,
  { threshold: 0.1 },
);

if (diffOutPath) {
  fs.writeFileSync(diffOutPath, PNG.sync.write(diff));
}

const total = width * height;
const pct = ((numDiffPixels / total) * 100).toFixed(4);
console.log("差异像素:", numDiffPixels, "/", total, `(${pct}%)`);
/** 宽松阈值：整页重排时只产出 diff 图供人工看，CI 可把此值调严 */
const maxAllowed = Number(process.env.VISUAL_DIFF_MAX_PIXELS ?? "8000");
if (numDiffPixels > maxAllowed) {
  console.error("超过 VISUAL_DIFF_MAX_PIXELS (" + maxAllowed + ")");
  process.exit(3);
}
