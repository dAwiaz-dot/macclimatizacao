"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { clsx } from "clsx";
import type { Product } from "@/lib/products";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function ProductsGrid({ products }: { products: Product[] }) {
  const categories = Array.from(new Set(products.map((p) => p.category))).sort();
  const [activeCategory, setActiveCategory] = useState<string | "todas">("todas");

  const filtered =
    activeCategory === "todas"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <div>
      {categories.length > 1 && (
        <div className="mb-10 flex flex-wrap justify-center gap-2">
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
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={clsx(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeCategory === category
                  ? "bg-mac-sky-500 text-white"
                  : "bg-white text-mac-navy-700 hover:bg-mac-sky-50"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
            className="overflow-hidden rounded-2xl border border-mac-navy-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-square w-full bg-ice-100">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <span className="inline-block rounded-full bg-mac-sky-50 px-3 py-1 text-xs font-semibold text-mac-sky-700">
                {product.category}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-mac-navy-800">
                {product.name}
              </h3>
              <a
                href={buildWhatsAppUrl(
                  `Olá! Encontrei a Mac Climatização pelo site e gostaria de solicitar um orçamento para o produto "${product.name}".`
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("whatsapp_click", { location: "product_card", product: product.name })
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
    </div>
  );
}
