"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

interface AudienceOption {
  id: string;
  label: string;
}

/**
 * 介绍区：受众切换 + 多版本文案。
 * 文案中允许 <br>/<a>/<span> 等内嵌结构（与 legacy 完全一致），
 * 内容由本仓库自行维护，使用 dangerouslySetInnerHTML 直接渲染。
 */
export function Intro() {
  const t = useTranslations("Intro");
  const audiences = t.raw("audiences") as AudienceOption[];
  const texts = t.raw("texts") as Record<string, string>;
  const [active, setActive] = useState<string>(audiences[0]?.id ?? "anyone");

  return (
    <section className="section intro">
      <div className="content">
        <div className="options">
          {audiences.map((a) => (
            <div
              key={a.id}
              className={`option ${a.id} ${active === a.id ? "is--active" : ""}`}
              role="button"
              tabIndex={0}
              onClick={() => setActive(a.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(a.id);
                }
              }}
            >
              {a.label}
            </div>
          ))}
        </div>

        <div className="texts">
          {audiences.map((a) => (
            <h1
              key={a.id}
              className={`text ${a.id} ${active === a.id ? "is--visible" : ""}`}
              dangerouslySetInnerHTML={{ __html: texts[a.id] ?? "" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
