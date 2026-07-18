import { randomUUID } from "crypto";
import { deleteJson, listJson, readJson, writeJson } from "@/lib/admin/blob-store";

export type Product = {
  id: string;
  name: string;
  category: string;
  image_url: string;
  created_at: string;
};

const PRODUCTS_PREFIX = "data/products/";
const productPath = (id: string) => `${PRODUCTS_PREFIX}${id}.json`;

export async function getProducts(): Promise<Product[]> {
  const products = await listJson<Product>(PRODUCTS_PREFIX);
  return products.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getProductById(id: string): Promise<Product | null> {
  return readJson<Product>(productPath(id));
}

export async function getProductCategories(): Promise<string[]> {
  const products = await getProducts();
  return Array.from(new Set(products.map((product) => product.category))).sort();
}

export async function createProduct(input: {
  name: string;
  category: string;
  image_url: string;
}): Promise<void> {
  const product: Product = {
    id: randomUUID(),
    name: input.name,
    category: input.category,
    image_url: input.image_url,
    created_at: new Date().toISOString(),
  };
  await writeJson(productPath(product.id), product);
}

export async function updateProduct(
  id: string,
  input: { name: string; category: string; image_url: string }
): Promise<void> {
  const existing = await getProductById(id);
  await writeJson(productPath(id), {
    id,
    name: input.name,
    category: input.category,
    image_url: input.image_url,
    created_at: existing?.created_at ?? new Date().toISOString(),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteJson(productPath(id));
}
