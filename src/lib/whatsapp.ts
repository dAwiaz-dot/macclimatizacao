import { company } from "@/data/company";

export function buildWhatsAppUrl(message: string, phoneNumber?: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber ?? company.whatsappNumber}?text=${encoded}`;
}

export const defaultWhatsAppMessage =
  "Olá! Encontrei a MAC Climatização pelo site e gostaria de solicitar um orçamento.";

export function whatsAppUrlForService(serviceContext: string): string {
  return buildWhatsAppUrl(
    `Olá! Encontrei a MAC Climatização pelo site e gostaria de solicitar um orçamento para ${serviceContext}.`
  );
}

export function whatsAppUrlDefault(): string {
  return buildWhatsAppUrl(defaultWhatsAppMessage);
}
