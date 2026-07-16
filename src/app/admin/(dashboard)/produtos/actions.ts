"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { deleteImageByPublicUrl, uploadImage } from "@/lib/supabase/storage";

export type ProductFormState = {
  error?: string;
};

export async function createProductAction(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const image = formData.get("image") as File | null;

  if (!name || !category) {
    return { error: "Preencha o nome e a categoria do produto." };
  }
  if (!image || image.size === 0) {
    return { error: "Selecione uma imagem para o produto." };
  }

  let imageUrl: string;
  try {
    const uploaded = await uploadImage(image, "products");
    imageUrl = uploaded.publicUrl;
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Falha ao enviar a imagem." };
  }

  const supabase = createClient();
  const { error } = await supabase
    .from("products")
    .insert({ name, category, image_url: imageUrl });

  if (error) {
    return { error: `Não foi possível salvar o produto: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/admin/produtos");
  redirect("/admin/produtos");
}

export async function updateProductAction(
  id: string,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const image = formData.get("image") as File | null;
  const previousImageUrl = String(formData.get("previousImageUrl") ?? "");

  if (!name || !category) {
    return { error: "Preencha o nome e a categoria do produto." };
  }

  const supabase = createClient();
  let imageUrl = previousImageUrl;

  if (image && image.size > 0) {
    try {
      const uploaded = await uploadImage(image, "products");
      imageUrl = uploaded.publicUrl;
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Falha ao enviar a imagem." };
    }
    if (previousImageUrl) {
      await deleteImageByPublicUrl(previousImageUrl);
    }
  }

  const { error } = await supabase
    .from("products")
    .update({ name, category, image_url: imageUrl })
    .eq("id", id);

  if (error) {
    return { error: `Não foi possível atualizar o produto: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/admin/produtos");
  redirect("/admin/produtos");
}

export async function deleteProductAction(id: string, imageUrl: string) {
  const supabase = createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (!error) {
    await deleteImageByPublicUrl(imageUrl);
  }

  revalidatePath("/");
  revalidatePath("/admin/produtos");
}
