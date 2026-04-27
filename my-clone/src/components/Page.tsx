"use client";

import { Hero } from "@/components/Hero";
import { SidebarNav } from "@/components/SidebarNav";
import { AboutSection } from "@/components/sections/AboutSection";
import { BackgroundSection } from "@/components/sections/BackgroundSection";
import { ColophonSection } from "@/components/sections/ColophonSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ReferencesSection } from "@/components/sections/ReferencesSection";
import { ValuesSection } from "@/components/sections/ValuesSection";
import { WorkSection } from "@/components/sections/WorkSection";

export function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SidebarNav />
      <div className="flex flex-col">
        <Hero />
        <WorkSection />
        <ValuesSection />
        <BackgroundSection />
        <ReferencesSection />
        <AboutSection />
        <ColophonSection />
        <ContactSection />
      </div>
    </main>
  );
}

