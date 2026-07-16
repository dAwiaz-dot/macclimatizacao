import Link from "next/link";
import { Package, Images } from "lucide-react";
import { getProducts } from "@/lib/products";
import { getPortfolioItems } from "@/lib/portfolio";

export default async function AdminHomePage() {
  const [products, portfolioItems] = await Promise.all([
    getProducts(),
    getPortfolioItems(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-mac-navy-800">Painel administrativo</h1>
      <p className="mt-1 text-sm text-slate-500">
        Gerencie por aqui os produtos e os trabalhos realizados exibidos no site.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Link
          href="/admin/produtos"
          className="flex items-center gap-4 rounded-2xl border border-mac-navy-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mac-sky-50 text-mac-sky-600">
            <Package className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <p className="text-lg font-semibold text-mac-navy-800">
              {products.length} produto{products.length === 1 ? "" : "s"}
            </p>
            <p className="text-sm text-slate-500">Gerenciar catálogo de produtos</p>
          </div>
        </Link>

        <Link
          href="/admin/portfolio"
          className="flex items-center gap-4 rounded-2xl border border-mac-navy-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mac-sky-50 text-mac-sky-600">
            <Images className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <p className="text-lg font-semibold text-mac-navy-800">
              {portfolioItems.length} trabalho{portfolioItems.length === 1 ? "" : "s"}
            </p>
            <p className="text-sm text-slate-500">Gerenciar trabalhos realizados</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
