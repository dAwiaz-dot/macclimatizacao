import { getContent, defaultHero, defaultAbout } from "@/lib/site-content";
import { HeroForm, AboutForm } from "./ContentForms";

export default async function ConteudoPage() {
  const [hero, about] = await Promise.all([
    getContent("hero", defaultHero),
    getContent("about", defaultAbout),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-mac-navy-800">Conteúdo do site</h1>
      <p className="mt-1 text-sm text-slate-500">
        Texto e foto das seções de Início e Sobre da landing page.
      </p>

      <div className="mt-8 space-y-10">
        <section className="rounded-2xl border border-mac-navy-100 bg-white p-6">
          <h2 className="text-lg font-semibold text-mac-navy-800">
            Seção Início (banner principal)
          </h2>
          <div className="mt-6">
            <HeroForm content={hero} />
          </div>
        </section>

        <section className="rounded-2xl border border-mac-navy-100 bg-white p-6">
          <h2 className="text-lg font-semibold text-mac-navy-800">
            Seção Sobre
          </h2>
          <div className="mt-6">
            <AboutForm content={about} />
          </div>
        </section>
      </div>
    </div>
  );
}
