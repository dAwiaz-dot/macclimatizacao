import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProducts } from "@/lib/products";
import { ProductsGrid } from "./ProductsGrid";

export async function Products() {
  const products = await getProducts();

  if (products.length === 0) {
    return null;
  }

  return (
    <section id="produtos" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Produtos"
          title="Equipamentos disponíveis"
          description="Conheça alguns dos equipamentos que trabalhamos. Fale com a gente para saber a disponibilidade e o melhor equipamento para o seu ambiente."
        />

        <div className="relative mx-auto mt-8 max-w-2xl">
          <div className="relative rounded-2xl border border-mac-sky-100 bg-mac-sky-50 px-5 py-4 text-center text-sm leading-relaxed text-mac-navy-700">
            <MessageCircle
              className="mx-auto mb-2 h-5 w-5 text-mac-sky-500"
              aria-hidden="true"
            />
            A disponibilidade dos equipamentos e produtos está sujeita à
            confirmação de estoque no momento da solicitação. Consulte nossa
            equipe para verificar a disponibilidade e o prazo de entrega.
            <span
              aria-hidden="true"
              className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-mac-sky-100 bg-mac-sky-50"
            />
          </div>
        </div>

        <div className="mt-12">
          <ProductsGrid products={products} />
        </div>
      </Container>
    </section>
  );
}
