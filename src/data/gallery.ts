// Galeria de trabalhos realizados.
//
// IMPORTANTE: as imagens abaixo são fotos de banco de imagens gratuito (Pexels),
// usadas apenas como DEMONSTRAÇÃO para a empresa visualizar o layout do site.
// Não são fotos reais da Mac Climatização. Substitua cada "src" pela fotografia
// real do serviço em /public/images/trabalhos/ assim que estiver disponível
// (o componente de galeria já exibe automaticamente a foto real no lugar da
// imagem de demonstração quando o arquivo for trocado).

export type GalleryCategory =
  | "instalacoes"
  | "manutencoes"
  | "higienizacoes"
  | "comercial"
  | "residencial";

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "instalacoes", label: "Instalações" },
  { id: "manutencoes", label: "Manutenções" },
  { id: "higienizacoes", label: "Higienizações" },
  { id: "comercial", label: "Atendimentos comerciais" },
  { id: "residencial", label: "Atendimentos residenciais" },
];

export type GalleryItem = {
  id: string;
  category: GalleryCategory;
  caption: string;
  src: string | null;
  isDemo?: boolean;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "instalacao-01",
    category: "instalacoes",
    caption: "Instalação de ar-condicionado split",
    src: "/images/trabalhos/instalacao-01.jpg",
    isDemo: true,
  },
  {
    id: "instalacao-02",
    category: "instalacoes",
    caption: "Instalação em ambiente comercial",
    src: "/images/trabalhos/instalacao-02.jpg",
    isDemo: true,
  },
  {
    id: "manutencao-01",
    category: "manutencoes",
    caption: "Manutenção preventiva em unidade evaporadora",
    src: "/images/trabalhos/manutencao-01.jpg",
    isDemo: true,
  },
  {
    id: "manutencao-02",
    category: "manutencoes",
    caption: "Manutenção corretiva em unidade condensadora",
    src: "/images/trabalhos/manutencao-02.jpg",
    isDemo: true,
  },
  {
    id: "higienizacao-01",
    category: "higienizacoes",
    caption: "Higienização completa de aparelho split",
    src: "/images/trabalhos/higienizacao-01.jpg",
    isDemo: true,
  },
  {
    id: "higienizacao-02",
    category: "higienizacoes",
    caption: "Limpeza de filtros e serpentina",
    src: "/images/trabalhos/higienizacao-02.jpg",
    isDemo: true,
  },
  {
    id: "comercial-01",
    category: "comercial",
    caption: "Atendimento em estabelecimento comercial",
    src: "/images/trabalhos/comercial-01.jpg",
    isDemo: true,
  },
  {
    id: "residencial-01",
    category: "residencial",
    caption: "Atendimento residencial em Alfenas",
    src: "/images/trabalhos/residencial-01.jpg",
    isDemo: true,
  },
];
