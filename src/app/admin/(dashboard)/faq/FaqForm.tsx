"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import type { FaqFormState } from "./actions";
import type { FaqItem } from "@/lib/faq";

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

export function FaqForm({
  action,
  item,
  submitLabel,
}: {
  action: (state: FaqFormState, formData: FormData) => Promise<FaqFormState>;
  item?: FaqItem;
  submitLabel: string;
}) {
  const [state, formAction] = useFormState(action, {});

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="question" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Pergunta
        </label>
        <input
          id="question"
          name="question"
          required
          defaultValue={item?.question}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="answer" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Resposta
        </label>
        <textarea
          id="answer"
          name="answer"
          required
          rows={5}
          defaultValue={item?.answer}
          className="form-input"
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
