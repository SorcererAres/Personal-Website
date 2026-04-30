"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

import { AppAside } from "@/components/system/AppAside";
import { AppHeader } from "@/components/system/AppHeader";
import { AppNav, type NavItem } from "@/components/system/AppNav";
import { GridOverlay } from "@/components/system/GridOverlay";
import { SECTION_IDS } from "@/lib/site-contracts";

/**
 * 整站壳层：包裹 ThemeProvider 并组装 header/nav/aside/grid overlay 与 main 内容。
 * 接收 localeSwitcher 槽，由父级把 next-intl Link 注入 AppAside。
 */
export function AppShell({
  cover,
  children,
  localeSwitcher,
}: {
  cover?: ReactNode;
  children: ReactNode;
  localeSwitcher?: ReactNode;
}) {
  const t = useTranslations("Nav");
  const navItems: NavItem[] = SECTION_IDS.map((id) => ({ id, label: t(id) }));
  const brand = useTranslations("Brand")("name");

  return (
    <>
      <AppHeader brand={brand} />
      <AppNav items={navItems} />
      <main className="app-main">
        {cover}
        {children}
      </main>
      <AppAside localeSwitcher={localeSwitcher} />
      <GridOverlay />
    </>
  );
}
