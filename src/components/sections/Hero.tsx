"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DemoImage } from "@/components/ui/DemoImage";
import { whatsAppUrlDefault } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

const differentials = [
  "Atendimento em Alfenas e região",
  "Serviços residenciais e comerciais",
  "Orçamento rápido",
  "Atendimento especializado",
];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-airflow-gradient pb-20 pt-32 sm:pt-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-40"
      >
        <div className="absolute left-1/4 top-1/3 h-40 w-40 rounded-full bg-mac-sky-400/30 blur-3xl animate-float" />
        <div className="absolute right-10 top-10 h-56 w-56 rounded-full bg-white/10 blur-3xl animate-float [animation-delay:1.5s]" />
        <div className="absolute -bottom-10 left-10 h-64 w-64 rounded-full bg-mac-sky-300/20 blur-3xl animate-float [animation-delay:3s]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-mac-sky-100">
            Alfenas e região — MG
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Climatização com qualidade para sua casa ou empresa
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ice-100/90">
            Venda, instalação, manutenção, reparo e higienização de
            ar-condicionado em Alfenas e região.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              href={whatsAppUrlDefault()}
              external
              size="lg"
              onClick={() => trackEvent("whatsapp_click", { location: "hero" })}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Solicitar orçamento pelo WhatsApp
            </Button>
            <Button href="/#servicos" variant="outlineLight" size="lg">
              Conhecer nossos serviços
            </Button>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {differentials.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-ice-100/90"
              >
                <CheckCircle2
                  className="h-4 w-4 shrink-0 text-mac-sky-300"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-4 text-sm text-ice-100/90">
            Seu ar-condicionado não está gelando, está pingando ou com mau
            cheiro?{" "}
            <a
              href={whatsAppUrlDefault()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline underline-offset-4"
              onClick={() =>
                trackEvent("whatsapp_click", { location: "hero_callout" })
              }
            >
              Fale com nossa equipe.
            </a>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <DemoImage
            src="/images/hero/tecnico-manutencao-indoor.jpg"
            alt="Técnico realizando manutenção em ar-condicionado (foto ilustrativa)"
            priority
            className="aspect-[4/5] w-full rounded-3xl shadow-2xl shadow-black/30 sm:aspect-[4/3] lg:aspect-[4/5]"
          />
        </motion.div>
      </div>
    </section>
  );
}
