"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import type { DiagnosisFormState } from "./actions";
import type { DiagnosisOption } from "@/lib/diagnosis";

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

export function DiagnosisForm({
  action,
  option,
  submitLabel,
}: {
  action: (
    state: DiagnosisFormState,
    formData: FormData
  ) => Promise<DiagnosisFormState>;
  option?: DiagnosisOption;
  submitLabel: string;
}) {
  const [state, formAction] = useFormState(action, {});

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="label" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Texto do botão
        </label>
        <input
          id="label"
          name="label"
          required
          defaultValue={option?.label}
          className="form-input"
          placeholder="Ex.: Não está gelando"
        />
      </div>

      <div>
        <label
          htmlFor="whatsappMessage"
          className="mb-1.5 block text-sm font-medium text-mac-navy-700"
        >
          Mensagem enviada ao WhatsApp
        </label>
        <textarea
          id="whatsappMessage"
          name="whatsappMessage"
          required
          rows={4}
          defaultValue={option?.whatsappMessage}
          className="form-input"
          placeholder="Mensagem que o cliente enviará ao clicar no botão"
        />
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
