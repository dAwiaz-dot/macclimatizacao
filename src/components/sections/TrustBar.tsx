import { Wrench, ShieldCheck, Sparkles, Building2, MessageCircle } from "lucide-react";

const items = [
  { icon: Wrench, label: "Instalação profissional" },
  { icon: ShieldCheck, label: "Manutenção preventiva" },
  { icon: Sparkles, label: "Higienização completa" },
  { icon: Building2, label: "Atendimento residencial e empresarial" },
  { icon: MessageCircle, label: "Suporte pelo WhatsApp" },
];

export function TrustBar() {
  return (
    <section className="border-b border-mac-navy-100 bg-white py-8">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-6 px-4 sm:grid-cols-3 sm:px-6 lg:grid-cols-5 lg:px-8">
        {items.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mac-sky-50 text-mac-sky-600">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-xs font-medium text-mac-navy-700 sm:text-sm">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
