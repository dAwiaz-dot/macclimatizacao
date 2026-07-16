import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPortfolioItems } from "@/lib/portfolio";
import { GalleryGrid } from "./GalleryGrid";

export async function Gallery() {
  const items = await getPortfolioItems();

  return (
    <section id="trabalhos" className="bg-ice-gradient py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Trabalhos realizados"
          title="Serviços entregues com cuidado e atenção"
          description="Uma amostra dos nossos atendimentos em Alfenas e região."
        />

        <div className="mt-12">
          {items.length === 0 ? (
            <p className="text-center text-sm text-slate-500">
              Em breve, fotos dos nossos trabalhos realizados aparecerão aqui.
            </p>
          ) : (
            <GalleryGrid items={items} />
          )}
        </div>
      </Container>
    </section>
  );
}
