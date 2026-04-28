import { useTranslations } from "next-intl";

interface ReferenceItem {
  quote: string;
  /** 中文使用 「，英文使用 " */
  openingMark: string;
  person: string;
  personHref?: string;
  role: string;
}

/** 推荐区：6 条引语 + 推荐人姓名/链接/角色。 */
export function References() {
  const t = useTranslations("References");
  const items = t.raw("items") as ReferenceItem[];

  return (
    <section className="section references">
      <div className="content">
        {items.map((item, i) => (
          <div className="item" key={i}>
            <h2 className="quote">
              <span className="opening-quote-mark">{item.openingMark}</span>
              {item.quote}
            </h2>
            <p>
              <span className="person">
                {item.personHref ? (
                  <a href={item.personHref} target="_blank" rel="noreferrer noopener">
                    {item.person}
                  </a>
                ) : (
                  item.person
                )}
              </span>
              <span className="role">{item.role}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
