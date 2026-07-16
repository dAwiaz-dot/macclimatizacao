// Fonte única de informações confirmadas da empresa.
// Atenção: só adicione aqui dados confirmados (site, Instagram ou Google Perfil da Empresa).
// Não invente endereço, avaliações, tempo de mercado ou certificações.

export const company = {
  name: "MAC Climatização",
  legalName: "MAC Climatização",
  tagline: "Climatização com qualidade para sua casa ou empresa",
  segment: "Climatização e ar-condicionado",
  region: "Alfenas e região, Minas Gerais",
  city: "Alfenas",
  state: "MG",
  // Cidades confirmadas de atendimento. Adicione outras somente quando confirmadas.
  citiesServed: ["Alfenas"],

  whatsappNumber: "5535988273068", // 55 35 98827-3068
  whatsappDisplay: "(35) 98827-3068",
  phoneDisplay: "(35) 98827-3068",

  // Segundo WhatsApp confirmado nas publicações do Instagram da empresa.
  whatsappNumberSecondary: "5535999574681", // 55 35 99957-4681
  whatsappDisplaySecondary: "(35) 99957-4681",

  instagramUrl: "https://www.instagram.com/macclimatizacao_arcondicionado/",
  instagramHandle: "@macclimatizacao_arcondicionado",
  googleMapsUrl: "https://share.google/3yOb5cXYNQsYpJWS6",

  // Endereço confirmado nas publicações do Instagram da empresa.
  address: {
    street: "Avenida Henrique Munhoz Garcia, 374",
    neighborhood: "Morada do Sol",
    city: "Alfenas",
    state: "MG",
    zip: "",
  },

  // Horário de atendimento ainda não confirmado publicamente — preencher quando disponível.
  businessHours: null as null | string[],
} as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.macclimatizacao.com.br";
