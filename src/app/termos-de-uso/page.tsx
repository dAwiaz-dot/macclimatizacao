import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de Uso do site da Mac Climatização.",
  alternates: { canonical: "/termos-de-uso" },
};

export default function TermosDeUsoPage() {
  return (
    <div className="bg-white py-28 sm:py-32">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold text-mac-navy-800">Termos de Uso</h1>
        <p className="mt-2 text-sm text-slate-500">
          Última atualização: julho de 2026
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-600">
          <section>
            <h2 className="text-lg font-semibold text-mac-navy-800">
              1. Sobre este site
            </h2>
            <p className="mt-2">
              Este site é mantido pela Mac Climatização com o objetivo de
              apresentar seus serviços de climatização e facilitar o contato
              de clientes em Alfenas e região.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-mac-navy-800">
              2. Orçamentos e informações
            </h2>
            <p className="mt-2">
              As informações sobre serviços apresentadas neste site têm
              caráter informativo. Valores, prazos e condições de cada
              serviço são confirmados diretamente com a equipe da MAC
              Climatização durante o atendimento.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-mac-navy-800">
              3. Uso do conteúdo
            </h2>
            <p className="mt-2">
              Os textos, imagens e identidade visual deste site pertencem à
              Mac Climatização e não devem ser reproduzidos sem autorização.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-mac-navy-800">
              4. Contato
            </h2>
            <p className="mt-2">
              Dúvidas sobre estes Termos de Uso podem ser esclarecidas pelo
              WhatsApp (35) 98827-3068.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
