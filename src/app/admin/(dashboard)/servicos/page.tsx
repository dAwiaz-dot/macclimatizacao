import Link from "next/link";
import { Pencil } from "lucide-react";
import { getServices } from "@/lib/services-content";

export default async function ServicosAdminPage() {
  const services = await getServices();

  return (
    <div>
      <h1 className="text-2xl font-bold text-mac-navy-800">Serviços</h1>
      <p className="mt-1 text-sm text-slate-500">
        Edite o texto e a foto de cada serviço exibido no site.
      </p>

      <ul className="mt-8 divide-y divide-mac-navy-100 rounded-2xl border border-mac-navy-100 bg-white">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <li
              key={service.slug}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mac-sky-50 text-mac-sky-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-mac-navy-800">
                    {service.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {service.shortDescription}
                  </p>
                </div>
              </div>
              <Link
                href={`/admin/servicos/${service.slug}/editar`}
                className="flex items-center gap-1.5 text-sm font-medium text-mac-navy-600 hover:text-mac-sky-600"
              >
                <Pencil className="h-4 w-4" aria-hidden="true" />
                Editar
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
