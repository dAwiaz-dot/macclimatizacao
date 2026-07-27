import { randomUUID } from "crypto";
import { deleteJson, listJson, readJson, writeJson } from "@/lib/admin/blob-store";

export type BeforeAfterItem = {
  id: string;
  title: string;
  before_image_url: string;
  after_image_url: string;
  created_at: string;
};

const BEFORE_AFTER_PREFIX = "data/before-after/";
const beforeAfterPath = (id: string) => `${BEFORE_AFTER_PREFIX}${id}.json`;

export async function getBeforeAfterItems(): Promise<BeforeAfterItem[]> {
  const items = await listJson<BeforeAfterItem>(BEFORE_AFTER_PREFIX);
  return items.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getBeforeAfterItemById(
  id: string
): Promise<BeforeAfterItem | null> {
  return readJson<BeforeAfterItem>(beforeAfterPath(id));
}

export async function createBeforeAfterItem(input: {
  title: string;
  before_image_url: string;
  after_image_url: string;
}): Promise<void> {
  const item: BeforeAfterItem = {
    id: randomUUID(),
    title: input.title,
    before_image_url: input.before_image_url,
    after_image_url: input.after_image_url,
    created_at: new Date().toISOString(),
  };
  await writeJson(beforeAfterPath(item.id), item);
}

export async function updateBeforeAfterItem(
  id: string,
  input: { title: string; before_image_url: string; after_image_url: string }
): Promise<void> {
  const existing = await getBeforeAfterItemById(id);
  await writeJson(beforeAfterPath(id), {
    id,
    title: input.title,
    before_image_url: input.before_image_url,
    after_image_url: input.after_image_url,
    created_at: existing?.created_at ?? new Date().toISOString(),
  });
}

export async function deleteBeforeAfterItem(id: string): Promise<void> {
  await deleteJson(beforeAfterPath(id));
}
