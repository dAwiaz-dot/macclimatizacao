import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatButton } from "@/components/layout/WhatsAppFloatButton";
import { InstagramFloatButton } from "@/components/layout/InstagramFloatButton";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { getLocalBusinessSchema } from "@/lib/schema";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getLocalBusinessSchema()),
        }}
      />
      <AnalyticsScripts />
      <Header />
      <main className="pb-16 sm:pb-0">{children}</main>
      <Footer />
      <WhatsAppFloatButton />
      <InstagramFloatButton />
      <MobileCTA />
    </>
  );
}
