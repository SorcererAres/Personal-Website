import { Section } from "@/components/sections/Section";
import { cn } from "@/lib/utils";

type LinkItem = {
  org: string;
  line: string;
  href: string;
  cta: string;
};

const ACCOLADES: LinkItem[] = [
  {
    org: "Art Directors Club (ADC)",
    line: "93rd Annual Awards, Interactive, Silver, 2014 — Project: Squarespace.com “Create Your Own Space”",
    href: "http://adcglobal.org/wp-content/uploads/2014/04/WinnersNightTwoFINAL.pdf",
    cta: "View Award",
  },
  {
    org: "The Webby Awards",
    line: "21st Annual Awards, Web Services & Applications, 2017 — Project: Squarespace",
    href: "http://webbyawards.com/winners/2017/websites/general-website/web-services-applications/squarespace/",
    cta: "View Award",
  },
  {
    org: "The Webby Awards",
    line: "20th Annual Awards, Web Services & Applications, 2016 — Project: Squarespace",
    href: "http://webbyawards.com/winners/2016/websites/general-website/web-services-applications/squarespace/",
    cta: "View Award",
  },
  {
    org: "The Webby Awards",
    line: "18th Annual Awards, Web Services & Applications, 2014 — Project: Squarespace",
    href: "http://webbyawards.com/winners/2014/websites/general-website/web-services-applications/squarespace/",
    cta: "View Award",
  },
  {
    org: "The Webby Awards",
    line: "18th Annual Awards, Best Visual Design - Aesthetic, 2014 — Project: Squarespace.com",
    href: "http://www.webbyawards.com/winners/2014/web/website-features-and-design/best-visual-design-aesthetic/squarespace",
    cta: "View Award",
  },
  {
    org: "The Webby Awards",
    line: "18th Annual Awards, Best Home/Welcome Page, 2014 — Project: Squarespace.com",
    href: "http://www.webbyawards.com/winners/2014/web/website-features-and-design/best-homewelcome-page/squarespace",
    cta: "View Award",
  },
  {
    org: "The Webby Awards",
    line: "17th Annual Awards, Best Home/Welcome Page, 2013 — Project: Squarespace.com",
    href: "http://winners.webbyawards.com/2013/web/website-features-and-design/best-homewelcome-page/squarespace",
    cta: "View Award",
  },
  {
    org: "Communication Arts",
    line: "Interactive Annual 20, Websites/Microsites, 2014 — Project: Squarespace.com “Create Your Own Space”",
    href: "http://www.commarts.com/gallery/interactive/all/all/2014/61938/1",
    cta: "View Award",
  },
  {
    org: "Communication Arts",
    line: "Webpick of the Day, 3 February 2014 — Project: Personal site",
    href: "http://www.commarts.com/webpicks/billy-sweeney",
    cta: "View Award",
  },
  {
    org: "AWWWARDS",
    line: "Site of the Day, 23 February 2014 — Project: The Official Squarespace Blog",
    href: "https://www.awwwards.com/sites/the-official-squarespace-blog",
    cta: "View Award",
  },
  {
    org: "AWWWARDS",
    line: "Site of the Day, 4 July 2013 — Project: Squarespace.com “Create Your Own Space”",
    href: "https://www.awwwards.com/sites/squarespace-create-your-own-space",
    cta: "View Award",
  },
  {
    org: "AWWWARDS",
    line: "Site of the Day, 12 September 2012 — Project: Squarespace.com",
    href: "https://www.awwwards.com/sites/squarespace",
    cta: "View Award",
  },
  {
    org: "Favourite Website Awards (FWA)",
    line: "Site of the Day, 5 August 2013 — Project: Squarespace.com “Create Your Own Space”",
    href: "https://thefwa.com/cases/squarespace-create-your-own-space",
    cta: "View Award",
  },
  {
    org: "Site Inspire",
    line: "Featured Website, April 2016 — Project: Squarespace Circle",
    href: "https://www.siteinspire.com/websites/6398-circle-by-squarespace",
    cta: "View Award",
  },
  {
    org: "Site Inspire",
    line: "Featured Website, January 2014 — Project: The Official Squarespace Blog",
    href: "https://www.siteinspire.com/websites/832-squarespace-blog",
    cta: "View Award",
  },
  {
    org: "Site Inspire",
    line: "Featured Website, November 2013 — Project: Squarespace.com — Mobile Apps",
    href: "https://www.siteinspire.com/websites/4128-squarespace-mobile-apps",
    cta: "View Award",
  },
];

