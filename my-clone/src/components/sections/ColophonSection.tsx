"use client";

import { Section } from "@/components/sections/Section";
import { cn } from "@/lib/utils";

export function ColophonSection({ className }: { className?: string }) {
  return (
    <Section id="colophon" className={cn("pt-20 pb-20", className)}>
      <div className="text-[12px] leading-5 text-foreground/55">
        Design and code by{" "}
        <a
          href="/"
          className="text-foreground/70 hover:text-foreground transition-colors"
        >
          Zhang Liangpeng
        </a>
        <br />
        Typeset in{" "}
        <a
          href="https://displaay.net/typeface/roobert-collection/roobert/"
          target="_blank"
          rel="noreferrer noopener"
          className="text-foreground/70 hover:text-foreground transition-colors"
        >
          Roobert Medium
        </a>{" "}
        by{" "}
        <a
          href="https://displaay.net/"
          target="_blank"
          rel="noreferrer noopener"
          className="text-foreground/70 hover:text-foreground transition-colors"
        >
          Displaay Type Foundry
        </a>
        <br />© 2026
      </div>
    </Section>
  );
}

