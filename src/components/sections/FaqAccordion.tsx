"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import type { FaqItem } from "@/lib/faq";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto mt-10 max-w-3xl divide-y divide-mac-navy-100 rounded-2xl border border-mac-navy-100">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.id}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="text-sm font-semibold text-mac-navy-800 sm:text-base">
                {item.question}
              </span>
              <ChevronDown
                className={clsx(
                  "h-5 w-5 shrink-0 text-mac-sky-500 transition-transform",
                  isOpen && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm leading-relaxed text-slate-600">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
