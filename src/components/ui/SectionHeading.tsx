import { clsx } from "clsx";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: Props) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      {eyebrow && (
        <span
          className={clsx(
            "mb-3 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide",
            light
              ? "bg-white/10 text-mac-sky-200"
              : "bg-mac-sky-50 text-mac-sky-700"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={clsx(
          "text-3xl font-bold tracking-tight sm:text-4xl",
          light ? "text-white" : "text-mac-navy-800"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "mt-4 text-base leading-relaxed sm:text-lg",
            light ? "text-ice-100/90" : "text-slate-600"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
