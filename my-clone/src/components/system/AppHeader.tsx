"use client";

import { useTheme } from "@/components/system/ThemeProvider";

/** 把字符串拆成 <span> 数组（保留 :nth-child 字标动画）。 */
function splitLetters(text: string) {
  return Array.from(text).map((ch, i) => (
    <span key={i}>{ch === " " ? "\u00A0" : ch}</span>
  ));
}

/** 替代 legacy <header class="app-header">：左侧字标 + 右侧汉堡按钮。 */
export function AppHeader({ brand }: { brand: string }) {
  const { toggleMobileNav } = useTheme();

  return (
    <header className="app-header">
      <div className="content">
        <div className="brand">
          <h3>{splitLetters(brand)}</h3>
        </div>
        <div className="actions">
          <div
            className="option navigation"
            role="button"
            tabIndex={0}
            aria-label="Toggle mobile navigation"
            onClick={toggleMobileNav}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleMobileNav();
              }
            }}
          >
            <div className="content">
              <div className="icon">
                <div className="line">
                  <div className="content"></div>
                </div>
                <div className="line">
                  <div className="content"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
