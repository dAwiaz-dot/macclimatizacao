import Link from "next/link";
import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { whatsAppUrlDefault } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-mac-navy-800 text-ice-100">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ice-100/80">
            Soluções de climatização para casas, comércios e empresas em Alfenas
            e região: venda, instalação, manutenção, reparo e higienização de
            ar-condicionado.
          </p>
          <div className="mt-6 flex flex-col gap-3 text-sm">
            <a
              href={whatsAppUrlDefault()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-mac-sky-300"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp: {company.whatsappDisplay}
            </a>
            <a
              href={`tel:+${company.whatsappNumber}`}
              className="flex items-center gap-2 hover:text-mac-sky-300"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Telefone: {company.phoneDisplay}
            </a>
            <a
              href={company.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-mac-sky-300"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
              {company.instagramHandle}
            </a>
            <span className="flex items-start gap-2 text-ice-100/80">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {company.address.street} – {company.address.neighborhood},{" "}
              {company.address.city}/{company.address.state}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ice-100/60">
            Serviços
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/servicos/${service.slug}`}
                  className="hover:text-mac-sky-300"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ice-100/60">
            Links rápidos
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/sobre" className="hover:text-mac-sky-300">
                Sobre a Mac Climatização
              </Link>
            </li>
            <li>
              <Link href="/trabalhos-realizados" className="hover:text-mac-sky-300">
                Trabalhos realizados
              </Link>
            </li>
            <li>
              <Link href="/contato" className="hover:text-mac-sky-300">
                Contato
              </Link>
            </li>
            <li>
              <Link
                href="/politica-de-privacidade"
                className="hover:text-mac-sky-300"
              >
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="/termos-de-uso" className="hover:text-mac-sky-300">
                Termos de Uso
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-2 px-4 text-center text-xs text-ice-100/60 sm:px-6 lg:px-8">
          <p>
            © {year} Mac Climatização. Todos os direitos reservados.
          </p>
          <p>Atendimento em Alfenas e região, Minas Gerais.</p>
        </div>
      </div>
    </footer>
  );
}
