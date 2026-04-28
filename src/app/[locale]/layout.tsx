import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Providers } from "@/components/system/Providers";
import { routing } from "@/i18n/routing";

import "@/styles/legacy/index.css";

/**
 * DM Sans Medium（500）— 与 Roobert 同类的几何无衬线，SIL OFL。
 * 暴露 --font-site-sans，由 src/styles/legacy/variables.css 的 --font--family 消费。
 */
const siteSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: "500",
  variable: "--font-site-sans",
  display: "swap",
});

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
      icon: "/seo/favicon-32x32.png",
    },
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: "/seo/sharing-image-2400x2400.png" }],
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      images: ["/seo/sharing-image-2400x2400.png"],
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

  const messages = await getMessages();
  const htmlLang = locale === "zh" ? "zh-Hans" : "en";

  return (
    <html lang={htmlLang} className={`${siteSans.variable} h-full`}>
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
