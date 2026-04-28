"use client";

import { ThemeProvider } from "@/components/system/ThemeProvider";

/** 放在 [locale]/layout 内、随布局持久化，避免 /zh ↔ /en 软路由时整页重挂 ThemeProvider。 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
