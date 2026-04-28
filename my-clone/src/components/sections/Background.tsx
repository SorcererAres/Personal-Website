import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import {
  CocoonIcon,
  DropboxIcon,
  FacebookIcon,
  FigmaIcon,
  FreelanceIcon,
  SquarespaceIcon,
  ThreadIcon,
} from "@/components/icons/companies";

type BackgroundIconKey =
  | "figma"
  | "cocoon"
  | "dropbox"
  | "facebook"
  | "thread"
  | "squarespace"
  | "freelance";

interface BackgroundItem {
  icon: BackgroundIconKey;
  company: string;
  role: string;
  /** time 字段中的 "8" 想要替换成无变体字形，使用 [numeral8]8[/numeral8] 占位 */
  time: string;
  location: string;
  description: string;
}

const ICON_MAP: Record<BackgroundIconKey, () => ReactNode> = {
  figma: () => <FigmaIcon />,
  cocoon: () => <CocoonIcon />,
  dropbox: () => <DropboxIcon />,
  facebook: () => <FacebookIcon />,
  thread: () => <ThreadIcon />,
  squarespace: () => <SquarespaceIcon />,
  freelance: () => <FreelanceIcon />,
};

/** 把 time 字段里的 [numeral8]8[/numeral8] 占位换成 <span class="numeral-8">8</span>。 */
function renderTime(text: string): ReactNode {
  const parts = text.split(/\[numeral8\]([^[]*)\[\/numeral8\]/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span className="numeral-8" key={i}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/** 经历区：第一段总述 + 7 个公司履历。 */
export function Background() {
  const t = useTranslations("Background");
  const items = t.raw("items") as BackgroundItem[];

  return (
    <section className="section background">
      <div className="content">
        <div className="description">
          <p>{t("body")}</p>
        </div>

        {items.map((item, i) => (
          <div className="item" key={i}>
            <div className="logo">
              <div className="content">{ICON_MAP[item.icon]()}</div>
            </div>
            <h2 className="company">{item.company}</h2>
            <h1 className="role">{item.role}</h1>
            <p className="metadata">
              <span className="time">{renderTime(item.time)}</span>
              <span className="location">{item.location}</span>
            </p>
            <p className="description">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
