import { notFound } from "next/navigation";
import { ProductForm } from "../../ProductForm";
import { updateProductAction } from "../../actions";
import { getProductById } from "@/lib/products";
import { getCategories } from "@/lib/categories";

export default async function EditarProdutoPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, categories] = await Promise.all([
    getProductById(params.id),
    getCategories(),
  ]);
  if (!product) notFound();

  const boundAction = updateProductAction.bind(null, product.id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-mac-navy-800">Editar produto</h1>
      <p className="mt-1 text-sm text-slate-500">
        As alterações são refletidas automaticamente na landing page.
      </p>

      <div className="mt-8">
        <ProductForm
          action={boundAction}
          product={product}
          categories={categories}
          submitLabel="Salvar alterações"
        />
      </div>
    </div>
  );
}
