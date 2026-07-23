// Camada fina de rastreamento de eventos, preparada para Google Analytics (GA4),
// Google Tag Manager e Meta Pixel. Os scripts reais só são carregados quando os
// respectivos IDs são definidos nas variáveis de ambiente (ver .env.example).

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEventName =
  | "whatsapp_click"
  | "instagram_click"
  | "phone_click"
  | "quote_request"
  | "service_view"
  | "map_open"
  | "form_submit";

export function trackEvent(
  name: AnalyticsEventName,
  params: Record<string, string | number | boolean | undefined> = {}
) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });

  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", name, params);
  }
}
