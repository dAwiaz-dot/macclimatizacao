import { getContent, defaultHeader } from "@/lib/site-content";
import { MobileCTAClient } from "./MobileCTAClient";

export async function MobileCTA() {
  const header = await getContent("header", defaultHeader);
  return <MobileCTAClient ctaLabel={header.ctaLabel} />;
}
