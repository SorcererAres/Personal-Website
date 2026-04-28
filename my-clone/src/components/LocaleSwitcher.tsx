"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";

function GlobeIcon() {
  return (
    <svg
      className="icon locale"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      aria-hidden
    >
      <circle cx="16" cy="16" r="9.75" />
      <ellipse cx="16" cy="16" rx="9.75" ry="4.25" />
      <path d="M6 16h20" />
      <path d="M7.5 11.25c2.33 1.6 4.66 2.4 8.5 2.4s6.17-.8 8.5-2.4M7.5 20.75c2.33-1.6 4.66-2.4 8.5-2.4s6.17.8 8.5 2.4" />
    </svg>
  );
}

/**
 * 语言切换：localePrefix:"always" 后无需 forcePrefix/cookie hack，
 * 直接用 next-intl/Link 切换 locale 即可保持软路由（不整页 reload）。
 */
export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("LocaleSwitcher");

  const target = locale === "zh" ? "en" : "zh";
  const label = target === "en" ? t("switchToEn") : t("switchToZh");

  return (
    <Link href={pathname} locale={target} title={label} aria-label={label}>
      <GlobeIcon />
    </Link>
  );
}
