"use server";

import { revalidatePath } from "next/cache";
import { uploadImage } from "@/lib/admin/blob-store";
import {
  getContent,
  updateContent,
  defaultHero,
  defaultAbout,
  defaultBranding,
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

export async function updateTrustBarAction(
  _prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const items = linesToList(formData.get("items"));

  if (items.length === 0) {
    return { error: "Informe ao menos um item." };
  }

  await updateContent("trustBar", { items });

  revalidatePath("/");
  revalidatePath("/admin/conteudo");
  return { success: true };
}

export async function updateWhyChooseUsAction(
  _prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const eyebrow = String(formData.get("eyebrow") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const reasons = linesToList(formData.get("reasons"));

  if (!title || reasons.length === 0) {
    return { error: "Preencha o título e ao menos um diferencial." };
  }

  await updateContent("whyChooseUs", { eyebrow, title, reasons });

  revalidatePath("/");
  revalidatePath("/admin/conteudo");
  return { success: true };
}

export async function updateMaintenanceBenefitsAction(
  _prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const eyebrow = String(formData.get("eyebrow") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const benefits = linesToList(formData.get("benefits"));

  if (!title || benefits.length === 0) {
    return { error: "Preencha o título e ao menos um benefício." };
  }

  await updateContent("maintenanceBenefits", {
    eyebrow,
    title,
    description,
    benefits,
  });

  revalidatePath("/");
  revalidatePath("/admin/conteudo");
  return { success: true };
}

export async function updateProcessTimelineAction(
  _prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const eyebrow = String(formData.get("eyebrow") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const steps = linesToList(formData.get("steps"));
  const ctaLabel = String(formData.get("ctaLabel") ?? "").trim();

  if (!title || steps.length === 0) {
    return { error: "Preencha o título e ao menos uma etapa." };
  }

  await updateContent("processTimeline", {
    eyebrow,
    title,
    description,
    steps,
    ctaLabel,
  });

  revalidatePath("/");
  revalidatePath("/admin/conteudo");
  return { success: true };
}

export async function updateResidentialCommercialAction(
  _prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const residentialTitle = String(formData.get("residentialTitle") ?? "").trim();
  const residentialDescription = String(
    formData.get("residentialDescription") ?? ""
  ).trim();
  const residentialCtaLabel = String(
    formData.get("residentialCtaLabel") ?? ""
  ).trim();
  const commercialTitle = String(formData.get("commercialTitle") ?? "").trim();
  const commercialDescription = String(
    formData.get("commercialDescription") ?? ""
  ).trim();
  const commercialCtaLabel = String(
    formData.get("commercialCtaLabel") ?? ""
  ).trim();

  if (!residentialTitle || !commercialTitle) {
    return { error: "Preencha ao menos os títulos das duas colunas." };
  }

  await updateContent("residentialCommercial", {
    residential: {
      title: residentialTitle,
      description: residentialDescription,
      ctaLabel: residentialCtaLabel,
    },
    commercial: {
      title: commercialTitle,
      description: commercialDescription,
      ctaLabel: commercialCtaLabel,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/conteudo");
  return { success: true };
}

export async function updateFinalCtaAction(
  _prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const title = String(formData.get("title") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const ctaLabel = String(formData.get("ctaLabel") ?? "").trim();

  if (!title) {
    return { error: "Preencha ao menos o título." };
  }

  await updateContent("finalCta", { title, subtitle, ctaLabel });

  revalidatePath("/");
  revalidatePath("/admin/conteudo");
  return { success: true };
}

export async function updateQuickDiagnosisHeaderAction(
  _prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const eyebrow = String(formData.get("eyebrow") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title) {
    return { error: "Preencha ao menos o título." };
  }

  await updateContent("quickDiagnosisHeader", { eyebrow, title, description });

  revalidatePath("/");
  revalidatePath("/admin/conteudo");
  return { success: true };
}

export async function updateBeforeAfterHeaderAction(
  _prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const eyebrow = String(formData.get("eyebrow") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title) {
    return { error: "Preencha ao menos o título." };
  }

  await updateContent("beforeAfterHeader", { eyebrow, title, description });

  revalidatePath("/");
  revalidatePath("/admin/conteudo");
  return { success: true };
}

export async function updateServiceAreaAction(
  _prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const eyebrow = String(formData.get("eyebrow") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const citiesServed = linesToList(formData.get("citiesServed"));

  if (!title || citiesServed.length === 0) {
    return { error: "Preencha o título e ao menos uma cidade atendida." };
  }

  await updateContent("serviceArea", { eyebrow, title, citiesServed });

  revalidatePath("/");
  revalidatePath("/contato");
  revalidatePath("/admin/conteudo");
  return { success: true };
}

export async function updateFooterAction(
  _prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const description = String(formData.get("description") ?? "").trim();

  if (!description) {
    return { error: "Preencha a descrição do rodapé." };
  }

  await updateContent("footer", { description });

  revalidatePath("/", "layout");
  revalidatePath("/admin/conteudo");
  return { success: true };
}

export async function updateHeaderAction(
  _prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const ctaLabel = String(formData.get("ctaLabel") ?? "").trim();

  if (!ctaLabel) {
    return { error: "Preencha o texto do botão." };
  }

  await updateContent("header", { ctaLabel });

  revalidatePath("/", "layout");
  revalidatePath("/admin/conteudo");
  return { success: true };
}

export async function updateBrandingAction(
  _prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const image = formData.get("image") as File | null;

  const current = await getContent("branding", defaultBranding);
  let logoUrl = current.logo_url;

  if (image && image.size > 0) {
    try {
      logoUrl = await uploadImage(image, "content");
    } catch (err) {
      console.error("Erro ao enviar a logo:", err);
      return { error: "Não foi possível enviar a imagem. Tente novamente." };
    }
  }

  await updateContent("branding", { logo_url: logoUrl });

  revalidatePath("/", "layout");
  revalidatePath("/admin/conteudo");
  return { success: true };
}

export async function updateContactPageAction(
  _prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const eyebrow = String(formData.get("eyebrow") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title) {
    return { error: "Preencha ao menos o título." };
  }

  await updateContent("contactPage", { eyebrow, title, description });

  revalidatePath("/contato");
  revalidatePath("/admin/conteudo");
  return { success: true };
}
