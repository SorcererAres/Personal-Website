import sanitizeHtml from "sanitize-html";
import { z } from "zod";

import {
  BACKGROUND_ICON_KEYS,
  SECTION_IDS,
  type BackgroundIconKey,
} from "@/lib/site-contracts";

type Locale = "zh" | "en";

const HTML_TAGS = ["a", "br", "span"] as const;
const SPAN_CLASSES = ["title", "description", "copyright", "numeral-8"] as const;
const ANCHOR_ATTRS = ["href", "target", "rel"] as const;
const SPAN_ATTRS = ["class"] as const;

const HTML_SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [...HTML_TAGS],
  allowedAttributes: {
    a: [...ANCHOR_ATTRS],
    span: [...SPAN_ATTRS],
  },
  allowedClasses: {
    span: [...SPAN_CLASSES],
  },
  allowedSchemes: ["http", "https", "mailto"],
  allowProtocolRelative: false,
  transformTags: {
    a: (_tagName, attribs) => {
      const cleanAttribs: Record<string, string> = {};
      const href = attribs.href;

      if (href && isAllowedHref(href)) {
        cleanAttribs.href = href;
      }
      if (attribs.target === "_blank") {
        cleanAttribs.target = "_blank";
        cleanAttribs.rel = "noreferrer noopener";
      }

      return {
        tagName: "a",
        attribs: cleanAttribs,
      };
    },
  },
};

const tagPattern = /<\/?\s*([a-zA-Z][\w-]*)\b([^>]*)>/g;
const attrPattern = /\s([a-zA-Z_:][\w:.-]*)\s*=\s*(["'])(.*?)\2/g;

function isAllowedHref(href: string) {
  if (href.startsWith("/") && !href.startsWith("//")) return true;
  try {
    const url = new URL(href);
    return url.protocol === "http:" || url.protocol === "https:" || url.protocol === "mailto:";
  } catch {
    return false;
  }
}

function validateHtmlAllowlist(html: string, ctx: z.RefinementCtx) {
  for (const match of html.matchAll(tagPattern)) {
    const [, tagNameRaw, attrsRaw = ""] = match;
    const tagName = tagNameRaw.toLowerCase();

    if (!HTML_TAGS.includes(tagName as (typeof HTML_TAGS)[number])) {
      ctx.addIssue({
        code: "custom",
        message: `Disallowed HTML tag <${tagName}>`,
      });
      continue;
    }

    for (const attrMatch of attrsRaw.matchAll(attrPattern)) {
      const [, attrNameRaw, , attrValue] = attrMatch;
      const attrName = attrNameRaw.toLowerCase();

      if (tagName === "a" && !ANCHOR_ATTRS.includes(attrName as (typeof ANCHOR_ATTRS)[number])) {
        ctx.addIssue({
          code: "custom",
          message: `Disallowed <a> attribute ${attrName}`,
        });
      }
      if (tagName === "span" && !SPAN_ATTRS.includes(attrName as (typeof SPAN_ATTRS)[number])) {
        ctx.addIssue({
          code: "custom",
          message: `Disallowed <span> attribute ${attrName}`,
        });
      }
      if (tagName === "a" && attrName === "href" && !isAllowedHref(attrValue)) {
        ctx.addIssue({
          code: "custom",
          message: `Disallowed link href ${JSON.stringify(attrValue)}`,
        });
      }
      if (tagName === "a" && attrName === "target" && attrValue !== "_blank") {
        ctx.addIssue({
          code: "custom",
          message: `Disallowed link target ${JSON.stringify(attrValue)}`,
        });
      }
      if (tagName === "span" && attrName === "class") {
        const classes = attrValue.split(/\s+/).filter(Boolean);
        const invalid = classes.filter(
          (className) => !SPAN_CLASSES.includes(className as (typeof SPAN_CLASSES)[number]),
        );
        if (invalid.length) {
          ctx.addIssue({
            code: "custom",
            message: `Disallowed span class ${invalid.join(", ")}`,
          });
        }
      }
    }
  }
}

const htmlString = z.string().superRefine(validateHtmlAllowlist);

const navSchema = z.object(
  Object.fromEntries(SECTION_IDS.map((id) => [id, z.string()])) as Record<
    (typeof SECTION_IDS)[number],
    z.ZodString
  >,
);

const audienceSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
});

const backgroundIconSchema = z.enum(BACKGROUND_ICON_KEYS);

