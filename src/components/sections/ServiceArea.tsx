"use client";

import { MapPin, Navigation } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { company } from "@/data/company";
import { whatsAppUrlDefault } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function ServiceArea() {
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `MAC Climatização, ${company.address.street} - ${company.address.neighborhood}, ${company.city} - ${company.state}`
  )}&output=embed`;

  return (
    <section className="bg-ice-gradient py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Onde atendemos"
          title="Atendimento em Alfenas e região"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div
            className="overflow-hidden rounded-2xl border border-mac-navy-100 shadow-sm"
            onClick={() => trackEvent("map_open")}
          >
            <iframe
              title="Localização aproximada da MAC Climatização em Alfenas, MG"
              src={mapEmbedSrc}
              className="h-80 w-full sm:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div>
            <p className="text-base leading-relaxed text-slate-600">
              A MAC Climatização fica em {company.address.street} –{" "}
              {company.address.neighborhood}, {company.city}/{company.state}, e
              atende {company.city} e cidades da região. Entre em contato
              informando sua localização para confirmarmos o atendimento no seu
              endereço.
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {company.citiesServed.map((city) => (
                <li
                  key={city}
                  className="flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-mac-navy-700 shadow-sm"
                >
                  <MapPin className="h-4 w-4 text-mac-sky-500" aria-hidden="true" />
                  {city}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={company.googleMapsUrl}
                external
                variant="secondary"
                onClick={() => trackEvent("map_open", { location: "service_area" })}
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Ver rota no Google Maps
              </Button>
              <Button
                href={whatsAppUrlDefault()}
                external
                onClick={() =>
                  trackEvent("whatsapp_click", { location: "service_area" })
                }
              >
                Solicitar atendimento
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
