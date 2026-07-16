"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks } from "./nav-links";
import { Button } from "@/components/ui/Button";
import { whatsAppUrlDefault } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || menuOpen
          ? "bg-white/95 shadow-md backdrop-blur"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Menu principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={clsx(
                "text-sm font-medium transition-colors hover:text-mac-sky-500",
                scrolled ? "text-mac-navy-700" : "text-white"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            href={whatsAppUrlDefault()}
            external
            size="sm"
            onClick={() => trackEvent("whatsapp_click", { location: "header" })}
          >
            Solicitar orçamento
          </Button>
        </div>

        <button
          type="button"
          className={clsx(
            "flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
            scrolled || menuOpen ? "text-mac-navy-800" : "text-white"
          )}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-mac-navy-100 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Menu mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-mac-navy-700 hover:bg-ice-100"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Button
            href={whatsAppUrlDefault()}
            external
            className="mt-4 w-full"
            onClick={() => {
              trackEvent("whatsapp_click", { location: "mobile_menu" });
              setMenuOpen(false);
            }}
          >
            Solicitar orçamento
          </Button>
        </div>
      )}
    </header>
  );
}
