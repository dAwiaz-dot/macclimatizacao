"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import type { ProductFormState } from "./actions";
import type { Product } from "@/lib/products";
import type { Category } from "@/lib/categories";

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

export function ProductForm({
  action,
  product,
  categories,
  submitLabel,
}: {
  action: (state: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  product?: Product;
  categories: Category[];
  submitLabel: string;
}) {
  const [state, formAction] = useFormState(action, {});
  const [preview, setPreview] = useState<string | null>(product?.image_url ?? null);

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      {product && (
        <input type="hidden" name="previousImageUrl" value={product.image_url} />
      )}

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Nome do produto
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={product?.name}
          className="form-input"
          placeholder="Ex.: Ar-condicionado Split 12.000 BTU"
        />
      </div>

      <div>
        <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Categoria
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue={product?.category ?? ""}
          className="form-input"
        >
          <option value="" disabled>
            Selecione uma categoria
          </option>
          {product &&
            !categories.some((category) => category.name === product.category) && (
              <option value={product.category}>{product.category}</option>
            )}
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-slate-500">
          Precisa de uma categoria nova?{" "}
          <Link href="/admin/categorias" className="font-medium text-mac-sky-600 hover:underline">
            Gerencie as categorias aqui
          </Link>
          .
        </p>
      </div>

      <div>
        <label htmlFor="image" className="mb-1.5 block text-sm font-medium text-mac-navy-700">
          Imagem do produto
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
        {product && (
          <p className="mt-1 text-xs text-slate-500">
            Deixe em branco para manter a imagem atual.
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
