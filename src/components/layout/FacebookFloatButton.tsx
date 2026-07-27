"use client";

import { Facebook } from "lucide-react";
import { company } from "@/data/company";
import { trackEvent } from "@/lib/analytics";
import { useHideOnFooter } from "@/hooks/useHideOnFooter";

export function FacebookFloatButton() {
  const hidden = useHideOnFooter();

  return (
    <a
      href={company.facebookUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("facebook_click", { location: "floating_button" })}
      aria-label="Seguir a Mac Climatização no Facebook"
      className={`fixed bottom-52 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-xl shadow-black/20 transition-all duration-200 hover:scale-105 sm:bottom-40 sm:right-6 ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      }`}
    >
      <Facebook className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