const PRESS: LinkItem[] = [
  {
    org: "InVision",
    line: "Inside Design: Squarespace — 23 January 2017",
    href: "https://www.invisionapp.com/blog/inside-design-squarespace/",
    cta: "View Article",
  },
  {
    org: "The Dots UK",
    line: "The Inside Scoop on The New Squarespace Circle Branding — 18 November 2016",
    href: "https://the-dots.com/projects/the-inside-scoop-on-the-new-squarespace-circle-branding-145111",
    cta: "View Article",
  },
  {
    org: "Interface Lovers",
    line: "Zhang Liangpeng — 13 October 2016",
    href: "https://interfacelovers.com/interviews/billy-sweeney",
    cta: "View Article",
  },
  {
    org: "HOW",
    line: "The Rules of Exposure: Leveraging Photography As a Self-Promotion Tool — 19 September 2016",
    href: "http://www.howdesign.com/design-career/the-rules-of-exposure-leveraging-photography-as-a-self-promotion-tool/",
    cta: "View Article",
  },
  {
    org: "Design Milk",
    line: "Squarespace Circle + Branding Behind-the-Scenes — 29 August 2016",
    href: "http://design-milk.com/squarespace-circle-top-photo-shoot/",
    cta: "View Article",
  },
];

function LinkList({ title, items }: { title: string; items: LinkItem[] }) {
  return (
    <div className="mt-12">
      <div className="text-[12px] leading-4 font-semibold tracking-tight text-foreground">
        {title}
      </div>
      <div className="mt-5 space-y-4">
        {items.map((it) => (
          <div key={it.href} className="text-[13px] leading-5 text-foreground/65">
            <div className="text-foreground/80">{it.org}</div>
            <div className="text-foreground/55">{it.line}</div>
            <a
              href={it.href}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-1 inline-block text-foreground/70 hover:text-foreground transition-colors"
            >
              {it.cta}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AboutSection({ className }: { className?: string }) {
  return (
    <Section id="about" className={cn("pt-28 pb-28", className)}>
      <p className="max-w-[860px] text-[18px] leading-[1.6] text-foreground/85 md:text-[20px] md:leading-[1.55]">
          With 15 years of experience across brand and product design, at
          companies large and small, I’ve developed a skillset with breadth and
          depth. I’m currently working on design systems products at{" "}
          <a
            href="https://www.figma.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-foreground/75 hover:text-foreground transition-colors"
          >
            Figma
          </a>
          , was previously the Director of Design at{" "}
          <a
            href="https://www.cocoon.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-foreground/75 hover:text-foreground transition-colors"
          >
            Cocoon
          </a>
          , a Staff Product Designer at{" "}
          <a
            href="https://www.dropbox.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-foreground/75 hover:text-foreground transition-colors"
          >
            Dropbox
          </a>
          , a Product Designer at{" "}
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-foreground/75 hover:text-foreground transition-colors"
          >
            Facebook
          </a>
          , the Head of Design at{" "}
          <a
            href="https://www.thread.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-foreground/75 hover:text-foreground transition-colors"
          >
            Thread
          </a>
          , a Design Lead at{" "}
          <a
            href="https://www.squarespace.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-foreground/75 hover:text-foreground transition-colors"
          >
            Squarespace
          </a>
          , a freelance designer and director commissioned by a variety of
          clients, and a close collaborator to many incredible people across
          multiple disciplines. I’m a classically trained designer, who holds a
          Bachelor of Science in Graphic Design. I live in Seattle with my wife
          and son, spending time outside as often as possible.
      </p>

      <LinkList title="Accolades" items={ACCOLADES} />
      <LinkList title="Press" items={PRESS} />
    </Section>
  );
}

