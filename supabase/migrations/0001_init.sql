-- Painel administrativo: catálogo de produtos e portfólio de trabalhos realizados.
-- Rode este arquivo no SQL Editor do seu projeto Supabase (ou via Supabase CLI:
-- `supabase db push`) para criar as tabelas, políticas de segurança (RLS) e o
-- bucket de armazenamento de imagens.

-- Extensão necessária para gerar UUIDs.
create extension if not exists "pgcrypto";

-- =========================================================
-- Tabela: products (catálogo de equipamentos à venda)
-- =========================================================
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  image_url text not null,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

-- Qualquer visitante do site pode ler os produtos (exibidos na landing page).
create policy "Produtos são públicos para leitura"
  on public.products
  for select
  to anon, authenticated
  using (true);

-- Somente usuários autenticados (o admin) podem criar, editar ou excluir.
create policy "Somente autenticados podem inserir produtos"
  on public.products
  for insert
  to authenticated
  with check (true);

create policy "Somente autenticados podem atualizar produtos"
  on public.products
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Somente autenticados podem excluir produtos"
  on public.products
  for delete
  to authenticated
  using (true);

-- =========================================================
-- Tabela: portfolio_items (trabalhos realizados)
-- =========================================================
create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  service_date date,
  image_url text not null,
  created_at timestamptz not null default now()
);

alter table public.portfolio_items enable row level security;

create policy "Portfólio é público para leitura"
  on public.portfolio_items
  for select
  to anon, authenticated
  using (true);

create policy "Somente autenticados podem inserir itens de portfólio"
  on public.portfolio_items
  for insert
  to authenticated
  with check (true);

create policy "Somente autenticados podem atualizar itens de portfólio"
  on public.portfolio_items
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Somente autenticados podem excluir itens de portfólio"
  on public.portfolio_items
  for delete
  to authenticated
  using (true);

-- Índices para ordenar por data de criação/serviço com eficiência.
create index if not exists products_created_at_idx on public.products (created_at desc);
create index if not exists portfolio_items_created_at_idx on public.portfolio_items (created_at desc);
create index if not exists portfolio_items_service_date_idx on public.portfolio_items (service_date desc);

-- =========================================================
-- Storage: bucket público para as imagens de produtos e portfólio
-- =========================================================
insert into storage.buckets (id, name, public)
values ('site-uploads', 'site-uploads', true)
on conflict (id) do nothing;

create policy "Leitura pública das imagens do site"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'site-uploads');

create policy "Somente autenticados podem enviar imagens"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'site-uploads');

create policy "Somente autenticados podem atualizar imagens"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'site-uploads')
  with check (bucket_id = 'site-uploads');

create policy "Somente autenticados podem excluir imagens"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'site-uploads');
