"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createDiagnosisOption,
  deleteDiagnosisOption,
  updateDiagnosisOption,
} from "@/lib/diagnosis";

export type DiagnosisFormState = {
  error?: string;
};

function parseInput(formData: FormData) {
  const label = String(formData.get("label") ?? "").trim();
  const whatsappMessage = String(formData.get("whatsappMessage") ?? "").trim();
  return { label, whatsappMessage };
}

export async function createDiagnosisOptionAction(
  _prevState: DiagnosisFormState,
  formData: FormData
): Promise<DiagnosisFormState> {
  const { label, whatsappMessage } = parseInput(formData);

  if (!label || !whatsappMessage) {
    return { error: "Preencha o texto do botão e a mensagem do WhatsApp." };
  }

  await createDiagnosisOption({ label, whatsappMessage });

  revalidatePath("/");
  revalidatePath("/admin/diagnostico");
  redirect("/admin/diagnostico");
}

export async function updateDiagnosisOptionAction(
  id: string,
  _prevState: DiagnosisFormState,
  formData: FormData
): Promise<DiagnosisFormState> {
  const { label, whatsappMessage } = parseInput(formData);

  if (!label || !whatsappMessage) {
    return { error: "Preencha o texto do botão e a mensagem do WhatsApp." };
  }

  await updateDiagnosisOption(id, { label, whatsappMessage });

  revalidatePath("/");
  revalidatePath("/admin/diagnostico");
  redirect("/admin/diagnostico");
}

export async function deleteDiagnosisOptionAction(id: string) {
  await deleteDiagnosisOption(id);

  revalidatePath("/");
  revalidatePath("/admin/diagnostico");
}
