"use client";

import Image from "next/image";

import { Section } from "@/components/sections/Section";
import { cn } from "@/lib/utils";

export function ContactSection({ className }: { className?: string }) {
  return (
    <Section id="contact" className={cn("pt-28 pb-40", className)}>
      <div className="text-[11px] leading-4 text-foreground/45">Contact</div>

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_340px] md:items-start">
        <div className="space-y-5">
          <div className="text-[14px] leading-5 font-semibold text-foreground">
            No longer exploring new opportunities
          </div>
          <div className="text-[28px] leading-[1.05] font-semibold tracking-tight text-foreground">
            I’ve recently joined Figma.
          </div>

          <div className="mt-8 space-y-2 text-[14px] leading-5 text-foreground/65">
            <a
              href="mailto:billy.sweeney@gmail.com"
              className="block text-foreground/75 hover:text-foreground transition-colors"
            >
              billy.sweeney@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="block text-foreground/75 hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5">
          <Image
            src="/images/billy-sweeney-profile.jpg"
            alt="Profile photo of Billy Sweeney"
            width={1600}
            height={1600}
            className="h-auto w-full"
            priority
          />
        </div>
      </div>
    </Section>
  );
}

