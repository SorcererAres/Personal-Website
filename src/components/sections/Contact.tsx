import Image from "next/image";
import { useTranslations } from "next-intl";

/** 联系区：状态指示灯 + 标语 + 邮件/LinkedIn 入口 + 肖像照。 */
export function Contact() {
  const t = useTranslations("Contact");

  return (
    <section className="section contact">
      <div className="content">
        <div className="text">
          <div className="content">
            <div className="look">
              <div className="radius" />
              <div className="dot" />
            </div>

            <div className="status">
              <h3>{t("status")}</h3>
            </div>

            <div className="interest">
              <h2>{t("interest")}</h2>
            </div>
          </div>

          <div className="actions">
            <div className="item">
              <a href={`mailto:${t("email")}?subject=${encodeURIComponent(t("emailSubject"))}`}>
                {t("email")}
              </a>
            </div>
            <div className="item">
              <a href={t("linkedinUrl")} target="_blank" rel="noreferrer noopener">
                {t("linkedinLabel")}
              </a>
            </div>
          </div>
        </div>

        <div className="image">
          <figure>
            <Image
              src="/images/zhang-liangpeng-1600.png"
              alt={t("portraitAlt")}
              width={1600}
              height={1600}
              sizes="(max-width: 768px) 90vw, 480px"
            />
            <div className="image-overlay-01" />
            <div className="image-overlay-02" />
          </figure>
        </div>
      </div>
    </section>
  );
}
