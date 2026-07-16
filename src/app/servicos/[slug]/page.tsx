import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { getServiceBySlug, services } from "@/data/services";
import { company } from "@/data/company";
import { whatsAppUrlForService } from "@/lib/whatsapp";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  return {
    title: `${service.name} em Alfenas e Região`,
    description: `${service.shortDescription} Atendimento da MAC Climatização em ${company.city} e região.`,
    alternates: { canonical: `/servicos/${service.slug}` },
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const Icon = service.icon;

  return (
    <article className="bg-white py-28 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mac-sky-50 text-mac-sky-600">
            <Icon className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-mac-navy-800 sm:text-4xl">
            {service.name}
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            {service.shortDescription}
          </p>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
            {service.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-6 space-y-2">
            {service.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-center gap-2 text-sm font-medium text-mac-navy-700"
              >
                <CheckCircle2
                  className="h-4 w-4 shrink-0 text-mac-sky-500"
                  aria-hidden="true"
                />
                {highlight}
              </li>
            ))}
          </ul>

          <Button
            href={whatsAppUrlForService(service.whatsappContext)}
            external
            size="lg"
            className="mt-8"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Solicitar orçamento para {service.name.toLowerCase()}
          </Button>
        </div>

        <PlaceholderImage
          label={`Foto real de ${service.name.toLowerCase()} — MAC Climatização`}
          className="aspect-[4/3] w-full rounded-3xl"
        />
      </Container>
    </article>
  );
}
