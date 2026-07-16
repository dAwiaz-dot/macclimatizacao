import type { LucideIcon } from "lucide-react";
import {
  ShoppingCart,
  Wrench,
  ShieldCheck,
  Hammer,
  Sparkles,
  ArrowLeftRight,
  Cable,
  ClipboardCheck,
  PackageSearch,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  icon: LucideIcon;
  description: string[];
  highlights: string[];
  whatsappContext: string;
};

export const services: Service[] = [
  {
    slug: "venda-de-ar-condicionado",
    name: "Venda de ar-condicionado",
    shortDescription:
      "Auxílio na escolha do equipamento adequado para o ambiente e a necessidade do cliente.",
    icon: ShoppingCart,
    description: [
      "Ajudamos você a escolher o aparelho de ar-condicionado ideal, considerando o tamanho do ambiente, o uso residencial ou comercial e o seu orçamento.",
      "Nossa equipe orienta sobre capacidade em BTUs e as opções disponíveis, para que o equipamento atenda bem às suas necessidades.",
    ],
    highlights: [
      "Orientação sobre a capacidade ideal (BTUs)",
      "Atendimento residencial e comercial",
      "Indicação conforme o ambiente",
    ],
    whatsappContext: "compra de um aparelho de ar-condicionado",
  },
  {
    slug: "instalacao-de-ar-condicionado",
    name: "Instalação de ar-condicionado",
    shortDescription:
      "Instalação profissional, segura e com atenção ao acabamento.",
    icon: Wrench,
    description: [
      "Realizamos a instalação completa do seu ar-condicionado com cuidado técnico e atenção aos detalhes de acabamento.",
      "Avaliamos o local antes da instalação para garantir um serviço seguro e um resultado limpo e bem executado.",
    ],
    highlights: [
      "Instalação segura e cuidadosa",
      "Atenção ao acabamento",
      "Avaliação prévia do ambiente",
    ],
    whatsappContext: "instalação de ar-condicionado",
  },
  {
    slug: "manutencao-preventiva",
    name: "Manutenção preventiva",
    shortDescription:
      "Revisão periódica para evitar falhas, aumentar a eficiência e prolongar a vida útil do equipamento.",
    icon: ShieldCheck,
    description: [
      "A manutenção preventiva ajuda a evitar problemas antes que eles aconteçam, mantendo o desempenho do seu aparelho.",
      "Fazemos a revisão dos componentes principais para reduzir o risco de falhas e ajudar a prolongar a vida útil do equipamento.",
    ],
    highlights: [
      "Revisão periódica dos componentes",
      "Redução do risco de falhas",
      "Mais eficiência no dia a dia",
    ],
    whatsappContext: "manutenção preventiva do meu ar-condicionado",
  },
  {
    slug: "manutencao-corretiva-e-reparos",
    name: "Manutenção corretiva e reparos",
    shortDescription:
      "Diagnóstico e correção de problemas como aparelho sem gelar, vazamentos, barulhos e falhas de funcionamento.",
    icon: Hammer,
    description: [
      "Se o seu ar-condicionado não está gelando, está fazendo barulho, pingando ou apresentando qualquer outra falha, nossa equipe realiza o diagnóstico e o reparo necessário.",
      "Buscamos identificar a causa do problema para propor a correção mais adequada para o seu equipamento.",
    ],
    highlights: [
      "Diagnóstico técnico do problema",
      "Correção de vazamentos e ruídos",
      "Atendimento para aparelhos sem gelar",
    ],
    whatsappContext: "manutenção corretiva no meu ar-condicionado",
  },
  {
    slug: "limpeza-e-higienizacao",
    name: "Limpeza e higienização",
    shortDescription:
      "Limpeza completa para remover poeira, sujeira, odores e melhorar a qualidade do ar.",
    icon: Sparkles,
    description: [
      "A higienização remove poeira, sujeira e odores acumulados no aparelho, contribuindo para um ar mais limpo no ambiente.",
      "Recomendada periodicamente para manter o bom funcionamento e o conforto de quem usa o espaço.",
    ],
    highlights: [
      "Remoção de poeira e sujeira",
      "Redução de odores",
      "Contribui para a qualidade do ar",
    ],
    whatsappContext: "higienização do meu ar-condicionado",
  },
  {
    slug: "desinstalacao-e-reinstalacao",
    name: "Desinstalação e reinstalação",
    shortDescription:
      "Retirada e instalação do equipamento em outro ambiente ou imóvel.",
    icon: ArrowLeftRight,
    description: [
      "Vai se mudar ou precisa levar o ar-condicionado para outro cômodo? Cuidamos da retirada e da reinstalação com segurança.",
      "Avaliamos o novo local para garantir uma reinstalação correta e com bom acabamento.",
    ],
    highlights: [
      "Retirada cuidadosa do equipamento",
      "Reinstalação em outro ambiente ou imóvel",
      "Avaliação do novo local",
    ],
    whatsappContext: "desinstalação e reinstalação do meu ar-condicionado",
  },
  {
    slug: "infraestrutura-para-ar-condicionado",
    name: "Infraestrutura para ar-condicionado",
    shortDescription:
      "Preparação de tubulação, dreno, elétrica e demais estruturas necessárias para a instalação.",
    icon: Cable,
    description: [
      "Preparamos a estrutura necessária para receber o ar-condicionado, incluindo tubulação, dreno e parte elétrica.",
      "Ideal para obras, reformas ou ambientes que ainda não possuem a infraestrutura pronta para o equipamento.",
    ],
    highlights: [
      "Tubulação e dreno",
      "Parte elétrica para o equipamento",
      "Ideal para obras e reformas",
    ],
    whatsappContext: "infraestrutura para instalação de ar-condicionado",
  },
  {
    slug: "laudo-tecnico",
    name: "Laudo técnico",
    shortDescription:
      "Avaliação técnica do equipamento, com laudo para embasar decisões de manutenção, compra ou uso do ar-condicionado.",
    icon: ClipboardCheck,
    description: [
      "Realizamos a avaliação técnica do seu ar-condicionado e emitimos um laudo sobre as condições encontradas no equipamento.",
      "Útil para embasar decisões sobre manutenção, troca ou continuidade de uso, com um diagnóstico claro da situação atual.",
    ],
    highlights: [
      "Avaliação técnica detalhada",
      "Laudo sobre as condições do equipamento",
      "Apoio para decisões sobre manutenção ou troca",
    ],
    whatsappContext: "um laudo técnico do meu ar-condicionado",
  },
  {
    slug: "venda-de-insumos",
    name: "Venda de insumos",
    shortDescription:
      "Venda de insumos para instalação e refrigeração, incluindo peças utilizados na manutenção e reparo de ar-condicionado.",
    icon: PackageSearch,
    description: [
      "Além dos serviços de instalação e manutenção, também fornecemos insumos para instalação e refrigeração, incluindo peças necessárias para o funcionamento do seu ar-condicionado.",
      "Fale com nossa equipe informando o que você precisa para verificarmos a disponibilidade.",
    ],
    highlights: [
      "Insumos para instalação",
      "Insumos para refrigeração",
      "Consulte disponibilidade com nossa equipe",
    ],
    whatsappContext: "compra de insumos para instalação ou refrigeração",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
