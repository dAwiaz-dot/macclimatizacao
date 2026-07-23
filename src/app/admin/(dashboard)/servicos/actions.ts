"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "@/lib/admin/blob-store";
import { getServiceBySlug, updateServiceContent } from "@/lib/services-content";

export type ServiceFormState = {
  error?: string;
};

const linesToList = (value: FormDataEntryValue | null) =>
  String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export async function updateServiceAction(
  slug: string,
  _prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const shortDescription = String(formData.get("shortDescription") ?? "").trim();
  const whatsappContext = String(formData.get("whatsappContext") ?? "").trim();
  const description = linesToList(formData.get("description"));
  const highlights = linesToList(formData.get("highlights"));
  const image = formData.get("image") as File | null;

  if (!name || !shortDescription || description.length === 0) {
    return { error: "Preencha ao menos o nome, o resumo e a descrição." };
  }

  const current = await getServiceBySlug(slug);
  let imageUrl = current?.image_url;

  if (image && image.size > 0) {
    try {
      imageUrl = await uploadImage(image, "services");
    } catch (err) {
      console.error("Erro ao enviar imagem do serviço:", err);
      return { error: "Não foi possível enviar a imagem. Tente novamente." };
    }
  }

  await updateServiceContent(slug, {
    name,
    shortDescription,
    description,
    highlights,
    whatsappContext,
    ...(imageUrl ? { image_url: imageUrl } : {}),
  });

  revalidatePath("/");
  revalidatePath("/servicos");
  revalidatePath(`/servicos/${slug}`);
  revalidatePath("/admin/servicos");
  redirect("/admin/servicos");
}
