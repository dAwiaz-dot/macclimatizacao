import { del, list, put } from "@vercel/blob";
import { isBlobConfigured } from "./env";

export async function readJson<T>(pathname: string, fallback: T): Promise<T> {
  if (!isBlobConfigured) return fallback;

  try {
    const { blobs } = await list({ prefix: pathname, limit: 1 });
    const blob = blobs.find((b) => b.pathname === pathname);
    if (!blob) return fallback;

    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok) return fallback;

    return (await res.json()) as T;
  } catch (err) {
    console.error(`Erro ao ler ${pathname} do Blob:`, err);
    return fallback;
  }
}

export async function writeJson(pathname: string, data: unknown): Promise<void> {
  await put(pathname, JSON.stringify(data, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function uploadImage(
  file: File,
  folder: "products" | "portfolio"
): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const pathname = `${folder}/${Date.now()}-${safeName}`;

  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return blob.url;
}

export async function deleteImage(url: string): Promise<void> {
  try {
    await del(url);
  } catch (err) {
    console.error("Erro ao remover imagem do Blob:", err);
  }
}
