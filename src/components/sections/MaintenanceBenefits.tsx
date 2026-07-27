import { Wind, ShieldAlert, Gauge, TimerReset, Droplets } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getContent, defaultMaintenanceBenefits } from "@/lib/site-content";

const icons = [Wind, Droplets, ShieldAlert, Gauge, TimerReset, Wind];

export async function MaintenanceBenefits() {
  const content = await getContent(
    "maintenanceBenefits",
    defaultMaintenanceBenefits
  );

  return (
    <section className="bg-ice-gradient py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.benefits.map((label, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mac-sky-50 text-mac-sky-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="text-sm font-medium text-mac-navy-800">{label}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
