"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import { Loader2, Check } from "lucide-react";
import {
  updateHeroAction,
  updateAboutAction,
  updateTrustBarAction,
  updateWhyChooseUsAction,
  updateMaintenanceBenefitsAction,
  updateProcessTimelineAction,
  updateResidentialCommercialAction,
  updateFinalCtaAction,
  updateQuickDiagnosisHeaderAction,
  updateBeforeAfterHeaderAction,
  updateServiceAreaAction,
  updateFooterAction,
  updateHeaderAction,
  updateBrandingAction,
  updateContactPageAction,
} from "./actions";
import type {
  HeroContent,
  AboutContent,
  TrustBarContent,
  WhyChooseUsContent,
  MaintenanceBenefitsContent,
  ProcessTimelineContent,
  ResidentialCommercialContent,
  FinalCtaContent,
  QuickDiagnosisHeaderContent,
  BeforeAfterHeaderContent,
  ServiceAreaContent,
  FooterContent,
  HeaderContent,
  BrandingContent,
  ContactPageContent,
} from "@/lib/site-content";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center justify-center gap-2 rounded-full bg-mac-sky-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-mac-sky-600 disabled:opacity-60"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      Salvar alterações
    </button>
  );
}

function ImageField({
  label,
  currentUrl,
}: {
  label: string;
  currentUrl: string;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-mac-navy-700">
        {label}
      </label>
      <input
        name="image"
        type="file"
        accept="image/*"
        className="form-input"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setPreview(URL.createObjectURL(file));
        }}
      />
      <p className="mt-1 text-xs text-slate-500">
        Deixe em branco para manter a foto atual.
      </p>
      <div className="relative mt-3 h-40 w-56 overflow-hidden rounded-xl border border-mac-navy-100">
        <Image src={preview ?? currentUrl} alt="" fill className="object-cover" />
      </div>
    </div>
  );
}

export function HeroForm({ content }: { content: HeroContent }) {
  const [state, formAction] = useFormState(updateHeroAction, {});

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="badge" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Selo (acima do título)
        </label>
        <input
          id="badge"
          name="badge"
          defaultValue={content.badge}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Título principal
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={content.title}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="subtitle" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Subtítulo
        </label>
        <textarea
          id="subtitle"
          name="subtitle"
          required
          rows={2}
          defaultValue={content.subtitle}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="differentials" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Diferenciais (um por linha)
        </label>
        <textarea
          id="differentials"
          name="differentials"
          rows={4}
          defaultValue={content.differentials.join("\n")}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="calloutText" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Texto do aviso (com o link &ldquo;Fale com nossa equipe&rdquo;)
        </label>
        <textarea
          id="calloutText"
          name="calloutText"
          rows={2}
          defaultValue={content.calloutText}
          className="form-input"
        />
      </div>

      <ImageField label="Foto de fundo" currentUrl={content.image_url} />

      {state.error && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="flex items-center gap-1.5 text-sm font-medium text-green-600">
          <Check className="h-4 w-4" aria-hidden="true" />
          Salvo com sucesso.
        </p>
      )}

      <SaveButton />
    </form>
  );
}

export function AboutForm({ content }: { content: AboutContent }) {
  const [state, formAction] = useFormState(updateAboutAction, {});

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="about-badge" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Selo (acima do título)
        </label>
        <input
          id="about-badge"
          name="badge"
          defaultValue={content.badge}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="about-title" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Título
        </label>
        <input
          id="about-title"
          name="title"
          required
          defaultValue={content.title}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="about-description" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Texto sobre a empresa
        </label>
        <textarea
          id="about-description"
          name="description"
          required
          rows={5}
          defaultValue={content.description}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="about-values" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Valores (um por linha)
        </label>
        <textarea
          id="about-values"
          name="values"
          rows={6}
          defaultValue={content.values.join("\n")}
          className="form-input"
        />
      </div>

      <ImageField label="Foto" currentUrl={content.image_url} />

      {state.error && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="flex items-center gap-1.5 text-sm font-medium text-green-600">
          <Check className="h-4 w-4" aria-hidden="true" />
          Salvo com sucesso.
        </p>
      )}

      <SaveButton />
    </form>
  );
}

function FormFeedback({ state }: { state: { error?: string; success?: boolean } }) {
  return (
    <>
      {state.error && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="flex items-center gap-1.5 text-sm font-medium text-green-600">
          <Check className="h-4 w-4" aria-hidden="true" />
          Salvo com sucesso.
        </p>
      )}
    </>
  );
}

export function TrustBarForm({ content }: { content: TrustBarContent }) {
  const [state, formAction] = useFormState(updateTrustBarAction, {});

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="trustbar-items" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Itens (um por linha)
        </label>
        <textarea
          id="trustbar-items"
          name="items"
          required
          rows={5}
          defaultValue={content.items.join("\n")}
          className="form-input"
        />
      </div>

      <FormFeedback state={state} />
      <SaveButton />
    </form>
  );
}

