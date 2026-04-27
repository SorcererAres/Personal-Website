import { defineRouting } from "next-intl/routing";

/** 默认 zh：无前缀 URL；英文在 /en。Middleware 按 Accept-Language 协商首访语言。 */
export const routing = defineRouting({
  locales: ["zh", "en"],
  defaultLocale: "zh",
  localePrefix: "as-needed",
  localeDetection: true,
});
