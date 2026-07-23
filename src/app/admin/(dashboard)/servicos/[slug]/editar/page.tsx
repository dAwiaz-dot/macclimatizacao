import { notFound } from "next/navigation";
import { ServiceForm } from "../../ServiceForm";
import { updateServiceAction } from "../../actions";
import { getServiceBySlug } from "@/lib/services-content";

export default async function EditarServicoPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  const boundAction = updateServiceAction.bind(null, service.slug);

  return (
    <div>
      <h1 className="text-2xl font-bold text-mac-navy-800">Editar serviço</h1>
      <p className="mt-1 text-sm text-slate-500">
        As alterações são refletidas automaticamente na landing page.
      </p>

      <div className="mt-8">
        <ServiceForm action={boundAction} service={service} />
      </div>
    </div>
  );
}