export function WhyChooseUsForm({ content }: { content: WhyChooseUsContent }) {
  const [state, formAction] = useFormState(updateWhyChooseUsAction, {});

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="why-eyebrow" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Selo (acima do título)
        </label>
        <input id="why-eyebrow" name="eyebrow" defaultValue={content.eyebrow} className="form-input" />
      </div>

      <div>
        <label htmlFor="why-title" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Título
        </label>
        <input id="why-title" name="title" required defaultValue={content.title} className="form-input" />
      </div>

      <div>
        <label htmlFor="why-reasons" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Diferenciais (um por linha)
        </label>
        <textarea
          id="why-reasons"
          name="reasons"
          required
          rows={8}
          defaultValue={content.reasons.join("\n")}
          className="form-input"
        />
      </div>

      <FormFeedback state={state} />
      <SaveButton />
    </form>
  );
}

export function MaintenanceBenefitsForm({
  content,
}: {
  content: MaintenanceBenefitsContent;
}) {
  const [state, formAction] = useFormState(updateMaintenanceBenefitsAction, {});

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="maint-eyebrow" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Selo (acima do título)
        </label>
        <input id="maint-eyebrow" name="eyebrow" defaultValue={content.eyebrow} className="form-input" />
      </div>

      <div>
        <label htmlFor="maint-title" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Título
        </label>
        <input id="maint-title" name="title" required defaultValue={content.title} className="form-input" />
      </div>

      <div>
        <label htmlFor="maint-description" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Descrição
        </label>
        <textarea
          id="maint-description"
          name="description"
          rows={2}
          defaultValue={content.description}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="maint-benefits" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Benefícios (um por linha)
        </label>
        <textarea
          id="maint-benefits"
          name="benefits"
          required
          rows={6}
          defaultValue={content.benefits.join("\n")}
          className="form-input"
        />
      </div>

      <FormFeedback state={state} />
      <SaveButton />
    </form>
  );
}

export function ProcessTimelineForm({ content }: { content: ProcessTimelineContent }) {
  const [state, formAction] = useFormState(updateProcessTimelineAction, {});

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="process-eyebrow" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Selo (acima do título)
        </label>
        <input id="process-eyebrow" name="eyebrow" defaultValue={content.eyebrow} className="form-input" />
      </div>

      <div>
        <label htmlFor="process-title" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Título
        </label>
        <input id="process-title" name="title" required defaultValue={content.title} className="form-input" />
      </div>

      <div>
        <label htmlFor="process-description" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Descrição
        </label>
        <textarea
          id="process-description"
          name="description"
          rows={2}
          defaultValue={content.description}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="process-steps" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Etapas (uma por linha)
        </label>
        <textarea
          id="process-steps"
          name="steps"
          required
          rows={6}
          defaultValue={content.steps.join("\n")}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="process-cta" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Texto do botão
        </label>
        <input id="process-cta" name="ctaLabel" defaultValue={content.ctaLabel} className="form-input" />
      </div>

      <FormFeedback state={state} />
      <SaveButton />
    </form>
  );
}

export function ResidentialCommercialForm({
  content,
}: {
  content: ResidentialCommercialContent;
}) {
  const [state, formAction] = useFormState(updateResidentialCommercialAction, {});

  return (
    <form action={formAction} className="max-w-xl space-y-8">
      <div className="space-y-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Coluna Residencial
        </h3>
        <div>
          <label htmlFor="residential-title" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
            Título
          </label>
          <input
            id="residential-title"
            name="residentialTitle"
            required
            defaultValue={content.residential.title}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="residential-description" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
            Descrição
          </label>
          <textarea
            id="residential-description"
            name="residentialDescription"
            rows={2}
            defaultValue={content.residential.description}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="residential-cta" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
            Texto do botão
          </label>
          <input
            id="residential-cta"
            name="residentialCtaLabel"
            defaultValue={content.residential.ctaLabel}
            className="form-input"
          />
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Coluna Comercial
        </h3>
        <div>
          <label htmlFor="commercial-title" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
            Título
          </label>
          <input
            id="commercial-title"
            name="commercialTitle"
            required
            defaultValue={content.commercial.title}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="commercial-description" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
            Descrição
          </label>
          <textarea
            id="commercial-description"
            name="commercialDescription"
            rows={2}
            defaultValue={content.commercial.description}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="commercial-cta" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
            Texto do botão
          </label>
          <input
            id="commercial-cta"
            name="commercialCtaLabel"
            defaultValue={content.commercial.ctaLabel}
            className="form-input"
          />
        </div>
      </div>

      <FormFeedback state={state} />
      <SaveButton />
    </form>
  );
}

export function FinalCtaForm({ content }: { content: FinalCtaContent }) {
  const [state, formAction] = useFormState(updateFinalCtaAction, {});

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="finalcta-title" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Título
        </label>
        <input id="finalcta-title" name="title" required defaultValue={content.title} className="form-input" />
      </div>

      <div>
        <label htmlFor="finalcta-subtitle" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Subtítulo
        </label>
        <textarea
          id="finalcta-subtitle"
          name="subtitle"
          rows={2}
          defaultValue={content.subtitle}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="finalcta-cta" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Texto do botão
        </label>
        <input id="finalcta-cta" name="ctaLabel" defaultValue={content.ctaLabel} className="form-input" />
      </div>

      <FormFeedback state={state} />
      <SaveButton />
    </form>
  );
}

