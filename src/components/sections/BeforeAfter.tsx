import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

export function BeforeAfter() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Antes e depois"
          title="Resultados de higienização e manutenção"
          description="Arraste o controle para comparar. As imagens reais serão adicionadas conforme os registros dos serviços forem organizados."
        />

        <div className="mx-auto mt-10 max-w-3xl">
          <BeforeAfterSlider
            beforeLabel="Antes da higienização (foto pendente)"
            afterLabel="Depois da higienização (foto pendente)"
          />
        </div>
      </Container>
    </section>
  );
}
