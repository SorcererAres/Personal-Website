/** 整页跳转或 RSC 尚未就绪时的轻量占位（样式：billy-legacy `.locale-route-loading`）。 */
export default function LocaleRouteLoading() {
  return (
    <div
      className="locale-route-loading"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading</span>
      <div className="locale-route-loading__dot" aria-hidden />
    </div>
  );
}
