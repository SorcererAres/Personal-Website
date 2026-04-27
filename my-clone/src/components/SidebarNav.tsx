"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type NavItem = { id: string; label: string };

const NAV: NavItem[] = [
  { id: "intro", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "values", label: "Values" },
  { id: "background", label: "Background" },
  { id: "references", label: "References" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M5 3v18M12 3v18M19 3v18" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4.25" />
      <path d="M12 2.5v2.25M12 19.25v2.25M21.5 12h-2.25M4.75 12H2.5M19.1 4.9l-1.6 1.6M6.5 17.5l-1.6 1.6M19.1 19.1l-1.6-1.6M6.5 6.5 4.9 4.9" />
    </svg>
  );
}

export function SidebarNav({ className }: { className?: string }) {
  const items = useMemo(() => NAV, []);
  const [active, setActive] = useState("intro");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      {/* 顶部品牌字标（fixed） */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-10">
        <div className="pointer-events-auto select-none text-[26px] leading-none tracking-[-0.02em] text-foreground">
          B
        </div>
      </header>

      {/* 左侧 fixed nav（top:220 / left:40） */}
      <nav
        className={cn(
          "fixed left-6 top-[220px] z-30 hidden flex-col gap-0.5 md:flex md:left-10",
          className,
        )}
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToId(item.id)}
            className={cn(
              "text-left text-[16px] leading-[22px] transition-colors",
              active === item.id
                ? "text-foreground"
                : "text-foreground/35 hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* 左下浮动工具栏 */}
      <aside className="fixed bottom-7 left-7 z-30 hidden flex-col gap-2 md:flex">
        <button
          type="button"
          aria-label="Toggle grid overlay"
          className="grid size-12 place-items-center rounded-full bg-foreground/5 text-foreground/85 backdrop-blur transition-colors hover:bg-foreground/15"
        >
          <GridIcon />
        </button>
        <button
          type="button"
          aria-label="Toggle theme"
          className="grid size-12 place-items-center rounded-full bg-foreground/5 text-foreground/85 backdrop-blur transition-colors hover:bg-foreground/15"
        >
          <SunIcon />
        </button>
      </aside>
    </>
  );
}
