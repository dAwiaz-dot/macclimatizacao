import { Home, Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { whatsAppUrlForService } from "@/lib/whatsapp";

export function ResidentialCommercial() {
  return (
    <section className="bg-mac-navy-800 py-20 sm:py-24">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mac-sky-500/20 text-mac-sky-300">
              <Home className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-2xl font-bold text-white">Residencial</h3>
            <p className="mt-3 text-sm leading-relaxed text-ice-100/80">
              Soluções para quartos, salas, apartamentos, casas e áreas de
              convivência.
            </p>
            <Button
              href={whatsAppUrlForService("atendimento residencial")}
              external
              variant="outlineLight"
              size="md"
              className="mt-6"
            >
              Solicitar atendimento residencial
            </Button>
          </div>

          <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mac-sky-500/20 text-mac-sky-300">
              <Building2 className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-2xl font-bold text-white">Comercial</h3>
            <p className="mt-3 text-sm leading-relaxed text-ice-100/80">
              Soluções para lojas, escritórios, clínicas, restaurantes e outros
              estabelecimentos.
            </p>
            <Button
              href={whatsAppUrlForService("atendimento comercial")}
              external
              variant="outlineLight"
              size="md"
              className="mt-6"
            >
              Solicitar atendimento comercial
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
