import { randomUUID } from "crypto";
import { deleteJson, listJson, readJson, writeJson } from "@/lib/admin/blob-store";

export type Testimonial = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
};

const TESTIMONIALS_PREFIX = "data/testimonials/";
const testimonialPath = (id: string) => `${TESTIMONIALS_PREFIX}${id}.json`;

export async function getTestimonials(): Promise<Testimonial[]> {
  const testimonials = await listJson<Testimonial>(TESTIMONIALS_PREFIX);
  return testimonials.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  return readJson<Testimonial>(testimonialPath(id));
}

export async function createTestimonial(input: {
  name: string;
  rating: number;
  comment: string;
}): Promise<void> {
  const testimonial: Testimonial = {
    id: randomUUID(),
    name: input.name,
    rating: input.rating,
    comment: input.comment,
    created_at: new Date().toISOString(),
  };
  await writeJson(testimonialPath(testimonial.id), testimonial);
}

export async function updateTestimonial(
  id: string,
  input: { name: string; rating: number; comment: string }
): Promise<void> {
  const existing = await getTestimonialById(id);
  await writeJson(testimonialPath(id), {
    id,
    name: input.name,
    rating: input.rating,
    comment: input.comment,
    created_at: existing?.created_at ?? new Date().toISOString(),
  });
}

export async function deleteTestimonial(id: string): Promise<void> {
  await deleteJson(testimonialPath(id));
}
