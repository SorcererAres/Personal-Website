import { useTranslations } from "next-intl";

/** 价值观区：4 条标题 + 一段描述。 */
export function Values() {
  const t = useTranslations("Values");
  const lines = t.raw("lines") as string[];

  return (
    <section className="section values">
      <div className="content">
        <div className="title">
          {lines.map((line, i) => (
            <h1 key={i}>{line}</h1>
          ))}
        </div>
        <div className="description">
          <p>{t("body")}</p>
        </div>
      </div>
    </section>
  );
}
