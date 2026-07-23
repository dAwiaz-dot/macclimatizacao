import { TestimonialForm } from "../TestimonialForm";
import { createTestimonialAction } from "../actions";

export default function NovoDepoimentoPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-mac-navy-800">Novo depoimento</h1>
      <p className="mt-1 text-sm text-slate-500">
        Use apenas avaliações reais de clientes.
      </p>

      <div className="mt-8">
        <TestimonialForm action={createTestimonialAction} submitLabel="Salvar depoimento" />
      </div>
    </div>
  );
}
