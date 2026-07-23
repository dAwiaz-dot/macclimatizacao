import { readJson, writeJson } from "@/lib/admin/blob-store";

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
