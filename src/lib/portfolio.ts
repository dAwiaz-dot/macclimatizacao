import { randomUUID } from "crypto";
import { deleteJson, listJson, readJson, writeJson } from "@/lib/admin/blob-store";

export type PortfolioItem = {
  id: string;
  title: string;
  description: string | null;
  service_date: string | null;
  image_url: string;
  created_at: string;
};

const PORTFOLIO_PREFIX = "data/portfolio/";
const portfolioPath = (id: string) => `${PORTFOLIO_PREFIX}${id}.json`;

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const items = await listJson<PortfolioItem>(PORTFOLIO_PREFIX);
  return items.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getPortfolioItemById(id: string): Promise<PortfolioItem | null> {
  return readJson<PortfolioItem>(portfolioPath(id));
}

export async function createPortfolioItem(input: {
  title: string;
  description: string | null;
  service_date: string | null;
  image_url: string;
}): Promise<void> {
  const item: PortfolioItem = {
    id: randomUUID(),
    title: input.title,
    description: input.description,
    service_date: input.service_date,
    image_url: input.image_url,
    created_at: new Date().toISOString(),
  };
  await writeJson(portfolioPath(item.id), item);
}

export async function updatePortfolioItem(
  id: string,
  input: {
    title: string;
    description: string | null;
    service_date: string | null;
    image_url: string;
  }
): Promise<void> {
  const existing = await getPortfolioItemById(id);
  await writeJson(portfolioPath(id), {
    id,
    title: input.title,
    description: input.description,
    service_date: input.service_date,
    image_url: input.image_url,
    created_at: existing?.created_at ?? new Date().toISOString(),
  });
}

export async function deletePortfolioItem(id: string): Promise<void> {
  await deleteJson(portfolioPath(id));
}
