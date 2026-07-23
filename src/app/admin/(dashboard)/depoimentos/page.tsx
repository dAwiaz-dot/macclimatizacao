import Link from "next/link";
import { Plus, Pencil, Star } from "lucide-react";
import { getTestimonials } from "@/lib/testimonials";
import { deleteTestimonialAction } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function DepoimentosPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-mac-navy-800">Depoimentos</h1>
          <p className="mt-1 text-sm text-slate-500">
            Avaliações de clientes exibidas na landing page.
          </p>
        </div>
        <Link
          href="/admin/depoimentos/novo"
          className="flex items-center gap-2 rounded-full bg-mac-sky-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-mac-sky-600"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Novo depoimento
        </Link>
      </div>

      {testimonials.length === 0 ? (
        <p className="mt-10 text-sm text-slate-500">
          Nenhum depoimento cadastrado ainda.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-2xl border border-mac-navy-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-1 text-mac-sky-500">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                “{testimonial.comment}”
              </p>
              <p className="mt-3 text-sm font-semibold text-mac-navy-800">
                {testimonial.name}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <Link
                  href={`/admin/depoimentos/${testimonial.id}/editar`}
                  className="flex items-center gap-1.5 text-sm font-medium text-mac-navy-600 hover:text-mac-sky-600"
                >
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                  Editar
                </Link>
                <DeleteButton
                  action={deleteTestimonialAction.bind(null, testimonial.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
