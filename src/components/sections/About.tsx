import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { DemoImage } from "@/components/ui/DemoImage";
import { getContent, defaultAbout } from "@/lib/site-content";

export async function About() {
  const content = await getContent("about", defaultAbout);

  return (
    <section id="sobre" className="bg-white py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <DemoImage
          src={content.image_url}
          alt="Técnico em atendimento de climatização (foto ilustrativa)"
          className="aspect-[4/3] w-full rounded-3xl order-2 lg:order-1"
        />

        <div className="order-1 lg:order-2">
          <span className="inline-block rounded-full bg-mac-sky-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-mac-sky-700">
            {content.badge}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-mac-navy-800 sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            {content.description}
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {content.values.map((value) => (
              <li
                key={value}
                className="flex items-center gap-2 text-sm font-medium text-mac-navy-700"
              >
                <CheckCircle2
                  className="h-4 w-4 shrink-0 text-mac-sky-500"
                  aria-hidden="true"
                />
                {value}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
