import { randomUUID } from "crypto";
import { readJson, writeJson } from "@/lib/admin/blob-store";

export type Product = {
  id: string;
  name: string;
  category: string;
  image_url: string;
  created_at: string;
};

const PRODUCTS_PATH = "data/products.json";

async function readProducts(): Promise<Product[]> {
  return readJson<Product[]>(PRODUCTS_PATH, []);
}

export async function getProducts(): Promise<Product[]> {
  const products = await readProducts();
  return [...products].sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await readProducts();
  return products.find((product) => product.id === id) ?? null;
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
  const products = await readProducts();
  products.push({
    id: randomUUID(),
    name: input.name,
    category: input.category,
    image_url: input.image_url,
    created_at: new Date().toISOString(),
  });
  await writeJson(PRODUCTS_PATH, products);
}

export async function updateProduct(
  id: string,
  input: { name: string; category: string; image_url: string }
): Promise<void> {
  const products = await readProducts();
  const next = products.map((product) =>
    product.id === id
      ? {
          ...product,
          name: input.name,
          category: input.category,
          image_url: input.image_url,
        }
      : product
  );
  await writeJson(PRODUCTS_PATH, next);
}

export async function deleteProduct(id: string): Promise<void> {
  const products = await readProducts();
  await writeJson(
    PRODUCTS_PATH,
    products.filter((product) => product.id !== id)
  );
}
