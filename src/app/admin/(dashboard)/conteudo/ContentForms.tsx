"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import { Loader2, Check } from "lucide-react";
import { updateHeroAction, updateAboutAction } from "./actions";
import type { HeroContent, AboutContent } from "@/lib/site-content";

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
