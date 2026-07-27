import { getContent, defaultFinalCta } from "@/lib/site-content";
import { FinalCTAClient } from "./FinalCTAClient";

export async function FinalCTA() {
  const content = await getContent("finalCta", defaultFinalCta);
  return <FinalCTAClient content={content} />;
}
