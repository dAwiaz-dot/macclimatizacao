import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFaqItems } from "@/lib/faq";
import { FaqAccordion } from "./FaqAccordion";

export async function FAQ() {
  const items = await getFaqItems();

  if (items.length === 0) {
    return null;
  }

  return (
    <section id="duvidas" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="FAQ" title="Perguntas frequentes" />
        <FaqAccordion items={items} />
      </Container>
    </section>
  );
}
