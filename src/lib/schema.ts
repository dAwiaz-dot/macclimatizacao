import { company, siteUrl } from "@/data/company";
import { getFaqItems } from "@/lib/faq";
import { getServices } from "@/lib/services-content";

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#organization`,
    name: company.name,
    description:
      "Venda, instalação, manutenção, reparo e higienização de ar-condicionado em Alfenas e região.",
    url: siteUrl,
    telephone: `+${company.whatsappNumber}`,
    areaServed: company.citiesServed.map((city) => ({
      "@type": "City",
      name: city,
    })),
    address: company.address
      ? {
          "@type": "PostalAddress",
          streetAddress: `${company.address.street} - ${company.address.neighborhood}`,
          addressLocality: company.address.city,
          addressRegion: company.address.state,
          ...(company.address.zip ? { postalCode: company.address.zip } : {}),
          addressCountry: "BR",
        }
      : {
          "@type": "PostalAddress",
          addressLocality: company.city,
          addressRegion: company.state,
          addressCountry: "BR",
        },
    sameAs: [company.instagramUrl],
  };
}

export async function getServiceListSchema() {
  const services = await getServices();
  return services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.shortDescription,
    provider: {
      "@type": "LocalBusiness",
      name: company.name,
    },
    areaServed: company.citiesServed.map((city) => ({
      "@type": "City",
      name: city,
    })),
  }));
}

export async function getFaqSchema() {
  const faqItems = await getFaqItems();
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
