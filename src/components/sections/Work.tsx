import { useTranslations } from "next-intl";

interface WorkItem {
  number: string;
  category: string;
  title: string;
  description: string;
  meta: string;
  previewExtension: string;
  previewLabel: string;
  /** 预览图基路径（不含 `-<宽度>.jpg`）；缺省时回退到纯 CSS 占位窗口。 */
  previewImage?: string;
  tags: string[];
  href: string;
}

/** 预览图导出的两档宽度，与 public/images/work/ 中的文件名对应。 */
const PREVIEW_WIDTHS = [1440, 2400] as const;

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
                  {item.previewImage ? (
                    // eslint-disable-next-line @next/next/no-img-element -- legacy CSS 依赖 figure 内的扁平结构，next/image 的包裹层会破坏定位
                    <img
                      className="preview-image"
                      src={`${item.previewImage}-${PREVIEW_WIDTHS[0]}.jpg`}
                      srcSet={PREVIEW_WIDTHS.map(
                        (w) => `${item.previewImage}-${w}.jpg ${w}w`,
                      ).join(", ")}
                      sizes="(max-width: 900px) 92vw, 40vw"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className="preview-window" />
                  )}
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
