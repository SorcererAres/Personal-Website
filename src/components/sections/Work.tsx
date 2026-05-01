import { useTranslations } from "next-intl";

interface WorkItem {
  number: string;
  category: string;
  title: string;
  description: string;
  meta: string;
  previewExtension: string;
  previewLabel: string;
  tags: string[];
  href: string;
}

/** 作品区：参考 Web Works 展示形式，以站内视觉系统重写。 */
export function Work() {
  const t = useTranslations("Work");
  const items = t.raw("items") as WorkItem[];

  return (
    <section className="section work">
      <div className="content">
        <div className="heading">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1>{t("title")}</h1>
          <p className="note">{t("note")}</p>
        </div>

        <div className="projects">
          {items.map((item) => (
            <article className="project" key={item.number}>
              <div className="project-tabs" aria-hidden="true">
                <span className="project-tab">
                  {t("projectLabel")} {item.number}
                </span>
              </div>

              <div className="project-panel">
                <div className="project-text">
                  <p className="meta">{item.meta}</p>
                  <h2>{item.title}</h2>
                  <p className="description">{item.description}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer noopener">
                      {t("ctaLabel")}
                    </a>
                  ) : null}
                  <div className="tags" aria-label={item.category}>
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <figure className="project-preview" aria-label={item.previewLabel} role="img">
                  <span className="file-label">
                    <span className="file-extension">{item.previewExtension}</span>
                    {item.previewLabel}
                  </span>
                  <span className="preview-window" />
                  <span className="handle top-left" />
                  <span className="handle top-right" />
                  <span className="handle bottom-left" />
                  <span className="handle bottom-right" />
                </figure>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
