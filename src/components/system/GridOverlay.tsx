"use client";

import { useTheme } from "@/components/system/ThemeProvider";

/** 12 列 × 2 line 辅助网格（按 g/; 键或 grid 按钮触发）。 */
export function GridOverlay() {
  const { gridOverlayVisible } = useTheme();
  return (
    <div className={`app-grid-overlay ${gridOverlayVisible ? "is--visible" : ""}`}>
      {Array.from({ length: 12 }, (_, i) => (
        <div className="column" key={i}>
          <div className="line" />
          <div className="line" />
        </div>
      ))}
    </div>
  );
}
