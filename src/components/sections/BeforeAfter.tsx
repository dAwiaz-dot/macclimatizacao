import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { getContent, defaultBeforeAfterHeader } from "@/lib/site-content";
import { getBeforeAfterItems } from "@/lib/before-after";

export async function BeforeAfter() {
  const [header, items] = await Promise.all([
    getContent("beforeAfterHeader", defaultBeforeAfterHeader),
    getBeforeAfterItems(),
  ]);

  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={header.eyebrow}
          title={header.title}
          description={header.description}
        />

        {items.length === 0 ? (
          <div className="mx-auto mt-10 max-w-3xl">
            <BeforeAfterSlider
              beforeLabel="Antes da higienização (foto pendente)"
              afterLabel="Depois da higienização (foto pendente)"
            />
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-3xl space-y-10">
            {items.map((item) => (
              <div key={item.id}>
                <h3 className="mb-3 text-center text-sm font-semibold text-mac-navy-800">
                  {item.title}
                </h3>
                <BeforeAfterSlider
                  beforeLabel={`${item.title} — antes`}
                  afterLabel={`${item.title} — depois`}
                  beforeImageUrl={item.before_image_url}
                  afterImageUrl={item.after_image_url}
                />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
