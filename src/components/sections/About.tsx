import { useTranslations } from "next-intl";

/**
 * 关于区：四个子块（biography / awards / press / colophon）。
 * legacy HTML 各 <p> 内嵌大量 <span class="title|description"> 与 <a>，
 * 内容完全由仓库内 messages.json 控制，使用 dangerouslySetInnerHTML 渲染最贴合原结构。
 */
export function About() {
  const t = useTranslations("About");
  const awards = t.raw("awards") as { html: string }[];
  const press = t.raw("press") as { html: string }[];
  const year = new Date().getFullYear();

  return (
    <section className="section about">
      <div className="content">
        <div className="biography">
          <p dangerouslySetInnerHTML={{ __html: t.raw("biography") as string }} />
        </div>

        <div className="awards">
          <h2>{t("awardsHeading")}</h2>
          {awards.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p.html }} />
          ))}
        </div>

        <div className="press">
          <h2>{t("pressHeading")}</h2>
          {press.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p.html }} />
          ))}
        </div>

        <div className="colophon">
          <h2>{t("colophonHeading")}</h2>
          <p>
            <span
              className="description"
              dangerouslySetInnerHTML={{
                __html: t.raw("colophonCredits") as string,
              }}
            />
            <br />
            <span
              className="description"
              dangerouslySetInnerHTML={{
                __html: t.raw("colophonTypeface") as string,
              }}
            />
            <br />
            <br />
            <span className="copyright">
              © <span className="year">{year}</span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
