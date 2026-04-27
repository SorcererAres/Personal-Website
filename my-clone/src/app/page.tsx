import { readFileSync } from "node:fs";
import path from "node:path";

import { BillySweeneyLegacyRoot } from "@/components/legacy/BillySweeneyLegacyRoot";

export default function Home() {
  const html = readFileSync(
    path.join(process.cwd(), "src/legacy/billy.content.html"),
    "utf8",
  );

  return <BillySweeneyLegacyRoot html={html} />;
}
