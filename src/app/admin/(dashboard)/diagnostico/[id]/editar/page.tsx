import { notFound } from "next/navigation";
import { DiagnosisForm } from "../../DiagnosisForm";
import { updateDiagnosisOptionAction } from "../../actions";
import { getDiagnosisOptionById } from "@/lib/diagnosis";

export default async function EditarOpcaoDiagnosticoPage({
  params,
}: {
  params: { id: string };
}) {
  const option = await getDiagnosisOptionById(params.id);
  if (!option) notFound();

  const boundAction = updateDiagnosisOptionAction.bind(null, option.id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-mac-navy-800">Editar opção de diagnóstico</h1>

      <div className="mt-8">
        <DiagnosisForm
          action={boundAction}
          option={option}
          submitLabel="Salvar alterações"
        />
      </div>
    </div>
  );
}
