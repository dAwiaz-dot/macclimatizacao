import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getFaqItems } from "@/lib/faq";
import { deleteFaqAction } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function FaqPage() {
  const items = await getFaqItems();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-mac-navy-800">
            Perguntas frequentes
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Essas perguntas aparecem na seção de dúvidas da landing page.
          </p>
        </div>
        <Link
          href="/admin/faq/novo"
          className="flex items-center gap-2 rounded-full bg-mac-sky-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-mac-sky-600"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nova pergunta
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="mt-10 text-sm text-slate-500">
          Nenhuma pergunta cadastrada ainda.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-mac-navy-100 rounded-2xl border border-mac-navy-100 bg-white">
          {items.map((item) => (
            <li key={item.id} className="flex items-start justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-mac-navy-800">
                  {item.question}
                </p>
                <p className="mt-1 text-sm text-slate-500">{item.answer}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Link
                  href={`/admin/faq/${item.id}/editar`}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-mac-navy-600 hover:bg-mac-sky-50"
                  aria-label="Editar"
                >
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                </Link>
                <DeleteButton action={deleteFaqAction.bind(null, item.id)} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
