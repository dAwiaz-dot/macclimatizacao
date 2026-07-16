import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center"
      aria-label="Mac Climatização — página inicial"
    >
      <Image
        src="/images/logo/mac-climatizacao-logo-full.png"
        alt="Mac Climatização"
        width={1536}
        height={590}
        priority
        className="h-14 w-auto sm:h-11"
      />
    </Link>
  );
}
