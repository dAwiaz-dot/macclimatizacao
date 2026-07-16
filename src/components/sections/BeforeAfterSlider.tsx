"use client";

import { useRef, useState } from "react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

type Props = {
  beforeLabel: string;
  afterLabel: string;
};

export function BeforeAfterSlider({ beforeLabel, afterLabel }: Props) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  function updateFromClientX(clientX: number) {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, ratio)));
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full select-none overflow-hidden rounded-2xl"
      onMouseMove={(e) => {
        if (e.buttons === 1) updateFromClientX(e.clientX);
      }}
      onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
    >
      <div className="absolute inset-0">
        <PlaceholderImage label={afterLabel} className="h-full w-full" />
      </div>

      <div
        className="absolute inset-y-0 left-0 h-full overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <div className="absolute inset-y-0 left-0 h-full w-[--slider-w]" style={{ ["--slider-w" as string]: `${containerRef.current?.offsetWidth ?? 0}px` }}>
          <PlaceholderImage label={beforeLabel} className="h-full w-full" />
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label="Controle deslizante de comparação antes e depois"
        className="absolute inset-x-0 bottom-3 mx-auto w-[90%] accent-mac-sky-500"
      />

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-lg"
        style={{ left: `${position}%` }}
      />
    </div>
  );
}
