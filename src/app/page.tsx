import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { QuickDiagnosis } from "@/components/sections/QuickDiagnosis";
import { About } from "@/components/sections/About";
import { Gallery } from "@/components/sections/Gallery";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ResidentialCommercial } from "@/components/sections/ResidentialCommercial";
import { MaintenanceBenefits } from "@/components/sections/MaintenanceBenefits";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { FAQ } from "@/components/sections/FAQ";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { getFaqSchema, getServiceListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqSchema()) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getServiceListSchema()),
        }}
      />

      <Hero />
      <TrustBar />
      <Services />
      <QuickDiagnosis />
      <About />
      <Gallery />
      <BeforeAfter />
      <WhyChooseUs />
      <ProcessTimeline />
      <ResidentialCommercial />
      <MaintenanceBenefits />
      <Testimonials />
      <ServiceArea />
      <FAQ />
      <QuoteForm />
      <FinalCTA />
    </>
  );
}
