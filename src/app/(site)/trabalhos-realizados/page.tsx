import type { Metadata } from "next";
import { Gallery } from "@/components/sections/Gallery";
import { BeforeAfter } from "@/components/sections/BeforeAfter";

export const metadata: Metadata = {
  title: "Trabalhos Realizados",
  description:
    "Confira os trabalhos de instalação, manutenção e higienização de ar-condicionado realizados pela Mac Climatização em Alfenas e região.",
  alternates: { canonical: "/trabalhos-realizados" },
};

export const revalidate = 3600;

export default function TrabalhosRealizadosPage() {
  return (
    <div className="pt-16">
      <Gallery />
      <BeforeAfter />
    </div>
  );
}
