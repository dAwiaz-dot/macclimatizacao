import { readJson, writeJson } from "@/lib/admin/blob-store";
import { company } from "@/data/company";

const contentPath = (key: string) => `data/content/${key}.json`;

export async function getContent<T extends object>(
  key: string,
  defaults: T
): Promise<T> {
  const data = await readJson<Partial<T>>(contentPath(key));
  return { ...defaults, ...data };
}

export async function updateContent<T extends object>(
  key: string,
  data: T
): Promise<void> {
  await writeJson(contentPath(key), data);
}

export type HeroContent = {
  badge: string;
  title: string;
  subtitle: string;
  differentials: string[];
  calloutText: string;
  image_url: string;
};

export const defaultHero: HeroContent = {
  badge: "Alfenas e região — MG",
  title: "Climatização com qualidade para sua casa ou empresa",
  subtitle:
    "Venda, instalação, manutenção, reparo e higienização de ar-condicionado em Alfenas e região.",
  differentials: [
    "Atendimento em Alfenas e região",
    "Serviços residenciais e comerciais",
    "Orçamento rápido",
    "Atendimento especializado",
  ],
  calloutText:
    "Seu ar-condicionado não está gelando, está pingando ou com mau cheiro?",
  image_url: "/images/hero/tecnico-manutencao-indoor.jpg",
};

export type AboutContent = {
  badge: string;
  title: string;
  description: string;
  values: string[];
  image_url: string;
};

export const defaultAbout: AboutContent = {
  badge: "Sobre a Mac Climatização",
  title: "Cuidado e profissionalismo em cada atendimento",
  description:
    "A Mac Climatização oferece soluções de climatização para casas, comércios e empresas em Alfenas e região. Trabalhamos com venda, instalação, manutenção, reparo e higienização de ar-condicionado, sempre buscando entregar um serviço cuidadoso, profissional e de confiança.",
  values: [
    "Qualidade na execução",
    "Atenção aos detalhes",
    "Atendimento próximo",
    "Compromisso com o cliente",
    "Cuidado com o ambiente",
    "Soluções residenciais e comerciais",
  ],
  image_url: "/images/sobre/tecnico-manometro.jpg",
};

export type TrustBarContent = {
  items: string[];
};

export const defaultTrustBar: TrustBarContent = {
  items: [
    "Instalação profissional",
    "Manutenção preventiva",
    "Higienização completa",
    "Atendimento residencial e empresarial",
    "Suporte pelo WhatsApp",
  ],
};

export type WhyChooseUsContent = {
  eyebrow: string;
  title: string;
  reasons: string[];
};

export const defaultWhyChooseUs: WhyChooseUsContent = {
  eyebrow: "Por que escolher a Mac Climatização",
  title: "Diferenciais que fazem a diferença no seu atendimento",
  reasons: [
    "Atendimento rápido e personalizado",
    "Serviço cuidadoso",
    "Soluções para casas e empresas",
    "Profissionais especializados",
    "Atenção ao acabamento",
    "Orçamento sem compromisso",
    "Atendimento em Alfenas e região",
    "Facilidade de contato pelo WhatsApp",
  ],
};

export type MaintenanceBenefitsContent = {
  eyebrow: string;
  title: string;
  description: string;
  benefits: string[];
};

export const defaultMaintenanceBenefits: MaintenanceBenefitsContent = {
  eyebrow: "Manutenção preventiva",
  title: "Por que manter seu ar-condicionado em dia",
  description:
    "A manutenção regular pode ajudar a evitar consumo excessivo causado por sujeira ou problemas no equipamento.",
  benefits: [
    "Melhorar a qualidade do ar",
    "Reduzir odores",
    "Evitar vazamentos",
    "Manter o desempenho",
    "Reduzir o risco de falhas",
    "Prolongar a vida útil do equipamento",
  ],
};

export type ProcessTimelineContent = {
  eyebrow: string;
  title: string;
  description: string;
  steps: string[];
  ctaLabel: string;
};

export const defaultProcessTimeline: ProcessTimelineContent = {
  eyebrow: "Como funciona",
  title: "Processo de atendimento",
  description:
    "Um caminho simples e transparente, do primeiro contato até a entrega do serviço.",
  steps: [
    "O cliente entra em contato",
    "Explica o serviço ou problema",
    "A equipe realiza a avaliação",
    "O orçamento é apresentado",
    "O serviço é agendado",
    "O trabalho é executado e testado",
  ],
  ctaLabel: "Quero solicitar uma avaliação",
};

export type ResidentialCommercialContent = {
  residential: { title: string; description: string; ctaLabel: string };
  commercial: { title: string; description: string; ctaLabel: string };
};

export const defaultResidentialCommercial: ResidentialCommercialContent = {
  residential: {
    title: "Residencial",
    description:
      "Soluções para quartos, salas, apartamentos, casas e áreas de convivência.",
    ctaLabel: "Solicitar atendimento residencial",
  },
  commercial: {
    title: "Comercial",
    description:
      "Soluções para lojas, escritórios, clínicas, restaurantes e outros estabelecimentos.",
    ctaLabel: "Solicitar atendimento comercial",
  },
};

export type FinalCtaContent = {
  title: string;
  subtitle: string;
  ctaLabel: string;
};

export const defaultFinalCta: FinalCtaContent = {
  title: "Precisa instalar, limpar ou consertar seu ar-condicionado?",
  subtitle:
    "Fale com a Mac Climatização e solicite seu orçamento para Alfenas e região.",
  ctaLabel: "Falar no WhatsApp agora",
};

export type QuickDiagnosisHeaderContent = {
  eyebrow: string;
  title: string;
  description: string;
};

export const defaultQuickDiagnosisHeader: QuickDiagnosisHeaderContent = {
  eyebrow: "Diagnóstico rápido",
  title: "Qual problema seu ar-condicionado apresenta?",
  description:
    "Escolha uma opção abaixo e fale direto com nossa equipe pelo WhatsApp, já com sua necessidade explicada.",
};

export type BeforeAfterHeaderContent = {
  eyebrow: string;
  title: string;
  description: string;
};

export const defaultBeforeAfterHeader: BeforeAfterHeaderContent = {
  eyebrow: "Antes e depois",
  title: "Resultados de higienização e manutenção",
  description:
    "Arraste o controle para comparar. As imagens reais serão adicionadas conforme os registros dos serviços forem organizados.",
};

export type ServiceAreaContent = {
  eyebrow: string;
  title: string;
  citiesServed: string[];
};

export const defaultServiceArea: ServiceAreaContent = {
  eyebrow: "Onde atendemos",
  title: "Atendimento em Alfenas e região",
  citiesServed: [...company.citiesServed],
};

export type FooterContent = {
  description: string;
};

export const defaultFooter: FooterContent = {
  description:
    "Soluções de climatização para casas, comércios e empresas em Alfenas e região: venda, instalação, manutenção, reparo e higienização de ar-condicionado.",
};

export type HeaderContent = {
  ctaLabel: string;
};

export const defaultHeader: HeaderContent = {
  ctaLabel: "Solicitar orçamento",
};

export type BrandingContent = {
  logo_url: string;
};

export const defaultBranding: BrandingContent = {
  logo_url: "/images/logo/mac-climatizacao-logo-full.png",
};

export type ContactPageContent = {
  eyebrow: string;
  title: string;
  description: string;
};

export const defaultContactPage: ContactPageContent = {
  eyebrow: "Contato",
  title: "Fale com a Mac Climatização",
  description: "Escolha o canal mais conveniente para você.",
};
