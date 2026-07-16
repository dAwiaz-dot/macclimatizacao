"use client";

import { whatsAppUrlDefault } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-mac-navy-100 bg-white/95 p-3 backdrop-blur sm:hidden">
      <a
        href={whatsAppUrlDefault()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_click", { location: "mobile_fixed_cta" })}
        className="flex w-full items-center justify-center rounded-full bg-mac-sky-500 py-3 text-sm font-semibold text-white shadow-lg shadow-mac-sky-500/30"
      >
        Solicitar orçamento
      </a>
    </div>
  );
}
