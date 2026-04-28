import { useTranslations } from "next-intl";

/** 姓名+职业首屏（由 ThemeProvider 的 coverVisible / body.cover--is--visible 控制；刷新为完整时序，换语言仅重播约 1750ms）。 */
export function Cover() {
  const t = useTranslations("Cover");
  return (
    <section className="section cover">
      <div className="content">
        <h1>
          {t("titleLine1")}
          <br />
          {t("titleLine2")}
        </h1>
      </div>
    </section>
  );
}
