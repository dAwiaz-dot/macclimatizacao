import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { whatsAppUrlDefault } from "@/lib/whatsapp";
import { getContent, defaultProcessTimeline } from "@/lib/site-content";

export async function ProcessTimeline() {
  const content = await getContent("processTimeline", defaultProcessTimeline);

  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <ol className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.steps.map((step, index) => (
            <li
              key={step}
              className="relative flex gap-4 rounded-2xl border border-mac-navy-100 bg-ice-50 p-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mac-sky-500 text-sm font-bold text-white">
                {index + 1}
              </span>
              <p className="text-sm font-medium text-mac-navy-800">{step}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex justify-center">
          <Button href={whatsAppUrlDefault()} external size="lg">
            {content.ctaLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
