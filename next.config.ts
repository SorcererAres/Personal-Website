import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Vercel 自带构建输出流程，standalone 会与之冲突（next-server.js.nft.json 缺失）；
  // 仅在非 Vercel 环境保留 standalone，供容器部署使用。
  output: process.env.VERCEL ? undefined : "standalone",
};

export default withNextIntl(nextConfig);
