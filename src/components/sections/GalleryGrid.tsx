"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, MessageCircle, X } from "lucide-react";
import type { PortfolioItem } from "@/lib/portfolio";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

function formatDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("pt-BR");
}

export function GalleryGrid({ items }: { items: PortfolioItem[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedItem = items.find((item) => item.id === selectedId);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
            className="overflow-hidden rounded-2xl border border-mac-navy-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
          >
            <button
              type="button"
              onClick={() => setSelectedId(item.id)}
              className="relative block aspect-video w-full bg-ice-100"
            >
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform hover:scale-[1.02]"
              />
            </button>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-mac-navy-800">{item.title}</h3>
              {item.description && (
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                  {item.description}
                </p>
              )}
              {item.service_date && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  {formatDate(item.service_date)}
                </p>
              )}
              <a
                href={buildWhatsAppUrl(
                  `Olá! Encontrei a Mac Climatização pelo site e vi o trabalho "${item.title}". Gostaria de solicitar um orçamento parecido.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("whatsapp_click", { location: "portfolio_card", item: item.title })
                }
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-mac-sky-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mac-sky-600"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Solicitar orçamento pelo WhatsApp
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-mac-navy-900/80 p-4"
            onClick={() => setSelectedId(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white"
            >
              <div className="flex items-center justify-between border-b border-mac-navy-100 p-4">
                <h3 className="text-sm font-semibold text-mac-navy-800">
                  {selectedItem.title}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  aria-label="Fechar"
                  className="rounded-full p-1 text-mac-navy-500 hover:bg-ice-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="relative aspect-video w-full">
                <Image
                  src={selectedItem.image_url}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                />
              </div>
              {selectedItem.description && (
                <p className="p-4 text-sm text-slate-600">{selectedItem.description}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
