import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { whatsAppUrlDefault } from "@/lib/whatsapp";

const steps = [
  "O cliente entra em contato",
  "Explica o serviço ou problema",
  "A equipe realiza a avaliação",
  "O orçamento é apresentado",
  "O serviço é agendado",
  "O trabalho é executado e testado",
];

export function ProcessTimeline() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Como funciona"
          title="Processo de atendimento"
          description="Um caminho simples e transparente, do primeiro contato até a entrega do serviço."
        />

        <ol className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step}
              className="relative flex gap-4 rounded-2xl border border-mac-navy-100 bg-ice-50 p-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mac-sky-500 text-sm font-bold text-white">
                {index + 1}
              </span>
              <p className="text-sm font-medium text-mac-navy-800">{step}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex justify-center">
          <Button href={whatsAppUrlDefault()} external size="lg">
            Quero solicitar uma avaliação
          </Button>
        </div>
      </Container>
    </section>
  );
}
