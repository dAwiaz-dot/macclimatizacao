import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-lg font-bold tracking-tight"
      aria-label="Mac Climatização — página inicial"
    >
      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl">
        <Image
          src="/images/logo/mac-climatizacao-logo.jpg"
          alt="Logotipo Mac Climatização"
          fill
          sizes="40px"
          className="object-cover"
          priority
        />
      </span>
      <span className={clsx(light ? "text-white" : "text-mac-navy-800")}>
        Mac <span className="font-normal">Climatização</span>
      </span>
    </Link>
  );
}
