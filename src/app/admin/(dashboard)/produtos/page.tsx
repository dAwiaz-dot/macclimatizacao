import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { getProducts } from "@/lib/products";
import { deleteProductAction } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function ProdutosPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-mac-navy-800">Produtos</h1>
          <p className="mt-1 text-sm text-slate-500">
            Esses produtos aparecem automaticamente na landing page.
          </p>
        </div>
        <Link
          href="/admin/produtos/novo"
          className="flex items-center gap-2 rounded-full bg-mac-sky-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-mac-sky-600"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Novo produto
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="mt-10 text-sm text-slate-500">
          Nenhum produto cadastrado ainda. Clique em &ldquo;Novo produto&rdquo; para
          adicionar o primeiro.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-2xl border border-mac-navy-100 bg-white shadow-sm"
            >
              <div className="relative aspect-square w-full bg-ice-100">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <span className="inline-block rounded-full bg-mac-sky-50 px-2.5 py-0.5 text-xs font-medium text-mac-sky-700">
                  {product.category}
                </span>
                <p className="mt-2 font-semibold text-mac-navy-800">{product.name}</p>
                <div className="mt-3 flex items-center justify-between">
                  <Link
                    href={`/admin/produtos/${product.id}/editar`}
                    className="flex items-center gap-1.5 text-sm font-medium text-mac-navy-600 hover:text-mac-sky-600"
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                    Editar
                  </Link>
                  <DeleteButton
                    action={deleteProductAction.bind(null, product.id, product.image_url)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
