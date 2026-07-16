import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import { ServiceCard } from "./ServiceCard";

export function Services() {
  return (
    <section id="servicos" className="bg-ice-gradient py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Nossos serviços"
          title="Soluções completas em climatização"
          description="Da escolha do equipamento à manutenção contínua, cuidamos de cada etapa com atenção e profissionalismo."
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
