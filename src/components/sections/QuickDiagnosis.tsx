"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { diagnosisOptions } from "@/data/diagnosis";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function QuickDiagnosis() {
  return (
    <section className="bg-mac-navy-800 py-20 sm:py-24">
      <Container>
        <SectionHeading
          light
          eyebrow="Diagnóstico rápido"
          title="Qual problema seu ar-condicionado apresenta?"
          description="Escolha uma opção abaixo e fale direto com nossa equipe pelo WhatsApp, já com sua necessidade explicada."
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {diagnosisOptions.map((option, index) => (
            <motion.a
              key={option.id}
              href={buildWhatsAppUrl(option.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
              onClick={() =>
                trackEvent("whatsapp_click", {
                  location: "quick_diagnosis",
                  option: option.id,
                })
              }
              className="flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-5 text-center text-sm font-medium text-white transition-colors hover:border-mac-sky-400 hover:bg-white/10"
            >
              {option.label}
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}
