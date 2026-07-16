"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import type { PortfolioFormState } from "./actions";
import type { PortfolioItem } from "@/lib/portfolio";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center justify-center gap-2 rounded-full bg-mac-sky-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-mac-sky-600 disabled:opacity-60"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {label}
    </button>
  );
}

export function PortfolioForm({
  action,
  item,
  submitLabel,
}: {
  action: (state: PortfolioFormState, formData: FormData) => Promise<PortfolioFormState>;
  item?: PortfolioItem;
  submitLabel: string;
}) {
  const [state, formAction] = useFormState(action, {});
  const [preview, setPreview] = useState<string | null>(item?.image_url ?? null);

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      {item && <input type="hidden" name="previousImageUrl" value={item.image_url} />}

      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Título
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={item?.title}
          className="form-input"
          placeholder="Ex.: Instalação de split em residência"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1.5 block text-sm font-medium text-mac-navy-700"
        >
          Breve descrição (opcional)
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={item?.description ?? ""}
          className="form-input min-h-[90px] resize-y"
          placeholder="Conte rapidamente sobre o serviço realizado"
        />
      </div>

      <div>
        <label
          htmlFor="service_date"
          className="mb-1.5 block text-sm font-medium text-mac-navy-700"
        >
          Data do serviço (opcional)
        </label>
        <input
          id="service_date"
          name="service_date"
          type="date"
          defaultValue={item?.service_date ?? ""}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="image" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Foto do trabalho
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          className="form-input"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setPreview(URL.createObjectURL(file));
          }}
        />
        {item && (
          <p className="mt-1 text-xs text-slate-500">
            Deixe em branco para manter a foto atual.
          </p>
        )}
        {preview && (
          <div className="relative mt-3 h-40 w-40 overflow-hidden rounded-xl border border-mac-navy-100">
            <Image src={preview} alt="Pré-visualização" fill className="object-cover" />
          </div>
        )}
      </div>

      {state.error && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}

      <SubmitButton label={submitLabel} />
    </form>
  );
}
