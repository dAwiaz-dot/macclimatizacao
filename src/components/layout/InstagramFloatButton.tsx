"use client";

import { Instagram } from "lucide-react";
import { company } from "@/data/company";
import { trackEvent } from "@/lib/analytics";
import { useHideOnFooter } from "@/hooks/useHideOnFooter";

export function InstagramFloatButton() {
  const hidden = useHideOnFooter();

  return (
    <a
      href={company.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("instagram_click", { location: "floating_button" })}
      aria-label="Seguir a Mac Climatização no Instagram"
      className={`fixed bottom-36 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#FEDA75] via-[#D62976] to-[#4F5BD5] text-white shadow-xl shadow-black/20 transition-all duration-200 hover:scale-105 sm:bottom-24 sm:right-6 ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      }`}
    >
      <Instagram className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
