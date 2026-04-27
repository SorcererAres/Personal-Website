import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";

import { BillyLegacyScripts } from "@/components/legacy/BillyLegacyScripts";

const SITE_TITLE = "Billy Sweeney — Designer";
const SITE_DESC =
  "Hello there, I’m a designer who cares about making beautiful things that help people.";

const BODY_CLASS = readFileSync(
  path.join(process.cwd(), "src/legacy/billy.body.class.txt"),
  "utf8",
).trim();

export const metadata: Metadata = {
  metadataBase: new URL("https://billysweeney.com"),
  title: SITE_TITLE,
  description: SITE_DESC,
  icons: {
    icon: "/billy-legacy/assets/app/favicon-32x32.png",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    type: "website",
    images: [{ url: "/billy-legacy/assets/app/sharing-image-2400x2400.png" }],
  },
  twitter: {
    title: SITE_TITLE,
    description: SITE_DESC,
    card: "summary_large_image",
    images: ["/billy-legacy/assets/app/sharing-image-2400x2400.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
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
        {children}
        <BillyLegacyScripts />
      </body>
    </html>
  );
}
