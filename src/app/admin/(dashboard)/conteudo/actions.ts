"use server";

import { revalidatePath } from "next/cache";
import { uploadImage } from "@/lib/admin/blob-store";
import {
  getContent,
  updateContent,
  defaultHero,
  defaultAbout,
} from "@/lib/site-content";

export type ContentFormState = {
  error?: string;
  success?: boolean;
};

const linesToList = (value: FormDataEntryValue | null) =>
  String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export async function updateHeroAction(
  _prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const badge = String(formData.get("badge") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const calloutText = String(formData.get("calloutText") ?? "").trim();
  const differentials = linesToList(formData.get("differentials"));
  const image = formData.get("image") as File | null;

  if (!title || !subtitle) {
    return { error: "Preencha ao menos o título e o subtítulo." };
  }

  const current = await getContent("hero", defaultHero);
  let imageUrl = current.image_url;

  if (image && image.size > 0) {
    try {
      imageUrl = await uploadImage(image, "content");
    } catch (err) {
      console.error("Erro ao enviar imagem do início:", err);
      return { error: "Não foi possível enviar a imagem. Tente novamente." };
    }
  }

  await updateContent("hero", {
    badge,
    title,
    subtitle,
    calloutText,
    differentials,
    image_url: imageUrl,
  });

  revalidatePath("/");
  revalidatePath("/admin/conteudo");
  return { success: true };
}

export async function updateAboutAction(
  _prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const badge = String(formData.get("badge") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const values = linesToList(formData.get("values"));
  const image = formData.get("image") as File | null;

  if (!title || !description) {
    return { error: "Preencha ao menos o título e a descrição." };
  }

  const current = await getContent("about", defaultAbout);
  let imageUrl = current.image_url;

  if (image && image.size > 0) {
    try {
      imageUrl = await uploadImage(image, "content");
    } catch (err) {
      console.error("Erro ao enviar imagem do sobre:", err);
      return { error: "Não foi possível enviar a imagem. Tente novamente." };
    }
  }

  await updateContent("about", {
    badge,
    title,
    description,
    values,
    image_url: imageUrl,
  });

  revalidatePath("/");
  revalidatePath("/admin/conteudo");
  return { success: true };
}
