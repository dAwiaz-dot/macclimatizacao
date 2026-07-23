import { randomUUID } from "crypto";
import { deleteJson, listJson, readJson, writeJson } from "@/lib/admin/blob-store";

export type Category = {
  id: string;
  name: string;
  created_at: string;
};

const CATEGORIES_PREFIX = "data/categories/";
const categoryPath = (id: string) => `${CATEGORIES_PREFIX}${id}.json`;

export async function getCategories(): Promise<Category[]> {
  const categories = await listJson<Category>(CATEGORIES_PREFIX);
  return categories.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}

export async function createCategory(name: string): Promise<void> {
  const category: Category = {
    id: randomUUID(),
    name,
    created_at: new Date().toISOString(),
  };
  await writeJson(categoryPath(category.id), category);
}

export async function deleteCategory(id: string): Promise<void> {
  await deleteJson(categoryPath(id));
}
