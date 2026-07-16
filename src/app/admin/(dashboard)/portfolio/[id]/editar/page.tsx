import { notFound } from "next/navigation";
import { PortfolioForm } from "../../PortfolioForm";
import { updatePortfolioItemAction } from "../../actions";
import { getPortfolioItemById } from "@/lib/portfolio";

export default async function EditarPortfolioItemPage({
  params,
}: {
  params: { id: string };
}) {
  const item = await getPortfolioItemById(params.id);
  if (!item) notFound();

  const boundAction = updatePortfolioItemAction.bind(null, item.id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-mac-navy-800">Editar trabalho realizado</h1>
      <p className="mt-1 text-sm text-slate-500">
        As alterações são refletidas automaticamente na landing page.
      </p>

      <div className="mt-8">
        <PortfolioForm action={boundAction} item={item} submitLabel="Salvar alterações" />
      </div>
    </div>
  );
}
