import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { getBeforeAfterItems } from "@/lib/before-after";
import { deleteBeforeAfterItemAction } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AntesDepoisPage() {
  const items = await getBeforeAfterItems();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-mac-navy-800">Antes e depois</h1>
          <p className="mt-1 text-sm text-slate-500">
            Pares de fotos exibidos na seção &ldquo;Antes e depois&rdquo; da página
            inicial. Sem nenhum par cadastrado, a seção mostra um espaço reservado.
          </p>
        </div>
        <Link
          href="/admin/antes-depois/novo"
          className="flex items-center gap-2 rounded-full bg-mac-sky-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-mac-sky-600"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Novo par
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="mt-10 text-sm text-slate-500">
          Nenhum par cadastrado ainda. Clique em &ldquo;Novo par&rdquo; para adicionar
          o primeiro.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-mac-navy-100 bg-white shadow-sm"
            >
              <div className="grid grid-cols-2">
                <div className="relative aspect-square w-full bg-ice-100">
                  <Image
                    src={item.before_image_url}
                    alt={`${item.title} — antes`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square w-full bg-ice-100">
                  <Image
                    src={item.after_image_url}
                    alt={`${item.title} — depois`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="p-4">
                <p className="font-semibold text-mac-navy-800">{item.title}</p>
                <div className="mt-3 flex items-center justify-between">
                  <Link
                    href={`/admin/antes-depois/${item.id}/editar`}
                    className="flex items-center gap-1.5 text-sm font-medium text-mac-navy-600 hover:text-mac-sky-600"
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                    Editar
                  </Link>
                  <DeleteButton
                    action={deleteBeforeAfterItemAction.bind(
                      null,
                      item.id,
                      item.before_image_url,
                      item.after_image_url
                    )}
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
