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

        <div className="mt-12">
          <ProductsGrid products={products} />
        </div>
      </Container>
    </section>
  );
}
