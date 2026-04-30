"use client";

import { useEffect, useState } from "react";

import { useTheme } from "@/components/system/ThemeProvider";
import type { SectionId } from "@/lib/site-contracts";

export interface NavItem {
  /** 与 section 的 class 名一致：intro / work / values / background / references / about / contact */
  id: SectionId;
  label: string;
}

/** 替代 legacy <nav class="app-nav">：监听 section 滚动激活 + 点击平滑滚动。 */
export function AppNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "intro");
  const { mobileNavVisible, closeMobileNav } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        // section 仅用 class（如 section intro），无 HTML id；从 classList 对齐 NavItem.id
        const id = items.find((it) => visible.target.classList.contains(it.id))?.id;
        if (id) setActive(id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    items.forEach((it) => {
      const el = document.querySelector(`section.section.${it.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  function scrollTo(id: string) {
    const el = document.querySelector(`section.section.${id}`);
    if (el) {
      // 与 legacy easeOutCubic 接近：浏览器原生 smooth + 校正 90px 顶部偏移（参考 script.js scrollToValues 注释）
      const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
    }
    if (mobileNavVisible) {
      window.setTimeout(closeMobileNav, 300);
    }
  }

  return (
    <nav className="app-nav">
      <div className="content">
        {items.map((item) => (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            className={`item ${item.id} ${active === item.id ? "is--active" : ""}`}
            onClick={() => scrollTo(item.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                scrollTo(item.id);
              }
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </nav>
  );
}
