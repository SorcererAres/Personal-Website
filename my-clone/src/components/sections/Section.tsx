import { cn } from "@/lib/utils";

// 原站每个 section 都是 12 列 grid，内容占 col 5-13（左 4 列留给 fixed nav）
export function Section({
  id,
  className,
  contentClassName,
  children,
}: {
  id: string;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "grid w-full grid-cols-12 gap-x-5 px-6 md:px-10",
        className,
      )}
    >
      <div
        className={cn(
          "col-span-12 min-w-0 md:col-start-5 md:col-end-13",
          contentClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
