import { getContent, defaultHeader, defaultBranding } from "@/lib/site-content";
import { HeaderClient } from "./HeaderClient";

export async function Header() {
  const [header, branding] = await Promise.all([
    getContent("header", defaultHeader),
    getContent("branding", defaultBranding),
  ]);

  return <HeaderClient ctaLabel={header.ctaLabel} logoSrc={branding.logo_url} />;
}
