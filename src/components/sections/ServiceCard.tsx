"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getServiceBySlug as getBaseServiceBySlug, type Service } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { whatsAppUrlForService } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

// O ícone é um componente (função) e não pode atravessar o limite
// servidor->cliente dentro de "service"; o slug identifica o ícone certo
// a partir dos dados estáticos, que já são importados no bundle do cliente.
export function ServiceCard({
  service,
  index,
}: {
  service: Omit<Service, "icon">;
  index: number;
}) {
  const Icon = getBaseServiceBySlug(service.slug)?.icon;
  if (!Icon) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="flex flex-col rounded-2xl border border-mac-navy-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mac-sky-50 text-mac-sky-600">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-mac-navy-800">
        {service.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {service.shortDescription}
      </p>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={`/servicos/${service.slug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-mac-navy-700 hover:text-mac-sky-600"
          onClick={() => trackEvent("service_view", { service: service.slug })}
        >
          Saiba mais
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Button
          href={whatsAppUrlForService(service.whatsappContext)}
          external
          size="sm"
          variant="secondary"
          onClick={() =>
            trackEvent("whatsapp_click", { location: "service_card", service: service.slug })
          }
        >
          Solicitar orçamento
        </Button>
      </div>
    </motion.div>
  );
}
