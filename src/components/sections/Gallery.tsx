"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { clsx } from "clsx";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import {
  galleryCategories,
  galleryItems,
  type GalleryCategory,
} from "@/data/gallery";

function GalleryThumb({
  src,
  caption,
  className,
  isDemo,
}: {
  src: string | null;
  caption: string;
  className: string;
  isDemo?: boolean;
}) {
  if (src) {
    return (
      <div className={clsx("relative overflow-hidden", className)}>
        <Image src={src} alt={caption} fill className="object-cover" />
        {isDemo && (
          <span className="absolute bottom-2 right-2 rounded-full bg-mac-navy-900/80 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">
            Foto ilustrativa
          </span>
        )}
      </div>
    );
  }
  return <PlaceholderImage label={caption} className={className} />;
}

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "todas">(
    "todas"
  );
  const [selected, setSelected] = useState<string | null>(null);

  const filteredItems =
    activeCategory === "todas"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const selectedItem = galleryItems.find((item) => item.id === selected);

  return (
    <section id="trabalhos" className="bg-ice-gradient py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Trabalhos realizados"
          title="Serviços entregues com cuidado e atenção"
          description="Uma amostra dos nossos atendimentos em Alfenas e região. Fotos reais serão adicionadas conforme disponibilidade."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("todas")}
            className={clsx(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === "todas"
                ? "bg-mac-sky-500 text-white"
                : "bg-white text-mac-navy-700 hover:bg-mac-sky-50"
            )}
          >
            Todas
          </button>
          {galleryCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={clsx(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeCategory === category.id
                  ? "bg-mac-sky-500 text-white"
                  : "bg-white text-mac-navy-700 hover:bg-mac-sky-50"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredItems.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setSelected(item.id)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
              className="group text-left"
            >
              <GalleryThumb
                src={item.src}
                caption={item.caption}
                isDemo={item.isDemo}
                className="aspect-square w-full rounded-xl transition-transform group-hover:scale-[1.02]"
              />
              <p className="mt-2 truncate text-xs font-medium text-mac-navy-600">
                {item.caption}
              </p>
            </motion.button>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-mac-navy-900/80 p-4"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.caption}
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
                  {selectedItem.caption}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Fechar"
                  className="rounded-full p-1 text-mac-navy-500 hover:bg-ice-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <GalleryThumb
                src={selectedItem.src}
                caption={selectedItem.caption}
                isDemo={selectedItem.isDemo}
                className="aspect-video w-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
