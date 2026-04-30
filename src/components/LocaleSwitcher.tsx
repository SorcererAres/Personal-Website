"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";

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
  const shortLabel = target === "en" ? "EN" : "CN";
  const targetLang = target === "en" ? "en" : "zh-Hans";

  return (
    <Link
      href={pathname}
      locale={target}
      title={label}
      aria-label={label}
      lang={targetLang}
    >
      <span className="locale-switcher__label">{shortLabel}</span>
    </Link>
  );
}
