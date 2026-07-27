import Image from "next/image";
import Link from "next/link";

const defaultSrc = "/images/logo/mac-climatizacao-logo-full.png";

export function Logo({ src, alt }: { src?: string; alt?: string }) {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center"
      aria-label="Mac Climatização — página inicial"
    >
      <Image
        src={src || defaultSrc}
        alt={alt || "Mac Climatização"}
        width={1536}
        height={590}
        priority
        className="h-16 w-auto sm:h-14"
      />
    </Link>
  );
}
