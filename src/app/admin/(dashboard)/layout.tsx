import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import {
  LayoutDashboard,
  LogOut,
  Package,
  Images,
  ExternalLink,
  Tags,
  FileText,
  Wrench,
  MessageSquareQuote,
  HelpCircle,
} from "lucide-react";
import { signOutAction } from "@/lib/admin/auth-actions";
import { isAuthConfigured } from "@/lib/admin/env";
import { isValidSessionToken, SESSION_COOKIE } from "@/lib/admin/session";
import { AdminSetupNotice } from "@/components/admin/AdminSetupNotice";
import { Logo } from "@/components/layout/Logo";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/admin", label: "Início", icon: LayoutDashboard },
  { href: "/admin/conteudo", label: "Conteúdo do site", icon: FileText },
  { href: "/admin/produtos", label: "Produtos", icon: Package },
  { href: "/admin/categorias", label: "Categorias", icon: Tags },
  { href: "/admin/servicos", label: "Serviços", icon: Wrench },
  { href: "/admin/portfolio", label: "Trabalhos realizados", icon: Images },
  { href: "/admin/depoimentos", label: "Depoimentos", icon: MessageSquareQuote },
  { href: "/admin/faq", label: "Perguntas frequentes", icon: HelpCircle },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isAuthConfigured) {
    return <AdminSetupNotice />;
  }

  const token = cookies().get(SESSION_COOKIE)?.value;
  const authenticated = await isValidSessionToken(token);

  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-ice-50">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="flex flex-col justify-between border-b border-mac-navy-100 bg-mac-navy-800 p-6 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
          <div>
            <div className="mb-8">
              <Logo />
              <p className="mt-2 text-xs text-ice-100/60">Painel administrativo</p>
            </div>
            <nav className="flex flex-row gap-2 lg:flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ice-100/90 hover:bg-white/10"
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-8 space-y-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 text-xs font-medium text-ice-100/70 hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              Ver site publicado
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Sair
              </button>
            </form>
          </div>
        </aside>

        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
