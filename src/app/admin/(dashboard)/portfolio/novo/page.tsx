import { PortfolioForm } from "../PortfolioForm";
import { createPortfolioItemAction } from "../actions";

export default function NovoPortfolioItemPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-mac-navy-800">Novo trabalho realizado</h1>
      <p className="mt-1 text-sm text-slate-500">
        Aparece automaticamente na seção de portfólio da landing page.
      </p>

      <div className="mt-8">
        <PortfolioForm action={createPortfolioItemAction} submitLabel="Salvar" />
      </div>
    </div>
  );
}
