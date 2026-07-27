import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getDiagnosisOptions } from "@/lib/diagnosis";
import { deleteDiagnosisOptionAction } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function DiagnosticoPage() {
  const options = await getDiagnosisOptions();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-mac-navy-800">Diagnóstico rápido</h1>
          <p className="mt-1 text-sm text-slate-500">
            Botões exibidos na seção &ldquo;Diagnóstico rápido&rdquo; da página inicial.
            O texto do cabeçalho é editado em Conteúdo do site.
          </p>
        </div>
        <Link
          href="/admin/diagnostico/novo"
          className="flex items-center gap-2 rounded-full bg-mac-sky-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-mac-sky-600"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nova opção
        </Link>
      </div>

      {options.length === 0 ? (
        <p className="mt-10 text-sm text-slate-500">
          Nenhuma opção cadastrada ainda. Clique em &ldquo;Nova opção&rdquo; para
          adicionar a primeira.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((option) => (
            <div
              key={option.id}
              className="rounded-2xl border border-mac-navy-100 bg-white p-5 shadow-sm"
            >
              <p className="font-semibold text-mac-navy-800">{option.label}</p>
              <p className="mt-2 line-clamp-3 text-sm text-slate-500">
                {option.whatsappMessage}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <Link
                  href={`/admin/diagnostico/${option.id}/editar`}
                  className="flex items-center gap-1.5 text-sm font-medium text-mac-navy-600 hover:text-mac-sky-600"
                >
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                  Editar
                </Link>
                <DeleteButton
                  action={deleteDiagnosisOptionAction.bind(null, option.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
