import { getContent, defaultHero } from "@/lib/site-content";
import { HeroClient } from "./HeroClient";

export async function Hero() {
  const content = await getContent("hero", defaultHero);
  return <HeroClient content={content} />;
}
