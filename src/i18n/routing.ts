import { defineRouting } from "next-intl/routing";

/**
 * 永远在 URL 前缀显示 locale（/zh、/en），避免与 NEXT_LOCALE cookie 互锁导致语言切换器死循环。
 * Middleware 仍按 Accept-Language 协商首访语言，但跳转后 URL 始终带 locale 前缀。
 */
export const routing = defineRouting({
  locales: ["zh", "en"],
  defaultLocale: "zh",
  localePrefix: "always",
  localeDetection: true,
});
