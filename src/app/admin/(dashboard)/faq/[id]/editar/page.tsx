import { notFound } from "next/navigation";
import { FaqForm } from "../../FaqForm";
import { updateFaqAction } from "../../actions";
import { getFaqItemById } from "@/lib/faq";

export default async function EditarPerguntaPage({
  params,
}: {
  params: { id: string };
}) {
  const item = await getFaqItemById(params.id);
  if (!item) notFound();

  const boundAction = updateFaqAction.bind(null, item.id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-mac-navy-800">Editar pergunta</h1>

      <div className="mt-8">
        <FaqForm action={boundAction} item={item} submitLabel="Salvar alterações" />
      </div>
    </div>
  );
}