export function QuickDiagnosisHeaderForm({
  content,
}: {
  content: QuickDiagnosisHeaderContent;
}) {
  const [state, formAction] = useFormState(updateQuickDiagnosisHeaderAction, {});

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="diag-eyebrow" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Selo (acima do título)
        </label>
        <input id="diag-eyebrow" name="eyebrow" defaultValue={content.eyebrow} className="form-input" />
      </div>

      <div>
        <label htmlFor="diag-title" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Título
        </label>
        <input id="diag-title" name="title" required defaultValue={content.title} className="form-input" />
      </div>

      <div>
        <label htmlFor="diag-description" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Descrição
        </label>
        <textarea
          id="diag-description"
          name="description"
          rows={2}
          defaultValue={content.description}
          className="form-input"
        />
      </div>

      <p className="text-xs text-slate-500">
        As opções de diagnóstico (botões) são gerenciadas em{" "}
        <span className="font-medium">Diagnóstico rápido</span> no menu.
      </p>

      <FormFeedback state={state} />
      <SaveButton />
    </form>
  );
}

export function BeforeAfterHeaderForm({
  content,
}: {
  content: BeforeAfterHeaderContent;
}) {
  const [state, formAction] = useFormState(updateBeforeAfterHeaderAction, {});

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="ba-eyebrow" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Selo (acima do título)
        </label>
        <input id="ba-eyebrow" name="eyebrow" defaultValue={content.eyebrow} className="form-input" />
      </div>

      <div>
        <label htmlFor="ba-title" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Título
        </label>
        <input id="ba-title" name="title" required defaultValue={content.title} className="form-input" />
      </div>

      <div>
        <label htmlFor="ba-description" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Descrição
        </label>
        <textarea
          id="ba-description"
          name="description"
          rows={2}
          defaultValue={content.description}
          className="form-input"
        />
      </div>

      <p className="text-xs text-slate-500">
        Os pares de fotos antes/depois são gerenciados em{" "}
        <span className="font-medium">Antes e depois</span> no menu.
      </p>

      <FormFeedback state={state} />
      <SaveButton />
    </form>
  );
}

export function ServiceAreaForm({ content }: { content: ServiceAreaContent }) {
  const [state, formAction] = useFormState(updateServiceAreaAction, {});

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="area-eyebrow" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Selo (acima do título)
        </label>
        <input id="area-eyebrow" name="eyebrow" defaultValue={content.eyebrow} className="form-input" />
      </div>

      <div>
        <label htmlFor="area-title" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Título
        </label>
        <input id="area-title" name="title" required defaultValue={content.title} className="form-input" />
      </div>

      <div>
        <label htmlFor="area-cities" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Cidades atendidas (uma por linha)
        </label>
        <textarea
          id="area-cities"
          name="citiesServed"
          required
          rows={4}
          defaultValue={content.citiesServed.join("\n")}
          className="form-input"
        />
      </div>

      <FormFeedback state={state} />
      <SaveButton />
    </form>
  );
}

export function FooterForm({ content }: { content: FooterContent }) {
  const [state, formAction] = useFormState(updateFooterAction, {});

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="footer-description" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Descrição curta (rodapé)
        </label>
        <textarea
          id="footer-description"
          name="description"
          required
          rows={3}
          defaultValue={content.description}
          className="form-input"
        />
      </div>

      <FormFeedback state={state} />
      <SaveButton />
    </form>
  );
}

export function HeaderForm({ content }: { content: HeaderContent }) {
  const [state, formAction] = useFormState(updateHeaderAction, {});

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="header-cta" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Texto do botão (menu e barra fixa mobile)
        </label>
        <input
          id="header-cta"
          name="ctaLabel"
          required
          defaultValue={content.ctaLabel}
          className="form-input"
        />
      </div>

      <FormFeedback state={state} />
      <SaveButton />
    </form>
  );
}

export function BrandingForm({ content }: { content: BrandingContent }) {
  const [state, formAction] = useFormState(updateBrandingAction, {});

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <ImageField label="Logo do site" currentUrl={content.logo_url} />

      <FormFeedback state={state} />
      <SaveButton />
    </form>
  );
}

export function ContactPageForm({ content }: { content: ContactPageContent }) {
  const [state, formAction] = useFormState(updateContactPageAction, {});

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="contact-eyebrow" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Selo (acima do título)
        </label>
        <input id="contact-eyebrow" name="eyebrow" defaultValue={content.eyebrow} className="form-input" />
      </div>

      <div>
        <label htmlFor="contact-title" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Título
        </label>
        <input id="contact-title" name="title" required defaultValue={content.title} className="form-input" />
      </div>

      <div>
        <label htmlFor="contact-description" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Descrição
        </label>
        <textarea
          id="contact-description"
          name="description"
          rows={2}
          defaultValue={content.description}
          className="form-input"
        />
      </div>

      <FormFeedback state={state} />
      <SaveButton />
    </form>
  );
}
