import { createClient } from "@/lib/supabase/server";

const BUCKET = "site-uploads";

function sanitizeFileName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9.\-_]/g, "-")
    .toLowerCase();
}

/**
 * Envia uma imagem para o bucket público do Supabase Storage e retorna a
 * URL pública do arquivo.
 */
export async function uploadImage(file: File, folder: "products" | "portfolio") {
  if (!file || file.size === 0) {
    throw new Error("Nenhum arquivo de imagem foi enviado.");
  }

  const supabase = createClient();
  const fileName = `${folder}/${Date.now()}-${sanitizeFileName(file.name)}`;

  const { error } = await supabase.storage.from(BUCKET).upload(fileName, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    throw new Error(`Falha ao enviar imagem: ${error.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(fileName);

  return { publicUrl, path: fileName };
}

export async function deleteImageByPublicUrl(publicUrl: string) {
  const supabase = createClient();
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const index = publicUrl.indexOf(marker);
  if (index === -1) return;

  const path = publicUrl.slice(index + marker.length);
  await supabase.storage.from(BUCKET).remove([path]);
}
