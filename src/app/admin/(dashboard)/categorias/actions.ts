"use server";

import { revalidatePath } from "next/cache";
import { createCategory, deleteCategory } from "@/lib/categories";

export type CategoryFormState = {
  error?: string;
};

export async function createCategoryAction(
  _prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  const name = String(formData.get("name") ?? "").trim();

  if (!name) {
    return { error: "Digite o nome da categoria." };
  }

  await createCategory(name);

  revalidatePath("/admin/categorias");
  revalidatePath("/admin/produtos");
  return {};
}

export async function deleteCategoryAction(id: string) {
  await deleteCategory(id);

  revalidatePath("/admin/categorias");
  revalidatePath("/admin/produtos");
}
