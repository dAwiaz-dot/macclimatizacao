import { notFound } from "next/navigation";
import { BeforeAfterForm } from "../../BeforeAfterForm";
import { updateBeforeAfterItemAction } from "../../actions";
import { getBeforeAfterItemById } from "@/lib/before-after";

export default async function EditarAntesDepoisPage({
  params,
}: {
  params: { id: string };
}) {
  const item = await getBeforeAfterItemById(params.id);
  if (!item) notFound();

  const boundAction = updateBeforeAfterItemAction.bind(null, item.id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-mac-navy-800">Editar antes e depois</h1>

      <div className="mt-8">
        <BeforeAfterForm
          action={boundAction}
          item={item}
          submitLabel="Salvar alterações"
        />
      </div>
    </div>
  );
}
