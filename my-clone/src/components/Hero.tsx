"use client";

import { useState } from "react";

import { Section } from "@/components/sections/Section";

type AudienceId =
  | "anyone"
  | "recruiters"
  | "design-directors"
  | "product-designers"
  | "product-managers"
  | "engineers";

const AUDIENCES: { id: AudienceId; label: string }[] = [
  { id: "anyone", label: "For anyone" },
  { id: "recruiters", label: "Recruiters" },
  { id: "design-directors", label: "Design Directors" },
  { id: "product-designers", label: "Product Designers" },
  { id: "product-managers", label: "Product Managers" },
  { id: "engineers", label: "Engineers" },
];

const TEXTS: Record<AudienceId, React.ReactNode> = {
  anyone: (
    <>
      <span className="hidden md:inline">
        Hello there, I’m a <br />
        designer who cares <br />
        about making <br />
        beautiful things that <br />
        help people.
      </span>
      <span className="md:hidden">
        Hello there, I’m a designer who cares about making beautiful things
        that help people.
      </span>
    </>
  ),
  recruiters: (
    <>
      I’m a product designer with 15 years of experience across brand and
      product, at companies large and small. I’m not actively looking for a new
      role.
    </>
  ),
  "design-directors": (
    <>
      I take pride in my craft, and love mentoring earlier career designers. I
      develop cross functional partnerships, and thrive in complex, ambiguous
      environments.
    </>
  ),
  "product-designers": (
    <>
      I’m a systems thinker with a high bar for quality. From process to pixels,
      I’ll collaborate with you, learn from you, and help make something we’re
      proud of.
    </>
  ),
  "product-managers": (
    <>
      I bring end-to-end product acumen, from vision and strategy to discovery
      and delivery. I’ll partner closely with you to generate the highest impact
      possible.
    </>
  ),
  engineers: (
    <>
      I’m {"{highly_technical}"} and while (I’m ≠ engineer) I know my way /around
      &amp; can speak “fluently” with you; I built (
      <a
        href="/"
        target="_blank"
        rel="noreferrer noopener"
        className="border-b border-foreground/30 hover:border-foreground"
      >
        this.site
      </a>
      ) from scratch + (
      <a
        href="https://ratio.haus/"
        target="_blank"
        rel="noreferrer noopener"
        className="border-b border-foreground/30 hover:border-foreground"
      >
        this.one
      </a>
      ) &amp;&amp; (
      <a
        href="https://gibberishfactory.com/"
        target="_blank"
        rel="noreferrer noopener"
        className="border-b border-foreground/30 hover:border-foreground"
      >
        this.too
      </a>
      ).
    </>
  ),
};

export function Hero({ className }: { className?: string }) {
  const [active, setActive] = useState<AudienceId>("anyone");

  return (
    <Section
      id="intro"
      className={className}
      contentClassName="pt-[209px] pb-20"
    >
      <div
        className="-mx-1 flex flex-nowrap gap-x-5 gap-y-2 overflow-x-auto px-1 text-[16px] leading-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible"
      >
        {AUDIENCES.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setActive(a.id)}
            className={
              "shrink-0 whitespace-nowrap " +
              (active === a.id
                ? "text-foreground transition-colors"
                : "text-foreground/35 transition-colors hover:text-foreground")
            }
          >
            {a.label}
          </button>
        ))}
      </div>

      <h1 className="mt-12 max-w-[920px] text-balance text-[34px] leading-[1.05] font-medium tracking-[-0.02em] text-foreground sm:text-[52px] md:text-[clamp(36px,5.14vw,5.14vw)] md:leading-[0.975]">
        {TEXTS[active]}
      </h1>
    </Section>
  );
}
