import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatButton } from "@/components/layout/WhatsAppFloatButton";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { getLocalBusinessSchema } from "@/lib/schema";
import { siteUrl } from "@/data/company";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MAC Climatização | Ar-Condicionado em Alfenas e Região",
    template: "%s | MAC Climatização",
  },
  description:
    "Venda, instalação, manutenção, reparo e higienização de ar-condicionado em Alfenas e região. Solicite seu orçamento com a MAC Climatização.",
  keywords: [
    "ar-condicionado em Alfenas",
    "instalação de ar-condicionado em Alfenas",
    "manutenção de ar-condicionado em Alfenas",
    "limpeza de ar-condicionado em Alfenas",
    "higienização de ar-condicionado em Alfenas",
    "conserto de ar-condicionado em Alfenas",
    "venda de ar-condicionado em Alfenas",
    "climatização residencial em Alfenas",
    "climatização comercial em Alfenas",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "MAC Climatização",
    title: "MAC Climatização | Ar-Condicionado em Alfenas e Região",
    description:
      "Venda, instalação, manutenção, reparo e higienização de ar-condicionado em Alfenas e região.",
    images: ["/images/logo/mac-climatizacao-logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MAC Climatização | Ar-Condicionado em Alfenas e Região",
    description:
      "Venda, instalação, manutenção, reparo e higienização de ar-condicionado em Alfenas e região.",
    images: ["/images/logo/mac-climatizacao-logo.jpg"],
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans antialiased">
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
        <MobileCTA />
      </body>
    </html>
  );
}
