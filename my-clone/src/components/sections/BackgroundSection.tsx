import { CompanyIcon } from "@/components/icons/CompanyIcon";
import { Section } from "@/components/sections/Section";
import { cn } from "@/lib/utils";

type Slug =
  | "figma"
  | "cocoon"
  | "dropbox"
  | "facebook"
  | "thread"
  | "squarespace"
  | "freelance";

type Role = {
  slug: Slug;
  company: string;
  title: string;
  time: string;
  location: string;
  blurb: string;
  href?: string;
};

const ROLES: Role[] = [
  {
    slug: "figma",
    company: "Figma",
    title: "Product Designer",
    time: "Now",
    location: "Seattle",
    blurb: "Working on design systems products.",
    href: "https://www.figma.com/",
  },
  {
    slug: "cocoon",
    company: "Cocoon",
    title: "Director of Design",
    time: "2023",
    location: "Seattle",
    blurb:
      "I led and executed design across product and brand, built a team from the ground up, significantly increased conversion, and directed a company rebrand, as we worked to build the leave management platform our loved ones deserve.",
    href: "https://www.cocoon.com/",
  },
  {
    slug: "dropbox",
    company: "Dropbox",
    title: "Staff Product Designer",
    time: "2020–2022",
    location: "Seattle",
    blurb:
      "I led the design of a complete web product redesign, several emerging zero to one products, as well as global navigation systems and information architecture for the company’s multi-product strategy.",
    href: "https://www.dropbox.com/",
  },
  {
    slug: "facebook",
    company: "Facebook",
    title: "Product Designer",
    time: "2018–2020",
    location: "Seattle",
    blurb:
      "I worked on Marketplace, leading design for the browse feed, buyer platform, vehicles category, and design systems, enabling dozens of teams to ship with consistency and performance to hundreds of millions of users.",
    href: "https://www.facebook.com/",
  },
  {
    slug: "thread",
    company: "Thread",
    title: "Head of Design",
    time: "2017–2018",
    location: "London",
    blurb:
      "I was brought on to both lead and individually execute design across all company initiatives as we built a deeply personalized online shopping product which blended a team of human stylists with machine learning.",
    href: "https://www.thread.com/",
  },
  {
    slug: "squarespace",
    company: "Squarespace",
    title: "Design Lead",
    time: "2011–2017",
    location: "New York · Portland",
    blurb:
      "As an early design hire, I wore many hats across brand and product design during my tenure, helping to redefine web publishing and establish the company into household name.",
    href: "https://www.squarespace.com/",
  },
  {
    slug: "freelance",
    company: "Freelance",
    title: "Designer and Director",
    time: "2008–2019",
    location: "New York · London · Seattle · Portland · Tempe",
    blurb:
      "I’ve been commissioned to create custom websites, apps, and identity systems for select clients including National Geographic photographers, Academy award-winning film-makers, and global entrepreneurs.",
  },
];

const INTRO =
  "I studied visual communication design, got my start in branding, marketing, and web design, then evolved to specialize in product design. Leveraging my visual design foundation and deep user empathy, I’ve established myself as a well rounded design leader who creates human-centered platforms with cohesive throughlines at every touchpoint: from vision and strategy, to brand awareness and marketing, to product development and delightful micro interactions. Throughout my 15 years of professional experience, I’ve worked freelance, in-house, at startups, and at established public companies, developing a wide range of multi-disciplinary skills in diverse contexts. My insatiable curiosity, high craft, and adaptability, enable me to generate impact in our ever-changing\u00a0environment.";

export function BackgroundSection({ className }: { className?: string }) {
  return (
    <Section id="background" className={cn("pt-28 pb-28", className)}>
      <p className="max-w-[860px] text-[20px] leading-[1.45] text-foreground/85 sm:text-[22px] md:text-[26px] md:leading-[1.4]">
        {INTRO}
      </p>

      <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-14">
        {ROLES.map((r) => (
          <article key={r.company} className="space-y-3">
            <div className="text-foreground/85">
              <CompanyIcon slug={r.slug} className="size-12" />
            </div>
            <div>
              {r.href ? (
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[18px] leading-tight text-foreground/55 hover:text-foreground transition-colors"
                >
                  {r.company}
                </a>
              ) : (
                <span className="text-[18px] leading-tight text-foreground/55">
                  {r.company}
                </span>
              )}
            </div>
            <div className="text-[26px] leading-[1.1] tracking-tight text-foreground">
              {r.title}
            </div>
            <p className="text-[14px] leading-5 text-foreground/55">
              <span>{r.time}</span>
              <span className="px-2 text-foreground/30">·</span>
              <span>{r.location}</span>
            </p>
            <p className="max-w-[520px] text-[16px] leading-[1.55] text-foreground/80">
              {r.blurb}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
