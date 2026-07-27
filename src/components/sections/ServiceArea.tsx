import { getContent, defaultServiceArea } from "@/lib/site-content";
import { ServiceAreaClient } from "./ServiceAreaClient";

export async function ServiceArea() {
  const content = await getContent("serviceArea", defaultServiceArea);
  return <ServiceAreaClient content={content} />;
}
