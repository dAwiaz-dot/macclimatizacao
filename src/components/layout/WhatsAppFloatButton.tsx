"use client";

import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsAppUrlDefault } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { useHideOnFooter } from "@/hooks/useHideOnFooter";

export function WhatsAppFloatButton() {
  const hidden = useHideOnFooter();

  return (
    <a
      href={whatsAppUrlDefault()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { location: "floating_button" })}
      aria-label="Falar com a Mac Climatização no WhatsApp"
      className={`fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 transition-all duration-200 hover:scale-105 sm:bottom-6 sm:right-6 ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      }`}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
