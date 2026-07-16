import type { Metadata } from "next";
import { MessageCircle, Phone, Instagram, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { company } from "@/data/company";
import { buildWhatsAppUrl, defaultWhatsAppMessage, whatsAppUrlDefault } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Mac Climatização pelo WhatsApp (35) 98827-3068 e solicite seu orçamento de ar-condicionado em Alfenas e região.",
  alternates: { canonical: "/contato" },
};

const contactChannels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: company.whatsappDisplay,
    href: whatsAppUrlDefault(),
    external: true,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp (2ª linha)",
    value: company.whatsappDisplaySecondary,
    href: buildWhatsAppUrl(defaultWhatsAppMessage, company.whatsappNumberSecondary),
    external: true,
  },
  {
    icon: Phone,
    label: "Telefone",
    value: company.phoneDisplay,
    href: `tel:+${company.whatsappNumber}`,
    external: false,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: company.instagramHandle,
    href: company.instagramUrl,
    external: true,
  },
  {
    icon: MapPin,
    label: "Endereço",
    value: `${company.address.street} – ${company.address.neighborhood}, ${company.address.city}/${company.address.state}`,
    href: company.googleMapsUrl,
    external: true,
  },
];

export default function ContatoPage() {
  return (
    <div className="pt-16">
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Contato"
            title="Fale com a Mac Climatização"
            description="Escolha o canal mais conveniente para você."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contactChannels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                className="flex flex-col items-center gap-3 rounded-2xl border border-mac-navy-100 p-6 text-center transition-colors hover:border-mac-sky-400"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mac-sky-50 text-mac-sky-600">
                  <channel.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {channel.label}
                </span>
                <span className="text-sm font-medium text-mac-navy-800">
                  {channel.value}
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <QuoteForm />
      <ServiceArea />
    </div>
  );
}
