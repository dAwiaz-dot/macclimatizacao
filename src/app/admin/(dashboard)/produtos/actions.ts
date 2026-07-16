"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteImage, uploadImage } from "@/lib/admin/blob-store";
import { createProduct, deleteProduct, updateProduct } from "@/lib/products";

export type ProductFormState = {
  error?: string;
};

const UPLOAD_ERROR =
  "Não foi possível enviar a imagem. Verifique se o armazenamento está configurado (veja o README) e tente novamente.";

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
    imageUrl = await uploadImage(image, "products");
  } catch (err) {
    console.error("Erro ao enviar imagem do produto:", err);
    return { error: UPLOAD_ERROR };
  }

  await createProduct({ name, category, image_url: imageUrl });

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

  let imageUrl = previousImageUrl;

  if (image && image.size > 0) {
    try {
      imageUrl = await uploadImage(image, "products");
    } catch (err) {
      console.error("Erro ao enviar imagem do produto:", err);
      return { error: UPLOAD_ERROR };
    }
    if (previousImageUrl) {
      await deleteImage(previousImageUrl);
    }
  }

  await updateProduct(id, { name, category, image_url: imageUrl });

  revalidatePath("/");
  revalidatePath("/admin/produtos");
  redirect("/admin/produtos");
}

export async function deleteProductAction(id: string, imageUrl: string) {
  await deleteProduct(id);
  await deleteImage(imageUrl);

  revalidatePath("/");
  revalidatePath("/admin/produtos");
}