const messageSchema = z
  .object({
    Meta: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
    }),
    LocaleSwitcher: z.object({
      switchToEn: z.string().min(1),
      switchToZh: z.string().min(1),
      label: z.string().min(1),
    }),
    Brand: z.object({
      name: z.string().min(1),
    }),
    Nav: navSchema,
    Cover: z.object({
      titleLine1: z.string().min(1),
      titleLine2: z.string().min(1),
    }),
    Intro: z.object({
      audiences: z.array(audienceSchema).min(1),
      texts: z.record(z.string(), htmlString),
    }),
    Values: z.object({
      lines: z.array(z.string().min(1)).min(1),
      body: z.string().min(1),
    }),
    Background: z.object({
      body: z.string().min(1),
      items: z.array(
        z.object({
          icon: backgroundIconSchema,
          company: z.string().min(1),
          role: z.string().min(1),
          time: z.string().min(1),
          location: z.string(),
          description: z.string().min(1),
        }),
      ),
    }),
    References: z.object({
      items: z.array(
        z.object({
          openingMark: z.string().min(1),
          quote: z.string().min(1),
          person: z.string().min(1),
          personHref: z.string().url().optional(),
          role: z.string().min(1),
        }),
      ),
    }),
    About: z.object({
      biography: htmlString,
      awardsHeading: z.string().min(1),
      awards: z.array(z.object({ html: htmlString })),
      pressHeading: z.string().min(1),
      press: z.array(z.object({ html: htmlString })),
      colophonHeading: z.string().min(1),
      colophonCredits: htmlString,
      colophonTypeface: htmlString,
    }),
    Contact: z.object({
      status: z.string().min(1),
      interest: z.string().min(1),
      email: z.string().email(),
      emailSubject: z.string().min(1),
      linkedinLabel: z.string().min(1),
      linkedinUrl: z.string().url(),
      portraitAlt: z.string().min(1),
    }),
  })
  .superRefine((messages, ctx) => {
    const audienceIds = messages.Intro.audiences.map((item) => item.id);
    const textIds = Object.keys(messages.Intro.texts);
    const missingTexts = audienceIds.filter((id) => !textIds.includes(id));
    const extraTexts = textIds.filter((id) => !audienceIds.includes(id));

    for (const id of missingTexts) {
      ctx.addIssue({
        code: "custom",
        path: ["Intro", "texts", id],
        message: `Missing Intro text for audience ${id}`,
      });
    }
    for (const id of extraTexts) {
      ctx.addIssue({
        code: "custom",
        path: ["Intro", "texts", id],
        message: `Intro text has no matching audience ${id}`,
      });
    }
  });

export type SiteMessages = z.infer<typeof messageSchema>;

function sanitizeTrustedHtml(html: string) {
  return sanitizeHtml(html, HTML_SANITIZE_OPTIONS);
}

function sanitizeMessages(messages: SiteMessages): SiteMessages {
  return {
    ...messages,
    Intro: {
      ...messages.Intro,
      texts: Object.fromEntries(
        Object.entries(messages.Intro.texts).map(([key, value]) => [
          key,
          sanitizeTrustedHtml(value),
        ]),
      ),
    },
    About: {
      ...messages.About,
      biography: sanitizeTrustedHtml(messages.About.biography),
      awards: messages.About.awards.map((item) => ({
        html: sanitizeTrustedHtml(item.html),
      })),
      press: messages.About.press.map((item) => ({
        html: sanitizeTrustedHtml(item.html),
      })),
      colophonCredits: sanitizeTrustedHtml(messages.About.colophonCredits),
      colophonTypeface: sanitizeTrustedHtml(messages.About.colophonTypeface),
    },
  };
}

export function parseAndSanitizeMessages(locale: string, rawMessages: unknown): SiteMessages {
  const parsed = messageSchema.safeParse(rawMessages);

  if (!parsed.success) {
    throw new Error(
      `Invalid messages for locale ${locale}:\n${z.prettifyError(parsed.error)}`,
    );
  }

  return sanitizeMessages(parsed.data);
}

export async function loadMessages(locale: Locale | string): Promise<SiteMessages> {
  const rawMessages = (await import(`../../messages/${locale}.json`)).default;
  return parseAndSanitizeMessages(locale, rawMessages);
}

export function isBackgroundIconKey(value: string): value is BackgroundIconKey {
  return BACKGROUND_ICON_KEYS.includes(value as BackgroundIconKey);
}
