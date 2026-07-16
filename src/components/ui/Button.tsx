import { clsx } from "clsx";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mac-sky-500 disabled:opacity-60 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-mac-sky-500 text-white shadow-lg shadow-mac-sky-500/30 hover:bg-mac-sky-600 hover:shadow-xl hover:-translate-y-0.5",
  secondary:
    "bg-white text-mac-navy-800 border border-mac-navy-100 hover:border-mac-sky-400 hover:text-mac-sky-600 hover:-translate-y-0.5",
  outlineLight:
    "border border-white/40 text-white hover:bg-white/10 hover:-translate-y-0.5",
  navy: "bg-mac-navy-800 text-white hover:bg-mac-navy-700 hover:-translate-y-0.5",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-base sm:text-lg",
};

type CommonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

type LinkButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    external?: boolean;
  };

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    ...rest
  } = props;

  const classes = clsx(baseStyles, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, external, children, ...anchorRest } =
      rest as AnchorHTMLAttributes<HTMLAnchorElement> & { external?: boolean };

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...anchorRest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href as string} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} />
  );
}
