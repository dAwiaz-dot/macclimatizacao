"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createFaqItem, deleteFaqItem, updateFaqItem } from "@/lib/faq";

export type FaqFormState = {
  error?: string;
};

export async function createFaqAction(
  _prevState: FaqFormState,
  formData: FormData
): Promise<FaqFormState> {
  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();

  if (!question || !answer) {
    return { error: "Preencha a pergunta e a resposta." };
  }

  await createFaqItem({ question, answer });

  revalidatePath("/");
  revalidatePath("/admin/faq");
  redirect("/admin/faq");
}

export async function updateFaqAction(
  id: string,
  _prevState: FaqFormState,
  formData: FormData
): Promise<FaqFormState> {
  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();

  if (!question || !answer) {
    return { error: "Preencha a pergunta e a resposta." };
  }

  await updateFaqItem(id, { question, answer });

  revalidatePath("/");
  revalidatePath("/admin/faq");
  redirect("/admin/faq");
}

export async function deleteFaqAction(id: string) {
  await deleteFaqItem(id);

  revalidatePath("/");
  revalidatePath("/admin/faq");
}
