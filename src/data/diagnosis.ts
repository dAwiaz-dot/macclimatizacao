export type DiagnosisOption = {
  id: string;
  label: string;
  whatsappMessage: string;
};

export const diagnosisOptions: DiagnosisOption[] = [
  {
    id: "nao-gelando",
    label: "Não está gelando",
    whatsappMessage:
      "Olá, encontrei a Mac Climatização pelo site. Meu ar-condicionado não está gelando e gostaria de solicitar uma avaliação.",
  },
  {
    id: "pingando",
    label: "Está pingando",
    whatsappMessage:
      "Olá, encontrei a Mac Climatização pelo site. Meu ar-condicionado está pingando e gostaria de solicitar uma avaliação.",
  },
  {
    id: "barulho",
    label: "Está fazendo barulho",
    whatsappMessage:
      "Olá, encontrei a Mac Climatização pelo site. Meu ar-condicionado está fazendo barulho e gostaria de solicitar uma avaliação.",
  },
  {
    id: "mau-cheiro",
    label: "Está com mau cheiro",
    whatsappMessage:
      "Olá, encontrei a Mac Climatização pelo site. Meu ar-condicionado está com mau cheiro e gostaria de solicitar uma avaliação.",
  },
  {
    id: "limpeza",
    label: "Precisa de limpeza",
    whatsappMessage:
      "Olá, encontrei a Mac Climatização pelo site e gostaria de solicitar uma limpeza/higienização do meu ar-condicionado.",
  },
  {
    id: "instalar",
    label: "Quero instalar um aparelho",
    whatsappMessage:
      "Olá, encontrei a Mac Climatização pelo site e gostaria de solicitar um orçamento para instalação de ar-condicionado.",
  },
  {
    id: "comprar",
    label: "Quero comprar um equipamento",
    whatsappMessage:
      "Olá, encontrei a Mac Climatização pelo site e gostaria de saber mais sobre a compra de um ar-condicionado.",
  },
  {
    id: "outro",
    label: "Outro problema",
    whatsappMessage:
      "Olá, encontrei a Mac Climatização pelo site. Meu ar-condicionado está com um problema e gostaria de solicitar uma avaliação.",
  },
];
