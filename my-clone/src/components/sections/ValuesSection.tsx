import { Section } from "@/components/sections/Section";
import { cn } from "@/lib/utils";

const VALUES = ["Useful", "Considered", "Beautiful", "Well made"] as const;

export function ValuesSection({ className }: { className?: string }) {
  return (
    <Section id="values" className={cn("pt-28 pb-28", className)}>
      <div className="grid gap-12 md:grid-cols-2 md:gap-10">
        <div className="space-y-1">
          {VALUES.map((v) => (
            <h2
              key={v}
              className="text-[56px] leading-[1] font-medium tracking-[-0.02em] text-foreground sm:text-[68px] md:text-[88px] md:leading-[0.95]"
            >
              {v}
            </h2>
          ))}
        </div>

        <p className="max-w-[520px] self-end text-[16px] leading-[1.55] text-foreground/80 md:text-[18px] md:leading-[1.5]">
          These are my core design values, and I strive to imbue them in all of
          the work I do. I’ve always been making things and inventing ways to
          improve my surroundings. Solving a tangible need with a beautiful
          solution is a practice I love and resides in my core. Collaborating
          with a team to create a far better outcome than otherwise possible
          alone gives me energy. I like thinking big, working fast, yet
          carefully, holistically, long-term, sustainably, cross-functionally,
          zooming out on company strategy, and zooming in on details. I’m
          always improving, growing, and executing to the highest standard
          possible. All while achieving a larger mission, connecting my work to
          something deeper, tethered to improving the world, leaving it better
          than when&nbsp;I&nbsp;began.
        </p>
      </div>
    </Section>
  );
}
