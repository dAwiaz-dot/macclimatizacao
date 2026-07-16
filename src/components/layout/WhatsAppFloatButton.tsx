"use client";

import { MessageCircle } from "lucide-react";
import { whatsAppUrlDefault } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function WhatsAppFloatButton() {
  return (
    <a
      href={whatsAppUrlDefault()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { location: "floating_button" })}
      aria-label="Falar com a MAC Climatização no WhatsApp"
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-7 w-7" fill="white" aria-hidden="true" />
    </a>
  );
}
