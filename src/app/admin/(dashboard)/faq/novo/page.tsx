import { FaqForm } from "../FaqForm";
import { createFaqAction } from "../actions";

export default function NovaPerguntaPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-mac-navy-800">Nova pergunta</h1>

      <div className="mt-8">
        <FaqForm action={createFaqAction} submitLabel="Salvar pergunta" />
      </div>
    </div>
  );
}
