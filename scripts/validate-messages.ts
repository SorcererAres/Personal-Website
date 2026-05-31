import { readFile } from "node:fs/promises";
import path from "node:path";

import { parseAndSanitizeMessages } from "../src/i18n/messages";

const root = process.cwd();
const locales = ["zh", "en"] as const;

async function main() {
  for (const locale of locales) {
    const file = path.join(root, "messages", `${locale}.json`);
    const raw = JSON.parse(await readFile(file, "utf8"));
    parseAndSanitizeMessages(locale, raw);
  }

  console.log(`Validated messages for ${locales.join(", ")}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
