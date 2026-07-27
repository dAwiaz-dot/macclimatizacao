import { mkdir, readdir, readFile, rm, writeFile } from "fs/promises";
import path from "path";

// Armazenamento em disco local (funciona em qualquer host com filesystem
// persistente, como um Volume do Railway) — substitui o antigo Vercel Blob.
// Cada registro continua sendo o seu próprio arquivo (mesmo esquema de
// caminhos de antes: data/<coleção>/<id>.json), só que gravado direto no
// disco em vez de subir para um serviço externo.
//
// DATA_ROOT deve apontar para um diretório persistente entre deploys. No
// Railway, crie um Volume e defina DATA_ROOT com o caminho de montagem dele
// (ex.: /data). Sem essa variável, os dados ficam em ./.data dentro do
// projeto — ótimo para rodar localmente, mas não sobrevive a um redeploy
// num host com filesystem efêmero.
const DATA_ROOT = process.env.DATA_ROOT || path.join(process.cwd(), ".data");
const JSON_DIR = path.join(DATA_ROOT, "data");
const UPLOADS_DIR = path.join(DATA_ROOT, "uploads");

function jsonFilePath(pathname: string): string {
  // pathname vem no formato "data/<coleção>/<id>.json" — removemos o
  // prefixo "data/" pois já é a raiz de JSON_DIR.
  const relative = pathname.startsWith("data/") ? pathname.slice(5) : pathname;
  return path.join(JSON_DIR, relative);
}

async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function listJson<T>(prefix: string): Promise<T[]> {
  const dirPath = jsonFilePath(prefix);

  let entries: string[];
  try {
    entries = await readdir(dirPath);
  } catch {
    return [];
  }

  const items = await Promise.all(
    entries
      .filter((name) => name.endsWith(".json"))
      .map((name) => readJsonFile<T>(path.join(dirPath, name)))
  );

  return items.filter((item): item is Awaited<T> => item !== null);
}

export async function readJson<T>(pathname: string): Promise<T | null> {
  return readJsonFile<T>(jsonFilePath(pathname));
}

export async function writeJson(pathname: string, data: unknown): Promise<void> {
  const filePath = jsonFilePath(pathname);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function deleteJson(pathname: string): Promise<void> {
  try {
    await rm(jsonFilePath(pathname));
  } catch (err) {
    console.error(`Erro ao remover ${pathname} do disco:`, err);
  }
}

function uploadUrlToFilePath(url: string): string {
  // uploadImage sempre retorna um caminho raiz-relativo "/uploads/...".
  const relative = url.replace(/^\/?uploads\//, "");
  return path.join(UPLOADS_DIR, relative);
}

export async function uploadImage(
  file: File,
  folder: "products" | "portfolio" | "content" | "services"
): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const filename = `${Date.now()}-${safeName}`;
  const filePath = path.join(UPLOADS_DIR, folder, filename);

  await mkdir(path.dirname(filePath), { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  return `/uploads/${folder}/${filename}`;
}

export async function deleteImage(url: string): Promise<void> {
  try {
    await rm(uploadUrlToFilePath(url));
  } catch (err) {
    console.error("Erro ao remover imagem do disco:", err);
  }
}
