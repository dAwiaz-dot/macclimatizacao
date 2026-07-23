"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Plus, Loader2 } from "lucide-react";
import { createCategoryAction } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center justify-center gap-2 rounded-full bg-mac-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mac-sky-600 disabled:opacity-60"
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        <Plus className="h-4 w-4" aria-hidden="true" />
      )}
      Adicionar categoria
    </button>
  );
}

export function CategoryForm() {
  const [state, formAction] = useFormState(createCategoryAction, {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state.error) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-wrap items-end gap-3">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Nova categoria
        </label>
        <input
          id="name"
          name="name"
          required
          className="form-input"
          placeholder="Ex.: Insumos"
        />
      </div>
      <SubmitButton />
      {state.error && (
        <p role="alert" className="w-full text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}
    </form>
  );
}
