import { Section } from "@/components/sections/Section";
import { cn } from "@/lib/utils";

type Reference = {
  quote: string;
  name: string;
  title: string;
  href: string;
};

const REFERENCES: Reference[] = [
  {
    quote: "“Truly one of the best design collaborators I’ve ever worked with.”",
    name: "Grace Erickson",
    title: "Director of Marketing",
    href: "https://www.linkedin.com/in/ericksongrace/",
  },
  {
    quote:
      "“Liangpeng has an exceedingly rare blend of high craft and superb strategic and systems thinking.”",
    name: "Seth Fields",
    title: "Senior UX Program Manager",
    href: "https://www.linkedin.com/in/seth-fields/",
  },
  {
    quote:
      "“Liangpeng exemplifies inspirational leadership and unwavering compassion, setting a remarkable standard for craftsmanship.”",
    name: "Dionne Ong",
    title: "Product Designer",
    href: "https://www.linkedin.com/in/ong-dionne/",
  },
  {
    quote:
      "“Liangpeng is an incredible leader, mentor, and human—a visionary and craftsperson with care for people.”",
    name: "Kait Smith Lowden",
    title: "Director of Product Design",
    href: "https://www.linkedin.com/in/kaitsmithlowden/",
  },
  {
    quote:
      "“Liangpeng’s attention to detail and work ethic are insanely diligent. He understands the capabilities and limitations of designing for the web in a way I’m not sure I’ve seen in many others.”",
    name: "Ryan Quintal",
    title: "Staff Product Designer",
    href: "https://www.linkedin.com/in/ryanq/",
  },
  {
    quote:
      "“Liangpeng is an incredibly thoughtful, meticulous, and craft-oriented designer who blew us away with his ability to think big picture and come up with creative solutions on the spot.”",
    name: "Bec Lai",
    title: "Staff Product Designer",
    href: "https://www.linkedin.com/in/beclai/",
  },
];

export function ReferencesSection({ className }: { className?: string }) {
  return (
    <Section id="references" className={cn("pt-28 pb-28", className)}>
      <div className="grid gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-16">
        {REFERENCES.map((r) => (
          <article key={r.href} className="space-y-4">
            <h2 className="text-[26px] leading-[1.18] font-medium tracking-[-0.01em] text-foreground md:text-[28px]">
              {r.quote}
            </h2>
            <p className="text-[14px] leading-5 text-foreground/55">
              <a
                href={r.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-foreground/85 hover:text-foreground transition-colors"
              >
                {r.name}
              </a>
              <span className="px-2 text-foreground/30">·</span>
              <span>{r.title}</span>
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

