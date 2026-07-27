import { readFile, stat } from "fs/promises";
import path from "path";
import { NextResponse, type NextRequest } from "next/server";

// Serve os arquivos gravados por uploadImage() em src/lib/admin/blob-store.ts.
// Existe porque o storage local grava fora da pasta public/ (em DATA_ROOT),
// para funcionar com um Volume do Railway sem depender de onde o build do
// Next.js coloca os assets estáticos.
const DATA_ROOT = process.env.DATA_ROOT || path.join(process.cwd(), ".data");
const UPLOADS_DIR = path.join(DATA_ROOT, "uploads");

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const segments = params.path;

  // Bloqueia tentativas de escapar do diretório de uploads (ex.: "../../").
  if (segments.some((segment) => segment.includes("..") || segment.includes("\0"))) {
    return NextResponse.json({ error: "Caminho inválido" }, { status: 400 });
  }

  const filePath = path.join(UPLOADS_DIR, ...segments);

  try {
    await stat(filePath);
    const buffer = await readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = CONTENT_TYPES[ext] ?? "application/octet-stream";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 404 });
  }
}
