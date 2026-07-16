"use client";

import { MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { company } from "@/data/company";
import { whatsAppUrlDefault } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-airflow-gradient py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-40"
      >
        <div className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-mac-sky-400/30 blur-3xl animate-float" />
        <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-3xl animate-float [animation-delay:2s]" />
      </div>

      <Container className="relative text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Precisa instalar, limpar ou consertar seu ar-condicionado?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-ice-100/90 sm:text-lg">
          Fale com a MAC Climatização e solicite seu orçamento para Alfenas e
          região.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href={whatsAppUrlDefault()}
            external
            size="lg"
            onClick={() => trackEvent("whatsapp_click", { location: "final_cta" })}
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Falar no WhatsApp agora
          </Button>
          <a
            href={`tel:+${company.whatsappNumber}`}
            onClick={() => trackEvent("phone_click", { location: "final_cta" })}
            className="flex items-center gap-2 text-base font-semibold text-white underline underline-offset-4"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {company.phoneDisplay}
          </a>
        </div>
      </Container>
    </section>
  );
}
