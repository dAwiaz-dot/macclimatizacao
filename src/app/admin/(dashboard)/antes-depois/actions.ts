"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteImage, uploadImage } from "@/lib/admin/blob-store";
import {
  createBeforeAfterItem,
  deleteBeforeAfterItem,
  updateBeforeAfterItem,
} from "@/lib/before-after";

export type BeforeAfterFormState = {
  error?: string;
};

const UPLOAD_ERROR =
  "Não foi possível enviar a imagem. Verifique se o armazenamento está configurado (veja o README) e tente novamente.";

export async function createBeforeAfterItemAction(
  _prevState: BeforeAfterFormState,
  formData: FormData
): Promise<BeforeAfterFormState> {
  const title = String(formData.get("title") ?? "").trim();
  const beforeImage = formData.get("beforeImage") as File | null;
  const afterImage = formData.get("afterImage") as File | null;

  if (!title) {
    return { error: "Informe um título para o par de fotos." };
  }
  if (!beforeImage || beforeImage.size === 0) {
    return { error: "Selecione a foto do antes." };
  }
  if (!afterImage || afterImage.size === 0) {
    return { error: "Selecione a foto do depois." };
  }

  let beforeImageUrl: string;
  let afterImageUrl: string;
  try {
    [beforeImageUrl, afterImageUrl] = await Promise.all([
      uploadImage(beforeImage, "content"),
      uploadImage(afterImage, "content"),
    ]);
  } catch (err) {
    console.error("Erro ao enviar fotos de antes e depois:", err);
    return { error: UPLOAD_ERROR };
  }

  await createBeforeAfterItem({
    title,
    before_image_url: beforeImageUrl,
    after_image_url: afterImageUrl,
  });

  revalidatePath("/");
  revalidatePath("/admin/antes-depois");
  redirect("/admin/antes-depois");
}

export async function updateBeforeAfterItemAction(
  id: string,
  _prevState: BeforeAfterFormState,
  formData: FormData
): Promise<BeforeAfterFormState> {
  const title = String(formData.get("title") ?? "").trim();
  const beforeImage = formData.get("beforeImage") as File | null;
  const afterImage = formData.get("afterImage") as File | null;
  const previousBeforeImageUrl = String(formData.get("previousBeforeImageUrl") ?? "");
  const previousAfterImageUrl = String(formData.get("previousAfterImageUrl") ?? "");

  if (!title) {
    return { error: "Informe um título para o par de fotos." };
  }

  let beforeImageUrl = previousBeforeImageUrl;
  let afterImageUrl = previousAfterImageUrl;

  try {
    if (beforeImage && beforeImage.size > 0) {
      beforeImageUrl = await uploadImage(beforeImage, "content");
      if (previousBeforeImageUrl) await deleteImage(previousBeforeImageUrl);
    }
    if (afterImage && afterImage.size > 0) {
      afterImageUrl = await uploadImage(afterImage, "content");
      if (previousAfterImageUrl) await deleteImage(previousAfterImageUrl);
    }
  } catch (err) {
    console.error("Erro ao enviar fotos de antes e depois:", err);
    return { error: UPLOAD_ERROR };
  }

  await updateBeforeAfterItem(id, {
    title,
    before_image_url: beforeImageUrl,
    after_image_url: afterImageUrl,
  });

  revalidatePath("/");
  revalidatePath("/admin/antes-depois");
  redirect("/admin/antes-depois");
}

export async function deleteBeforeAfterItemAction(
  id: string,
  beforeImageUrl: string,
  afterImageUrl: string
) {
  await deleteBeforeAfterItem(id);
  await Promise.all([deleteImage(beforeImageUrl), deleteImage(afterImageUrl)]);

  revalidatePath("/");
  revalidatePath("/admin/antes-depois");
}
