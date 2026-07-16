import { AlertTriangle } from "lucide-react";

export function SupabaseSetupNotice() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ice-50 px-4">
      <div className="max-w-md rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <AlertTriangle className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="mt-4 text-lg font-bold text-mac-navy-800">
          Supabase ainda não configurado
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Defina <code className="rounded bg-white px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
          e <code className="rounded bg-white px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
          no seu <code className="rounded bg-white px-1.5 py-0.5">.env.local</code> para acessar o
          painel administrativo. Veja o passo a passo na seção &ldquo;Painel administrativo&rdquo;
          do README do projeto.
        </p>
      </div>
    </div>
  );
}
