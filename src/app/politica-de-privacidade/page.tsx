import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade do site da Mac Climatização.",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="bg-white py-28 sm:py-32">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold text-mac-navy-800">
          Política de Privacidade
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Última atualização: julho de 2026
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-600">
          <p>
            Esta Política de Privacidade descreve como a Mac Climatização
            trata as informações fornecidas pelos visitantes deste site.
          </p>

          <section>
            <h2 className="text-lg font-semibold text-mac-navy-800">
              1. Informações coletadas
            </h2>
            <p className="mt-2">
              Ao preencher o formulário de orçamento ou entrar em contato pelo
              WhatsApp, você pode nos fornecer voluntariamente informações
              como nome, telefone, cidade e detalhes sobre o serviço
              desejado. Essas informações são utilizadas exclusivamente para
              possibilitar o contato e a elaboração do orçamento solicitado.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-mac-navy-800">
              2. Uso de cookies e ferramentas de análise
            </h2>
            <p className="mt-2">
              O site pode utilizar ferramentas como Google Analytics, Google
              Tag Manager e Meta Pixel para entender como os visitantes usam
              o site e para mensurar o desempenho de campanhas de
              publicidade. Essas ferramentas podem utilizar cookies para
              coletar dados de navegação de forma agregada e anônima.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-mac-navy-800">
              3. Compartilhamento de informações
            </h2>
            <p className="mt-2">
              As informações fornecidas pelo formulário de orçamento são
              enviadas diretamente para o WhatsApp da Mac Climatização e não
              são compartilhadas com terceiros para fins comerciais.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-mac-navy-800">
              4. Contato
            </h2>
            <p className="mt-2">
              Em caso de dúvidas sobre esta Política de Privacidade, entre em
              contato pelo WhatsApp (35) 99957-4681.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
