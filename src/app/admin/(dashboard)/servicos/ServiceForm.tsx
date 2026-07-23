"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import type { ServiceFormState } from "./actions";
import type { Service } from "@/data/services";

function SubmitButton() {
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

export function ServiceForm({
  action,
  service,
}: {
  action: (state: ServiceFormState, formData: FormData) => Promise<ServiceFormState>;
  service: Service;
}) {
  const [state, formAction] = useFormState(action, {});
  const [preview, setPreview] = useState<string | null>(service.image_url ?? null);

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Nome do serviço
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={service.name}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="shortDescription" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Resumo (aparece no card da listagem)
        </label>
        <textarea
          id="shortDescription"
          name="shortDescription"
          required
          rows={2}
          defaultValue={service.shortDescription}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Descrição completa (um parágrafo por linha)
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          defaultValue={service.description.join("\n")}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="highlights" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Destaques (um por linha)
        </label>
        <textarea
          id="highlights"
          name="highlights"
          rows={4}
          defaultValue={service.highlights.join("\n")}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="whatsappContext" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Contexto da mensagem no WhatsApp
        </label>
        <input
          id="whatsappContext"
          name="whatsappContext"
          defaultValue={service.whatsappContext}
          className="form-input"
          placeholder='Ex.: "instalação de ar-condicionado"'
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Foto do serviço
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
          {service.image_url
            ? "Deixe em branco para manter a foto atual."
            : "Ainda não há foto real cadastrada — hoje aparece um espaço reservado no site."}
        </p>
        {preview && (
          <div className="relative mt-3 h-40 w-56 overflow-hidden rounded-xl border border-mac-navy-100">
            <Image src={preview} alt="" fill className="object-cover" />
          </div>
        )}
      </div>

      {state.error && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
