/** 作品拼贴大图（视觉资源由 style.css 的 mask-image / background-image 注入）。 */
export function Work() {
  return (
    <section className="section work">
      <div className="content">
        <div className="hero-image">
          <figure>
            <div className="image" />
            <div className="image-overlay-01" />
            <div className="image-overlay-02" />
          </figure>
        </div>
      </div>
    </section>
  );
}
