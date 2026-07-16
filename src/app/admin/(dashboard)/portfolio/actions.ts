"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteImage, uploadImage } from "@/lib/admin/blob-store";
import {
  createPortfolioItem,
  deletePortfolioItem,
  updatePortfolioItem,
} from "@/lib/portfolio";

export type PortfolioFormState = {
  error?: string;
};

const UPLOAD_ERROR =
  "Não foi possível enviar a imagem. Verifique se o armazenamento está configurado (veja o README) e tente novamente.";

export async function createPortfolioItemAction(
  _prevState: PortfolioFormState,
  formData: FormData
): Promise<PortfolioFormState> {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const serviceDate = String(formData.get("service_date") ?? "").trim();
  const image = formData.get("image") as File | null;

  if (!title) {
    return { error: "Informe um título para o trabalho realizado." };
  }
  if (!image || image.size === 0) {
    return { error: "Selecione uma foto do trabalho realizado." };
  }

  let imageUrl: string;
  try {
    imageUrl = await uploadImage(image, "portfolio");
  } catch (err) {
    console.error("Erro ao enviar imagem do trabalho realizado:", err);
    return { error: UPLOAD_ERROR };
  }

  await createPortfolioItem({
    title,
    description: description || null,
    service_date: serviceDate || null,
    image_url: imageUrl,
  });

  revalidatePath("/");
  revalidatePath("/admin/portfolio");
  redirect("/admin/portfolio");
}

export async function updatePortfolioItemAction(
  id: string,
  _prevState: PortfolioFormState,
  formData: FormData
): Promise<PortfolioFormState> {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const serviceDate = String(formData.get("service_date") ?? "").trim();
  const image = formData.get("image") as File | null;
  const previousImageUrl = String(formData.get("previousImageUrl") ?? "");

  if (!title) {
    return { error: "Informe um título para o trabalho realizado." };
  }

  let imageUrl = previousImageUrl;

  if (image && image.size > 0) {
    try {
      imageUrl = await uploadImage(image, "portfolio");
    } catch (err) {
      console.error("Erro ao enviar imagem do trabalho realizado:", err);
      return { error: UPLOAD_ERROR };
    }
    if (previousImageUrl) {
      await deleteImage(previousImageUrl);
    }
  }

  await updatePortfolioItem(id, {
    title,
    description: description || null,
    service_date: serviceDate || null,
    image_url: imageUrl,
  });

  revalidatePath("/");
  revalidatePath("/admin/portfolio");
  redirect("/admin/portfolio");
}

export async function deletePortfolioItemAction(id: string, imageUrl: string) {
  await deletePortfolioItem(id);
  await deleteImage(imageUrl);

  revalidatePath("/");
  revalidatePath("/admin/portfolio");
}
