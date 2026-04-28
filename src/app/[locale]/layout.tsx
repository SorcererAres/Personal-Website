import type { Metadata } from "next";
import { DM_Sans, Noto_Sans_SC } from "next/font/google";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Providers } from "@/components/system/Providers";
import { routing } from "@/i18n/routing";

import "@/styles/legacy/index.css";

/**
 * 西文优先：DM Sans：Latin；缺字（如汉字）回退到 Noto Sans SC。均为 SIL OFL。
 * --font-site-sans、--font-noto-sc 由 src/styles/legacy/variables.css 组成 --font--family。
 */
const siteSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: "500",
  variable: "--font-site-sans",
  display: "swap",
});

/** Noto Sans SC 的 next 元数据子集不含汉字，但 Google 返回的 CSS 仍含 CJK 分片，构建时会全部拉取。 */
const notoSansSC = Noto_Sans_SC({
  subsets: ["latin", "latin-ext"],
  weight: "500",
  variable: "--font-noto-sc",
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
    <html lang={htmlLang} className={`${siteSans.variable} ${notoSansSC.variable} h-full`}>
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
