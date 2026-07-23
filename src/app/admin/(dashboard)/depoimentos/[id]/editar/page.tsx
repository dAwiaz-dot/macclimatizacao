import { notFound } from "next/navigation";
import { TestimonialForm } from "../../TestimonialForm";
import { updateTestimonialAction } from "../../actions";
import { getTestimonialById } from "@/lib/testimonials";

export default async function EditarDepoimentoPage({
  params,
}: {
  params: { id: string };
}) {
  const testimonial = await getTestimonialById(params.id);
  if (!testimonial) notFound();

  const boundAction = updateTestimonialAction.bind(null, testimonial.id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-mac-navy-800">Editar depoimento</h1>

      <div className="mt-8">
        <TestimonialForm
          action={boundAction}
          testimonial={testimonial}
          submitLabel="Salvar alterações"
        />
      </div>
    </div>
  );
}
