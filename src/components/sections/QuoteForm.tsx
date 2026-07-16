"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

type FormState = {
  name: string;
  phone: string;
  city: string;
  audience: "residencial" | "comercial";
  service: string;
  brand: string;
  btus: string;
  description: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  city: "",
  audience: "residencial",
  service: services[0].slug,
  brand: "",
  btus: "",
  description: "",
};

export function QuoteForm() {
  const [form, setForm] = useState<FormState>(initialState);

  function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const selectedService =
      services.find((service) => service.slug === form.service)?.name ??
      form.service;

    const lines = [
      "Olá! Encontrei a MAC Climatização pelo site e gostaria de solicitar um orçamento.",
      "",
      `Nome: ${form.name}`,
      `Telefone: ${form.phone}`,
      `Cidade: ${form.city}`,
      `Tipo de atendimento: ${form.audience === "residencial" ? "Residencial" : "Comercial"}`,
      `Serviço desejado: ${selectedService}`,
      form.brand ? `Marca do aparelho: ${form.brand}` : null,
      form.btus ? `Capacidade (BTUs): ${form.btus}` : null,
      form.description ? `Descrição do problema: ${form.description}` : null,
    ].filter(Boolean);

    trackEvent("form_submit", { service: form.service });
    trackEvent("quote_request", { service: form.service, audience: form.audience });

    window.open(buildWhatsAppUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contato" className="bg-ice-gradient py-20 sm:py-24">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Solicite seu orçamento"
          title="Conte um pouco sobre o seu ar-condicionado"
          description="Preencha os campos abaixo e envie direto para o nosso WhatsApp."
        />

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid grid-cols-1 gap-5 rounded-3xl bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8"
        >
          <Field label="Nome" htmlFor="name">
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="form-input"
              placeholder="Seu nome"
            />
          </Field>

          <Field label="Telefone" htmlFor="phone">
            <input
              id="phone"
              required
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="form-input"
              placeholder="(35) 90000-0000"
              inputMode="tel"
            />
          </Field>

          <Field label="Cidade" htmlFor="city">
            <input
              id="city"
              required
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className="form-input"
              placeholder="Ex.: Alfenas"
            />
          </Field>

          <Field label="Residencial ou comercial" htmlFor="audience">
            <select
              id="audience"
              value={form.audience}
              onChange={(e) =>
                handleChange("audience", e.target.value as FormState["audience"])
              }
              className="form-input"
            >
              <option value="residencial">Residencial</option>
              <option value="comercial">Comercial</option>
            </select>
          </Field>

          <Field label="Serviço desejado" htmlFor="service">
            <select
              id="service"
              value={form.service}
              onChange={(e) => handleChange("service", e.target.value)}
              className="form-input"
            >
              {services.map((service) => (
                <option key={service.slug} value={service.slug}>
                  {service.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Marca do aparelho (opcional)" htmlFor="brand">
            <input
              id="brand"
              value={form.brand}
              onChange={(e) => handleChange("brand", e.target.value)}
              className="form-input"
              placeholder="Ex.: Springer, Samsung..."
            />
          </Field>

          <Field label="Capacidade em BTUs (se souber)" htmlFor="btus">
            <input
              id="btus"
              value={form.btus}
              onChange={(e) => handleChange("btus", e.target.value)}
              className="form-input"
              placeholder="Ex.: 9.000, 12.000, 18.000..."
            />
          </Field>

          <Field label="Descrição do problema" htmlFor="description" full>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="form-input min-h-[100px] resize-y"
              placeholder="Descreva o problema ou a necessidade. Você poderá anexar fotos diretamente pelo WhatsApp."
            />
          </Field>

          <div className="sm:col-span-2">
            <Button type="submit" size="lg" className="w-full">
              Enviar e continuar no WhatsApp
            </Button>
            <p className="mt-3 text-center text-xs text-slate-500">
              Ao enviar, você será redirecionado ao WhatsApp com sua solicitação
              já preenchida.
            </p>
          </div>
        </form>
      </Container>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
  full,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-mac-navy-700">
        {label}
      </label>
      {children}
    </div>
  );
}
