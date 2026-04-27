import { readFileSync } from "node:fs";
import path from "node:path";

import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { BillyLegacyScripts } from "@/components/legacy/BillyLegacyScripts";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { routing } from "@/i18n/routing";

const BODY_CLASS = readFileSync(
  path.join(process.cwd(), "src/legacy/billy.body.class.txt"),
  "utf8",
).trim();

const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title,
    description,
    icons: {
      icon: "/billy-legacy/assets/app/favicon-32x32.png",
    },
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: "/billy-legacy/assets/app/sharing-image-2400x2400.png" }],
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      images: ["/billy-legacy/assets/app/sharing-image-2400x2400.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const htmlLang = locale === "zh" ? "zh-Hans" : "en";

  return (
    <html lang={htmlLang} className="h-full">
      <head>
        <link
          rel="stylesheet"
          href="/billy-legacy/styles/normalize-8.0.1.css"
        />
        <link rel="stylesheet" href="/billy-legacy/styles/reset.css" />
        <link rel="stylesheet" href="/billy-legacy/styles/font.css" />
        <link rel="stylesheet" href="/billy-legacy/styles/variables.css" />
        <link rel="stylesheet" href="/billy-legacy/styles/color.css" />
        <link rel="stylesheet" href="/billy-legacy/styles/style.css" />
        <link rel="stylesheet" href="/billy-legacy/styles/grid.css" />
        <link rel="stylesheet" href="/billy-legacy/styles/media-queries.css" />
      </head>
      <body className={BODY_CLASS}>
        <NextIntlClientProvider>
          <LocaleSwitcher />
          {children}
        </NextIntlClientProvider>
        <BillyLegacyScripts />
      </body>
    </html>
  );
}
