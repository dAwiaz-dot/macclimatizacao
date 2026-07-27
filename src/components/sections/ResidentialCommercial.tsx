import { Home, Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { whatsAppUrlForService } from "@/lib/whatsapp";
import { getContent, defaultResidentialCommercial } from "@/lib/site-content";

export async function ResidentialCommercial() {
  const content = await getContent(
    "residentialCommercial",
    defaultResidentialCommercial
  );

  return (
    <section className="bg-mac-navy-800 py-20 sm:py-24">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mac-sky-500/20 text-mac-sky-300">
              <Home className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-2xl font-bold text-white">
              {content.residential.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ice-100/80">
              {content.residential.description}
            </p>
            <Button
              href={whatsAppUrlForService("atendimento residencial")}
              external
              variant="outlineLight"
              size="md"
              className="mt-6"
            >
              {content.residential.ctaLabel}
            </Button>
          </div>

          <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mac-sky-500/20 text-mac-sky-300">
              <Building2 className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-2xl font-bold text-white">
              {content.commercial.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ice-100/80">
              {content.commercial.description}
            </p>
            <Button
              href={whatsAppUrlForService("atendimento comercial")}
              external
              variant="outlineLight"
              size="md"
              className="mt-6"
            >
              {content.commercial.ctaLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
