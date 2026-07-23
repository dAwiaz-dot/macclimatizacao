import { ProductForm } from "../ProductForm";
import { createProductAction } from "../actions";
import { getCategories } from "@/lib/categories";

export default async function NovoProdutoPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="text-2xl font-bold text-mac-navy-800">Novo produto</h1>
      <p className="mt-1 text-sm text-slate-500">
        Preencha os dados abaixo. O produto aparece automaticamente na landing
        page assim que for salvo.
      </p>

      <div className="mt-8">
        <ProductForm
          action={createProductAction}
          categories={categories}
          submitLabel="Salvar produto"
        />
      </div>
    </div>
  );
}
