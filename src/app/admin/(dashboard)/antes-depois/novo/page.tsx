import { BeforeAfterForm } from "../BeforeAfterForm";
import { createBeforeAfterItemAction } from "../actions";

export default function NovoAntesDepoisPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-mac-navy-800">Novo par de antes e depois</h1>

      <div className="mt-8">
        <BeforeAfterForm action={createBeforeAfterItemAction} submitLabel="Salvar par" />
      </div>
    </div>
  );
}
