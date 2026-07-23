import { randomUUID } from "crypto";
import { deleteJson, listJson, readJson, writeJson } from "@/lib/admin/blob-store";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  created_at: string;
};

const FAQ_PREFIX = "data/faq/";
const faqPath = (id: string) => `${FAQ_PREFIX}${id}.json`;

export async function getFaqItems(): Promise<FaqItem[]> {
  const items = await listJson<FaqItem>(FAQ_PREFIX);
  return items.sort((a, b) => a.created_at.localeCompare(b.created_at));
}

export async function getFaqItemById(id: string): Promise<FaqItem | null> {
  return readJson<FaqItem>(faqPath(id));
}

export async function createFaqItem(input: {
  question: string;
  answer: string;
}): Promise<void> {
  const item: FaqItem = {
    id: randomUUID(),
    question: input.question,
    answer: input.answer,
    created_at: new Date().toISOString(),
  };
  await writeJson(faqPath(item.id), item);
}

export async function updateFaqItem(
  id: string,
  input: { question: string; answer: string }
): Promise<void> {
  const existing = await getFaqItemById(id);
  await writeJson(faqPath(id), {
    id,
    question: input.question,
    answer: input.answer,
    created_at: existing?.created_at ?? new Date().toISOString(),
  });
}

export async function deleteFaqItem(id: string): Promise<void> {
  await deleteJson(faqPath(id));
}
