import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";

export const metadata: Metadata = {
  title: "Sobre a MAC Climatização",
  description:
    "Conheça a MAC Climatização: soluções de climatização para casas, comércios e empresas em Alfenas e região.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <div className="pt-16">
      <About />
      <WhyChooseUs />
      <ProcessTimeline />
    </div>
  );
}
