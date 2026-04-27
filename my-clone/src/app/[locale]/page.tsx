import { readFileSync } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";

import { BillySweeneyLegacyRoot } from "@/components/legacy/BillySweeneyLegacyRoot";
import { routing } from "@/i18n/routing";

const contentFile: Record<(typeof routing.locales)[number], string> = {
  zh: "billy.content.zh.html",
  en: "billy.content.en.html",
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const file = contentFile[locale as (typeof routing.locales)[number]];
  const html = readFileSync(
    path.join(process.cwd(), "src/legacy", file),
    "utf8",
  );

  return <BillySweeneyLegacyRoot html={html} />;
}
