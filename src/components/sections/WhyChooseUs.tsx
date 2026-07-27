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
import { getContent, defaultWhyChooseUs } from "@/lib/site-content";

const icons = [
  Clock,
  HandHeart,
  Building2,
  Award,
  Ruler,
  MessageCircleQuestion,
  MapPin,
  MessageCircle,
];

export async function WhyChooseUs() {
  const content = await getContent("whyChooseUs", defaultWhyChooseUs);

  return (
    <section className="bg-ice-gradient py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.title} />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.reasons.map((label, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={label}
                className="flex flex-col items-start gap-3 rounded-2xl bg-white p-5 shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mac-navy-800 text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="text-sm font-semibold text-mac-navy-800">{label}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
