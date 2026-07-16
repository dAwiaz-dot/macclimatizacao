import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Serviços de Ar-Condicionado em Alfenas",
  description:
    "Venda, instalação, manutenção preventiva e corretiva, higienização, desinstalação e infraestrutura para ar-condicionado em Alfenas e região.",
  alternates: { canonical: "/servicos" },
};

export default function ServicosPage() {
  return (
    <section className="bg-ice-gradient py-28 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Serviços"
          title="Soluções completas em climatização"
          description="Conheça os serviços da MAC Climatização para residências e empresas em Alfenas e região."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} slug={service.slug} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
