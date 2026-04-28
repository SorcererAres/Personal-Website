"use client";

import { useEffect, useRef } from "react";

import { useTheme } from "@/components/system/ThemeProvider";

const ThemeIcon = () => (
  <svg
    className="icon theme"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path d="M17 2h-2v6h2V2zm-1 8c-3.31372 0-6 2.68628-6 6s2.68628 6 6 6 6-2.68628 6-6-2.68628-6-6-6zm0 10c-2.20911 0-4-1.79089-4-4s1.79089-4 4-4 4 1.79089 4 4-1.79089 4-4 4zm-1 10h2v-6h-2v6zM11.05029 9.63605 6.80762 5.39337 5.39337 6.80762l4.24268 4.24268 1.41424-1.41425zm9.89954 12.72796 4.24255 4.24261 1.41425-1.41425-4.24261-4.24268-1.41419 1.41432zM8 15H2v2h6v-2zm16 0v2h6v-2h-6zM5.39337 25.19238l1.41425 1.41425 4.24268-4.24261-1.41425-1.41431-4.24268 4.24267zM26.60663 6.80762l-1.41425-1.41425-4.24268 4.24268 1.41431 1.41412 4.24262-4.24255z" />
  </svg>
);

const GridIcon = () => (
  <svg
    className="icon grid"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path d="M5 28h2V4H5v24zm5 0h2V4h-2v24zm5 0h2V4h-2v24zm5 0h2V4h-2v24zm5-24v24h2V4h-2z" />
  </svg>
);

/** 替代 legacy <aside class="app-aside">：theme slider + grid overlay 按钮 + 语言切换槽。 */
export function AppAside({
  localeSwitcher,
}: {
  localeSwitcher?: React.ReactNode;
}) {
  const { themeIndex, setThemeIndex, toggleGridOverlay, setThemeSliderVisible } =
    useTheme();
  const themeOptionRef = useRef<HTMLDivElement | null>(null);

  // 触摸设备：tap 主题图标显示 slider；任意外部 tap 收起
  useEffect(() => {
    const el = themeOptionRef.current;
    if (!el) return;
    const isTouch = window.matchMedia?.("(hover: none)").matches ?? false;
    if (!isTouch) return;
    function onTouch(e: Event) {
      e.stopPropagation();
      setThemeSliderVisible(true);
    }
    el.addEventListener("click", onTouch);
    function onAnyClick(e: MouseEvent) {
      const target = e.target as Node;
      if (el && el.contains(target)) return;
      setThemeSliderVisible(false);
    }
    document.addEventListener("click", onAnyClick);
    return () => {
      el.removeEventListener("click", onTouch);
      document.removeEventListener("click", onAnyClick);
    };
  }, [setThemeSliderVisible]);

  return (
    <aside className="app-aside">
      <div className="options">
        <div
          ref={themeOptionRef}
          className="option theme"
          onMouseEnter={() => setThemeSliderVisible(true)}
          onMouseLeave={() => setThemeSliderVisible(false)}
        >
          <div className="icon-container">
            <ThemeIcon />
          </div>
          <div className="slider-container">
            <div className="dots" aria-hidden>
              {Array.from({ length: 17 }, (_, i) => (
                <div className="dot" key={i} />
              ))}
            </div>
            <input
              className="slider"
              type="range"
              min={0}
              max={16}
              step={1}
              value={themeIndex}
              onChange={(e) => setThemeIndex(Number(e.target.value))}
              aria-label="Theme slider"
            />
          </div>
        </div>

        <div
          className="option grid"
          role="button"
          tabIndex={0}
          aria-label="Toggle grid overlay"
          onClick={toggleGridOverlay}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleGridOverlay();
            }
          }}
        >
          <div className="content">
            <GridIcon />
          </div>
        </div>

        {localeSwitcher ? (
          <div className="option locale">{localeSwitcher}</div>
        ) : null}
      </div>
    </aside>
  );
}
