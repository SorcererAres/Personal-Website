import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ASSETS = [
  // 头像：使用本人照片 public/images/zhang-liangpeng-1600.png（及 billy-legacy 镜像路径），不再从原站下载
  // 自托管字体（站点称作 Billy Sans，本质是 Roobert Medium）
  {
    url: "https://billysweeney.com/assets/fonts/Roobert-Medium.woff2",
    out: "public/fonts/Roobert-Medium.woff2",
  },
  // Work 拼贴
  {
    url: "https://billysweeney.com/assets/work/Billy-Sweeney-work-collage-1440.jpg",
    out: "public/images/work/Billy-Sweeney-work-collage-1440.jpg",
  },
  {
    url: "https://billysweeney.com/assets/work/Billy-Sweeney-work-collage-2880.jpg",
    out: "public/images/work/Billy-Sweeney-work-collage-2880.jpg",
  },
  {
    url: "https://billysweeney.com/assets/work/Billy-Sweeney-work-collage-shape.svg",
    out: "public/images/work/Billy-Sweeney-work-collage-shape.svg",
  },
  // SEO
  {
    url: "https://billysweeney.com/assets/app/favicon-32x32.png",
    out: "public/seo/favicon-32x32.png",
  },
  {
    url: "https://billysweeney.com/assets/app/sharing-image-2400x2400.png",
    out: "public/seo/sharing-image-2400x2400.png",
  },
];

async function download(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return buf;
}

async function main() {
  for (const { url, out } of ASSETS) {
    const absOut = path.resolve(out);
    await mkdir(path.dirname(absOut), { recursive: true });
    try {
      const data = await download(url);
      await writeFile(absOut, data);
      process.stdout.write(
        `Downloaded ${url} -> ${out} (${data.length} bytes)\n`,
      );
    } catch (err) {
      process.stderr.write(`Failed ${url}: ${err?.message ?? err}\n`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
