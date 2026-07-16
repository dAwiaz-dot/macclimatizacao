import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Calendar } from "lucide-react";
import { getPortfolioItems } from "@/lib/portfolio";
import { deletePortfolioItemAction } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function PortfolioPage() {
  const items = await getPortfolioItems();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-mac-navy-800">Trabalhos realizados</h1>
          <p className="mt-1 text-sm text-slate-500">
            Exibidos automaticamente como portfólio na landing page.
          </p>
        </div>
        <Link
          href="/admin/portfolio/novo"
          className="flex items-center gap-2 rounded-full bg-mac-sky-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-mac-sky-600"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Novo item
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="mt-10 text-sm text-slate-500">
          Nenhum trabalho cadastrado ainda. Clique em &ldquo;Novo item&rdquo; para
          adicionar o primeiro.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-mac-navy-100 bg-white shadow-sm"
            >
              <div className="relative aspect-video w-full bg-ice-100">
                <Image src={item.image_url} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="font-semibold text-mac-navy-800">{item.title}</p>
                {item.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                    {item.description}
                  </p>
                )}
                {item.service_date && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                    {new Date(`${item.service_date}T00:00:00`).toLocaleDateString("pt-BR")}
                  </p>
                )}
                <div className="mt-3 flex items-center justify-between">
                  <Link
                    href={`/admin/portfolio/${item.id}/editar`}
                    className="flex items-center gap-1.5 text-sm font-medium text-mac-navy-600 hover:text-mac-sky-600"
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                    Editar
                  </Link>
                  <DeleteButton
                    action={deletePortfolioItemAction.bind(null, item.id, item.image_url)}
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
