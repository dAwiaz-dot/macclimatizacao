import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { testimonials } from "@/data/testimonials";
import { company } from "@/data/company";

export function Testimonials() {
  return (
    <section id="avaliacoes" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Avaliações de clientes"
          title="O que dizem sobre a MAC Climatização"
        />

        <div className="mt-12">
          {testimonials.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="rounded-2xl border border-mac-navy-100 bg-ice-50 p-6"
                >
                  <div className="flex items-center gap-1 text-mac-sky-500">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">
                    “{testimonial.comment}”
                  </p>
                  <p className="mt-4 text-sm font-semibold text-mac-navy-800">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-slate-500">Avaliação via Google</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mx-auto max-w-lg text-center text-sm text-slate-500">
              As avaliações reais de clientes serão exibidas aqui assim que
              forem adicionadas a partir do perfil da empresa no Google.
            </p>
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href={company.googleMapsUrl} external variant="secondary">
            Ver mais avaliações no Google
          </Button>
        </div>
      </Container>
    </section>
  );
}
