import { readFile } from "node:fs/promises";
import path from "node:path";

import { formatThemeClass, SECTION_IDS, THEME_MAX, THEME_MIN } from "../src/lib/site-contracts";

const root = process.cwd();

function fail(message: string): never {
  throw new Error(message);
}

async function assertSectionClasses() {
  for (const id of SECTION_IDS) {
    const file = path.join(
      root,
      "src",
      "components",
      "sections",
      `${id[0].toUpperCase()}${id.slice(1)}.tsx`,
    );
    const source = await readFile(file, "utf8");
    const expected = `className="section ${id}"`;

    if (!source.includes(expected)) {
      fail(`${file} must contain ${expected}`);
    }
  }
}

async function assertNavMessages() {
  for (const locale of ["zh", "en"]) {
    const file = path.join(root, "messages", `${locale}.json`);
    const messages = JSON.parse(await readFile(file, "utf8")) as {
      Nav?: Record<string, unknown>;
    };

    for (const id of SECTION_IDS) {
      if (typeof messages.Nav?.[id] !== "string") {
        fail(`${file} is missing Nav.${id}`);
      }
    }
  }
}

async function assertThemeClasses() {
  const file = path.join(root, "src", "styles", "legacy", "color.css");
  const source = await readFile(file, "utf8");

  for (let index = THEME_MIN; index <= THEME_MAX; index += 1) {
    const selector = `body.${formatThemeClass(index)}`;
    if (!source.includes(selector)) {
      fail(`${file} is missing ${selector}`);
    }
  }
}

async function main() {
  await assertSectionClasses();
  await assertNavMessages();
  await assertThemeClasses();

  console.log("Validated section, nav, and theme contracts.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
