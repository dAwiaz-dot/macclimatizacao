"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { deleteImageByPublicUrl, uploadImage } from "@/lib/supabase/storage";

export type PortfolioFormState = {
  error?: string;
};

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
    const uploaded = await uploadImage(image, "portfolio");
    imageUrl = uploaded.publicUrl;
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Falha ao enviar a imagem." };
  }

  const supabase = createClient();
  const { error } = await supabase.from("portfolio_items").insert({
    title,
    description: description || null,
    service_date: serviceDate || null,
    image_url: imageUrl,
  });

  if (error) {
    return { error: `Não foi possível salvar o item: ${error.message}` };
  }

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

  const supabase = createClient();
  let imageUrl = previousImageUrl;

  if (image && image.size > 0) {
    try {
      const uploaded = await uploadImage(image, "portfolio");
      imageUrl = uploaded.publicUrl;
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Falha ao enviar a imagem." };
    }
    if (previousImageUrl) {
      await deleteImageByPublicUrl(previousImageUrl);
    }
  }

  const { error } = await supabase
    .from("portfolio_items")
    .update({
      title,
      description: description || null,
      service_date: serviceDate || null,
      image_url: imageUrl,
    })
    .eq("id", id);

  if (error) {
    return { error: `Não foi possível atualizar o item: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/admin/portfolio");
  redirect("/admin/portfolio");
}

export async function deletePortfolioItemAction(id: string, imageUrl: string) {
  const supabase = createClient();
  const { error } = await supabase.from("portfolio_items").delete().eq("id", id);

  if (!error) {
    await deleteImageByPublicUrl(imageUrl);
  }

  revalidatePath("/");
  revalidatePath("/admin/portfolio");
}
