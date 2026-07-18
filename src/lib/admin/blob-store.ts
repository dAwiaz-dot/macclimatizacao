import { del, list, put } from "@vercel/blob";
import { isBlobConfigured } from "./env";

// Each record is stored as its OWN blob file (data/<collection>/<id>.json)
// instead of one shared JSON array. Vercel Blob is an eventually-consistent,
// CDN-backed store — a shared "read whole array, modify, overwrite" pattern
// races under rapid writes and silently loses entries. Giving each record
// its own immutable-by-default file avoids that entirely: creating a record
// only ever writes a brand-new path, never touches another record's file.

export async function listJson<T>(prefix: string): Promise<T[]> {
  if (!isBlobConfigured) return [];

  try {
    const { blobs } = await list({ prefix });
    const items = await Promise.all(
      blobs.map(async (blob) => {
        try {
          // No explicit cache option: static/ISR pages need this fetch to
          // follow the page's own revalidate setting (Next.js throws if a
          // "no-store" fetch runs inside a statically-rendered route), while
          // dynamic admin pages already default to no-store on their own.
          // Freshness after a mutation comes from revalidatePath, not this.
          const res = await fetch(blob.url);
          if (!res.ok) return null;
          return (await res.json()) as T;
        } catch {
          return null;
        }
      })
    );
    return items.filter((item): item is Awaited<T> => item !== null);
  } catch (err) {
    console.error(`Erro ao listar ${prefix} do Blob:`, err);
    return [];
  }
}

export async function readJson<T>(pathname: string): Promise<T | null> {
  if (!isBlobConfigured) return null;

  try {
    const { blobs } = await list({ prefix: pathname, limit: 1 });
    const blob = blobs.find((b) => b.pathname === pathname);
    if (!blob) return null;

    const res = await fetch(blob.url);
    if (!res.ok) return null;

    return (await res.json()) as T;
  } catch (err) {
    console.error(`Erro ao ler ${pathname} do Blob:`, err);
    return null;
  }
}

export async function writeJson(pathname: string, data: unknown): Promise<void> {
  await put(pathname, JSON.stringify(data, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}

export async function deleteJson(pathname: string): Promise<void> {
  try {
    await del(pathname);
  } catch (err) {
    console.error(`Erro ao remover ${pathname} do Blob:`, err);
  }
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
