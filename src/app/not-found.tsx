import type { Metadata } from "next";
import { Snowflake } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { whatsAppUrlDefault } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center bg-airflow-gradient py-24">
      <Container className="text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white">
          <Snowflake className="h-8 w-8" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-4xl font-bold text-white">
          Página não encontrada
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ice-100/90">
          A página que você tentou acessar não existe ou foi movida. Que tal
          voltar para o início ou falar com nossa equipe?
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/" variant="secondary">
            Voltar ao início
          </Button>
          <Button href={whatsAppUrlDefault()} external>
            Falar no WhatsApp
          </Button>
        </div>
      </Container>
    </div>
  );
}
