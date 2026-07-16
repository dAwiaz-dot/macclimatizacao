import { randomUUID } from "crypto";
import { readJson, writeJson } from "@/lib/admin/blob-store";

export type PortfolioItem = {
  id: string;
  title: string;
  description: string | null;
  service_date: string | null;
  image_url: string;
  created_at: string;
};

const PORTFOLIO_PATH = "data/portfolio.json";

async function readPortfolioItems(): Promise<PortfolioItem[]> {
  return readJson<PortfolioItem[]>(PORTFOLIO_PATH, []);
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const items = await readPortfolioItems();
  return [...items].sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getPortfolioItemById(id: string): Promise<PortfolioItem | null> {
  const items = await readPortfolioItems();
  return items.find((item) => item.id === id) ?? null;
}

export async function createPortfolioItem(input: {
  title: string;
  description: string | null;
  service_date: string | null;
  image_url: string;
}): Promise<void> {
  const items = await readPortfolioItems();
  items.push({
    id: randomUUID(),
    title: input.title,
    description: input.description,
    service_date: input.service_date,
    image_url: input.image_url,
    created_at: new Date().toISOString(),
  });
  await writeJson(PORTFOLIO_PATH, items);
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
  const items = await readPortfolioItems();
  const next = items.map((item) =>
    item.id === id
      ? {
          ...item,
          title: input.title,
          description: input.description,
          service_date: input.service_date,
          image_url: input.image_url,
        }
      : item
  );
  await writeJson(PORTFOLIO_PATH, next);
}

export async function deletePortfolioItem(id: string): Promise<void> {
  const items = await readPortfolioItems();
  await writeJson(
    PORTFOLIO_PATH,
    items.filter((item) => item.id !== id)
  );
}
