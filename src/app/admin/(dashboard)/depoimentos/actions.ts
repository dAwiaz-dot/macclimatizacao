"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
} from "@/lib/testimonials";

export type TestimonialFormState = {
  error?: string;
};

function parseInput(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const comment = String(formData.get("comment") ?? "").trim();
  const rating = Number(formData.get("rating") ?? 5);
  return { name, comment, rating };
}

export async function createTestimonialAction(
  _prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  const { name, comment, rating } = parseInput(formData);

  if (!name || !comment) {
    return { error: "Preencha o nome e o comentário." };
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { error: "A avaliação deve ser de 1 a 5." };
  }

  await createTestimonial({ name, comment, rating });

  revalidatePath("/");
  revalidatePath("/admin/depoimentos");
  redirect("/admin/depoimentos");
}

export async function updateTestimonialAction(
  id: string,
  _prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  const { name, comment, rating } = parseInput(formData);

  if (!name || !comment) {
    return { error: "Preencha o nome e o comentário." };
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { error: "A avaliação deve ser de 1 a 5." };
  }

  await updateTestimonial(id, { name, comment, rating });

  revalidatePath("/");
  revalidatePath("/admin/depoimentos");
  redirect("/admin/depoimentos");
}

export async function deleteTestimonialAction(id: string) {
  await deleteTestimonial(id);

  revalidatePath("/");
  revalidatePath("/admin/depoimentos");
}
