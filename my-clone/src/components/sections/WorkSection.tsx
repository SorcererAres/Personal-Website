import { cn } from "@/lib/utils";

export function WorkSection({ className }: { className?: string }) {
  return (
    <section
      id="work"
      className={cn(
        "relative w-full overflow-hidden pt-[1040px] md:pt-[3200px]",
        className,
      )}
    >
      {/* 用 SVG 做蒙版，把整张拼贴图按原站形状裁剪 */}
      <figure
        className="mx-auto"
        style={{
          width: "100%",
          aspectRatio: "1440 / 2960",
          WebkitMaskImage:
            "url(/images/work/Billy-Sweeney-work-collage-shape.svg)",
          maskImage: "url(/images/work/Billy-Sweeney-work-collage-shape.svg)",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          backgroundImage:
            "image-set(url(/images/work/Billy-Sweeney-work-collage-1440.jpg) 1x, url(/images/work/Billy-Sweeney-work-collage-2880.jpg) 2x)",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </section>
  );
}
