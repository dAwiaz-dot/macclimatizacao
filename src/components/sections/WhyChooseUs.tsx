import {
  Clock,
  HandHeart,
  Building2,
  Award,
  Ruler,
  MessageCircleQuestion,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  { icon: Clock, label: "Atendimento rápido e personalizado" },
  { icon: HandHeart, label: "Serviço cuidadoso" },
  { icon: Building2, label: "Soluções para casas e empresas" },
  { icon: Award, label: "Profissionais especializados" },
  { icon: Ruler, label: "Atenção ao acabamento" },
  { icon: MessageCircleQuestion, label: "Orçamento sem compromisso" },
  { icon: MapPin, label: "Atendimento em Alfenas e região" },
  { icon: MessageCircle, label: "Facilidade de contato pelo WhatsApp" },
];

export function WhyChooseUs() {
  return (
    <section className="bg-ice-gradient py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Por que escolher a MAC Climatização"
          title="Diferenciais que fazem a diferença no seu atendimento"
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-start gap-3 rounded-2xl bg-white p-5 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mac-navy-800 text-white">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-sm font-semibold text-mac-navy-800">{label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
