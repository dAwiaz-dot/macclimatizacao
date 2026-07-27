"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import type { BeforeAfterFormState } from "./actions";
import type { BeforeAfterItem } from "@/lib/before-after";

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

function ImagePicker({
  id,
  name,
  label,
  currentUrl,
}: {
  id: string;
  name: string;
  label: string;
  currentUrl?: string;
}) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-mac-navy-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="file"
        accept="image/*"
        className="form-input"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setPreview(URL.createObjectURL(file));
        }}
      />
      {currentUrl && (
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
  );
}

export function BeforeAfterForm({
  action,
  item,
  submitLabel,
}: {
  action: (
    state: BeforeAfterFormState,
    formData: FormData
  ) => Promise<BeforeAfterFormState>;
  item?: BeforeAfterItem;
  submitLabel: string;
}) {
  const [state, formAction] = useFormState(action, {});

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      {item && (
        <>
          <input type="hidden" name="previousBeforeImageUrl" value={item.before_image_url} />
          <input type="hidden" name="previousAfterImageUrl" value={item.after_image_url} />
        </>
      )}

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
          placeholder="Ex.: Higienização de split residencial"
        />
      </div>

      <ImagePicker
        id="beforeImage"
        name="beforeImage"
        label="Foto do antes"
        currentUrl={item?.before_image_url}
      />

      <ImagePicker
        id="afterImage"
        name="afterImage"
        label="Foto do depois"
        currentUrl={item?.after_image_url}
      />

      {state.error && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}

      <SubmitButton label={submitLabel} />
    </form>
  );
}
