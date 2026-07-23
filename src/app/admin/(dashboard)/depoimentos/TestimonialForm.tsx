"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import type { TestimonialFormState } from "./actions";
import type { Testimonial } from "@/lib/testimonials";

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

export function TestimonialForm({
  action,
  testimonial,
  submitLabel,
}: {
  action: (
    state: TestimonialFormState,
    formData: FormData
  ) => Promise<TestimonialFormState>;
  testimonial?: Testimonial;
  submitLabel: string;
}) {
  const [state, formAction] = useFormState(action, {});

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Nome do cliente
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={testimonial?.name}
          className="form-input"
          placeholder="Como aparece no Google"
        />
      </div>

      <div>
        <label htmlFor="rating" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Avaliação
        </label>
        <select
          id="rating"
          name="rating"
          defaultValue={testimonial?.rating ?? 5}
          className="form-input"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} estrela{n > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="comment" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Comentário
        </label>
        <textarea
          id="comment"
          name="comment"
          required
          rows={4}
          defaultValue={testimonial?.comment}
          className="form-input"
          placeholder="Texto exato do comentário do cliente"
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
