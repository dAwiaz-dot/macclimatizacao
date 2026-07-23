import { readJson, writeJson } from "@/lib/admin/blob-store";
import { services as baseServices, type Service } from "@/data/services";

type ServiceOverride = {
  name: string;
  shortDescription: string;
  description: string[];
  highlights: string[];
  whatsappContext: string;
  image_url?: string;
};

const servicePath = (slug: string) => `data/services/${slug}.json`;

export async function getServices(): Promise<Service[]> {
  return Promise.all(
    baseServices.map(async (service) => {
      const override = await readJson<ServiceOverride>(servicePath(service.slug));
      return override ? { ...service, ...override } : service;
    })
  );
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const service = baseServices.find((s) => s.slug === slug);
  if (!service) return null;

  const override = await readJson<ServiceOverride>(servicePath(slug));
  return override ? { ...service, ...override } : service;
}

export async function updateServiceContent(
  slug: string,
  input: ServiceOverride
): Promise<void> {
  await writeJson(servicePath(slug), input);
}
