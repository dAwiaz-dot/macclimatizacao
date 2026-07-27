import { DiagnosisForm } from "../DiagnosisForm";
import { createDiagnosisOptionAction } from "../actions";

export default function NovaOpcaoDiagnosticoPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-mac-navy-800">Nova opção de diagnóstico</h1>

      <div className="mt-8">
        <DiagnosisForm action={createDiagnosisOptionAction} submitLabel="Salvar opção" />
      </div>
    </div>
  );
}
