// Avaliações reais de clientes vindas do Google.
// IMPORTANTE: não foi possível confirmar avaliações reais no momento da criação do site
// (o link do Google Perfil da Empresa não retornou conteúdo acessível).
// Substitua o array abaixo pelas avaliações reais copiadas do perfil do Google da empresa.
// Formato de cada avaliação:
// {
//   name: "Nome do cliente (como aparece no Google)",
//   rating: 5, // de 1 a 5, conforme a avaliação real
//   comment: "Texto exato do comentário do cliente.",
// }

export type Testimonial = {
  name: string;
  rating: number;
  comment: string;
};

export const testimonials: Testimonial[] = [];
