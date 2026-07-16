import { Wind, ShieldAlert, Gauge, TimerReset, Droplets } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const benefits = [
  { icon: Wind, label: "Melhorar a qualidade do ar" },
  { icon: Droplets, label: "Reduzir odores" },
  { icon: ShieldAlert, label: "Evitar vazamentos" },
  { icon: Gauge, label: "Manter o desempenho" },
  { icon: TimerReset, label: "Reduzir o risco de falhas" },
  { icon: Wind, label: "Prolongar a vida útil do equipamento" },
];

export function MaintenanceBenefits() {
  return (
    <section className="bg-ice-gradient py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Manutenção preventiva"
          title="Por que manter seu ar-condicionado em dia"
          description="A manutenção regular pode ajudar a evitar consumo excessivo causado por sujeira ou problemas no equipamento."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mac-sky-50 text-mac-sky-600">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-sm font-medium text-mac-navy-800">{label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
