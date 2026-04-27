"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";

import { getPathname, usePathname } from "@/i18n/navigation";

const MOUNT_ID = "locale-switcher-mount";

/**
 * Legacy 站点依赖 `$(document).ready` 一次性绑定（script.js）。
 * 若用 Next 客户端软路由切语言，DOM 会换而脚本不重新执行，导航/主题/网格等会失效。
 * 因此语言入口使用原生 <a href> 触发整页加载，保证 legacy 与首次进入一致。
 */
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

/** 注入到 legacy 侧栏 `#locale-switcher-mount`。 */
export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("LocaleSwitcher");
  const [mount, setMount] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMount(document.getElementById(MOUNT_ID));
  }, []);

  const targetLocale = locale === "zh" ? "en" : "zh";
  const label = targetLocale === "en" ? t("switchToEn") : t("switchToZh");
  /**
   * 关键：必须 forcePrefix。
   * 默认 locale 是 zh + `as-needed`，`getPathname({locale:'zh'})` 会生成 `/`（无前缀）；
   * 但 next-intl 中间件用 `NEXT_LOCALE` cookie 锁定语言，
   * 锁在 en 时再请求 `/` 仍会被 rewrite 到 `/en`，导致切不回中文。
   * `forcePrefix` 让链接落到 `/zh` / `/en`，中间件会顺便刷新 cookie。
   */
  const href = getPathname({
    href: pathname,
    locale: targetLocale,
    forcePrefix: true,
  });

  useEffect(() => {
    const id = "billy-locale-prefetch";
    let el = document.getElementById(id) as HTMLLinkElement | null;
    if (!el) {
      el = document.createElement("link");
      el.id = id;
      el.rel = "prefetch";
      document.head.appendChild(el);
    }
    el.href = href;
  }, [href]);

  const control = (
    <a href={href} title={label} aria-label={label}>
      <GlobeIcon />
    </a>
  );

  if (mount) {
    return createPortal(control, mount);
  }

  return null;
}
