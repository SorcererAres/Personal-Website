import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";

import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { About } from "@/components/sections/About";
import { Background } from "@/components/sections/Background";
import { Contact } from "@/components/sections/Contact";
import { Cover } from "@/components/sections/Cover";
import { Intro } from "@/components/sections/Intro";
import { References } from "@/components/sections/References";
import { Values } from "@/components/sections/Values";
import { Work } from "@/components/sections/Work";
import { AppShell } from "@/components/system/AppShell";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <AppShell cover={<Cover />} localeSwitcher={<LocaleSwitcher />}>
      <Intro />
      <Work />
      <Values />
      <Background />
      <References />
      <About />
      <Contact />
    </AppShell>
  );
}
