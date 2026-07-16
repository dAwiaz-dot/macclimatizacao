import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";

export function Logo({ variant = "dark" }: { variant?: "light" | "dark" }) {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2"
      aria-label="Mac Climatização — página inicial"
    >
      <Image
        src="/images/logo/mac-climatizacao-mark.png"
        alt=""
        width={1506}
        height={409}
        priority
        className="h-10 w-auto sm:h-9"
      />
      <span
        className={clsx(
          "text-lg font-bold leading-none tracking-tight sm:text-base",
          variant === "light" ? "text-white" : "text-mac-navy-800"
        )}
      >
        Climatização
      </span>
    </Link>
  );
}
