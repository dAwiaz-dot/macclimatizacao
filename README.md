# Site Mac Climatização

Site institucional e landing page de conversão para a **Mac Climatização**,
empresa de climatização e ar-condicionado que atende Alfenas e região (MG).

Construído com Next.js (App Router), React, TypeScript, Tailwind CSS,
Framer Motion, Lucide Icons e Supabase (autenticação, banco de dados e
armazenamento de imagens) para o painel administrativo.

---

## Painel administrativo (`/admin`)

O site tem um painel administrativo simples para o cliente gerenciar, sem
precisar mexer em código:

- **Produtos** — catálogo de equipamentos à venda (nome, categoria e
  imagem, sem preços), exibido automaticamente na seção "Produtos" da
  landing page.
- **Trabalhos realizados** — portfólio de serviços (foto, título, breve
  descrição e data opcional), exibido automaticamente na seção "Trabalhos
  realizados".

Cada produto e cada trabalho realizado tem um botão "Solicitar orçamento
pelo WhatsApp" com mensagem pré-preenchida mencionando o item.

Não há carrinho, preços ou pagamento — o painel serve apenas para manter
fotos e textos atualizados.

### Configurando o Supabase (necessário para o painel funcionar)

1. Crie uma conta gratuita em [supabase.com](https://supabase.com) e crie um
   novo projeto.
2. No painel do projeto, vá em **Project Settings → API** e copie a
   **Project URL** e a chave **anon public**.
3. Cole esses valores no seu `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
4. Vá em **SQL Editor**, cole o conteúdo do arquivo
   `supabase/migrations/0001_init.sql` deste projeto e clique em **Run**.
   Isso cria as tabelas `products` e `portfolio_items`, as políticas de
   segurança (RLS) e o bucket de armazenamento público `site-uploads` para
   as imagens.
5. Crie o usuário administrador: vá em **Authentication → Users → Add
   user**, informe um e-mail e senha (marque "Auto Confirm User"). Esse
   será o login usado em `/admin/login`. Não existe tela pública de
   cadastro — apenas esse usuário criado manualmente tem acesso.
6. Rode o projeto (`npm run dev`) e acesse `http://localhost:3000/admin`
   para entrar no painel.

Sem essas variáveis configuradas, o site público continua funcionando
normalmente — as seções de Produtos e Trabalhos Realizados apenas ficam
vazias, e o painel `/admin` não consegue autenticar.

---

## ⚠️ Aviso importante sobre os dados usados

Na primeira tentativa, não foi possível acessar o conteúdo real do Instagram
(`@macclimatizacao_arcondicionado`) nem do link do Google Perfil da Empresa
(o Instagram exige JavaScript/login; o link do Google retornou apenas uma
página de suporte). Numa tentativa posterior, consegui acessar o Instagram
via navegador headless e confirmar dados reais direto das publicações:

- **Logotipo real** da empresa (`public/images/logo/mac-climatizacao-logo.jpg`,
  também usado como favicon).
- **Endereço confirmado**: Avenida Henrique Munhoz Garcia, 374 – Morada do
  Sol, Alfenas/MG.
- **WhatsApp confirmado nas publicações**: (35) 99957-4681, definido como o
  número principal usado em todos os botões do site.
- **Dois serviços adicionais** mencionados nas publicações: Laudo técnico e
  Venda de insumos.

O que ainda **não foi possível confirmar** (avaliações reais do Google e
fotos reais dos serviços) continua como placeholder/foto ilustrativa
claramente identificada, pronta para ser substituída — ver a seção
[Substituindo dados reais](#substituindo-dados-reais-e-imagens). As fotos
atualmente no site (Hero, Sobre, Trabalhos Realizados) são de banco de
imagens gratuito (Pexels), usadas apenas como demonstração visual para a
empresa, com o selo "Foto ilustrativa" em cada uma.

---

## Requisitos

- Node.js 18.18 ou superior (recomendado 20+)
- npm 9+

## Instalação

```bash
npm install
cp .env.example .env.local
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts disponíveis

| Comando            | Descrição                                  |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Inicia o servidor de desenvolvimento        |
| `npm run build`     | Gera o build de produção                    |
| `npm run start`     | Inicia o servidor com o build de produção   |
| `npm run lint`      | Roda o ESLint                               |
| `npm run typecheck` | Roda a verificação de tipos do TypeScript   |

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha conforme necessário:

- `NEXT_PUBLIC_SITE_URL` — URL pública do site (usada em metadados, sitemap e dados estruturados).
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — número de WhatsApp no formato internacional (já preenchido com `5535999574681`).
- `NEXT_PUBLIC_GA_ID` — Measurement ID do Google Analytics 4 (opcional).
- `NEXT_PUBLIC_GTM_ID` — ID do container do Google Tag Manager (opcional).
- `NEXT_PUBLIC_META_PIXEL_ID` — ID do Meta Pixel (opcional).
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` — código de verificação do Google Search Console (opcional).

Os scripts de analytics só são carregados quando os respectivos IDs são
preenchidos — sem eles, nenhum script de terceiros roda no site.

## Estrutura de pastas

```
src/
  app/                    Rotas (App Router)
    page.tsx              Página inicial
    servicos/              Lista de serviços
      [slug]/page.tsx      Página individual de cada serviço
    sobre/                Página "Sobre"
    trabalhos-realizados/ Portfólio de trabalhos (dinâmico, via Supabase)
    contato/              Contato + formulário
    politica-de-privacidade/
    termos-de-uso/
    admin/                Painel administrativo
      login/               Tela de login (pública)
      (dashboard)/         Área protegida: início, produtos, portfólio
    not-found.tsx          Página 404 personalizada
    sitemap.ts / robots.ts SEO técnico
    icon.png               Favicon gerado a partir da logo
  components/
    layout/                Header, Footer, menu mobile, WhatsApp flutuante, CTA fixo mobile
    sections/               Todas as seções da home (Hero, Serviços, Produtos, FAQ, etc.)
    ui/                     Componentes reutilizáveis (Button, Container, PlaceholderImage...)
    admin/                  Componentes do painel administrativo
    analytics/              Scripts de GA4 / GTM / Meta Pixel
  data/                     Dados fixos (empresa, serviços, FAQ, depoimentos)
  lib/                      Utilitários (WhatsApp, analytics, schema.org, produtos/portfólio)
    supabase/               Clientes Supabase (browser, server, middleware, storage)
  middleware.ts             Protege as rotas /admin e renova a sessão do Supabase
public/
  images/                   Pasta para fotos reais (ver README dentro da pasta)
supabase/
  migrations/               SQL para criar tabelas, RLS e bucket de imagens
```

## Substituindo dados reais e imagens

### 1. Fotos

Adicione as fotos reais em `public/images/` (veja `public/images/README.md`
para a organização de pastas) e troque o componente `<PlaceholderImage />`
pelo componente `<Image />` do Next.js nos seguintes arquivos:

- Hero: `src/components/sections/Hero.tsx`
- Sobre: `src/components/sections/About.tsx`
- Antes/depois: `src/components/sections/BeforeAfterSlider.tsx`

As fotos de **Produtos** e **Trabalhos realizados** não ficam mais em
arquivos do projeto — são cadastradas pelo cliente diretamente no painel
`/admin` (ver seção [Painel administrativo](#painel-administrativo-admin)).

### 2. Endereço e horário de atendimento

Preencha os campos `address` e `businessHours` em `src/data/company.ts`
assim que forem confirmados publicamente (Google Perfil da Empresa).

### 3. Avaliações reais do Google

Copie as avaliações reais (nome, nota e comentário) para o array em
`src/data/testimonials.ts`, seguindo o formato de exemplo já documentado no
próprio arquivo.

### 4. Cidades atendidas

A lista de cidades confirmadas está em `citiesServed`, dentro de
`src/data/company.ts`. Adicione novas cidades somente quando confirmadas.

## WhatsApp

Todos os botões de WhatsApp usam o número `5535999574681` e geram mensagens
automáticas contextuais (diferentes para cada serviço, diagnóstico rápido ou
formulário de orçamento). A lógica está centralizada em `src/lib/whatsapp.ts`.

## Formulário de orçamento

O formulário em `src/components/sections/QuoteForm.tsx` não depende de
backend: ao ser enviado, monta uma mensagem organizada com os dados
preenchidos e abre o WhatsApp da empresa em uma nova aba.

## SEO

- Metadados (title/description/Open Graph) configurados em
  `src/app/layout.tsx` e por página.
- Dados estruturados **LocalBusiness**, **Service** e **FAQPage** (schema.org)
  gerados em `src/lib/schema.ts` e injetados no layout raiz e na home.
- `sitemap.xml` e `robots.txt` gerados automaticamente
  (`src/app/sitemap.ts` e `src/app/robots.ts`).
- URLs amigáveis para todas as páginas e serviços.

## Integrações preparadas

- Google Analytics 4, Google Tag Manager e Meta Pixel — ver
  `src/components/analytics/AnalyticsScripts.tsx` e as variáveis de ambiente.
- Eventos de rastreamento já implementados via `src/lib/analytics.ts`:
  `whatsapp_click`, `phone_click`, `quote_request`, `service_view`,
  `map_open`, `form_submit`.
- Google Search Console: preencha `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.

## Notas sobre dependências

O projeto usa Next.js `14.2.35` (última versão estável da série 14, com as
correções de segurança conhecidas até o momento). O `npm audit` ainda pode
reportar avisos adicionais associados a versões mais recentes do Next.js
(15/16), que trazem mudanças de API (ex.: `params`/`cookies()` assíncronos) e
exigiriam uma migração maior, fora do escopo deste projeto inicial. Antes de
publicar em produção, revise `npm audit` e considere planejar essa migração.

## Deploy

O projeto está pronto para deploy em qualquer plataforma compatível com
Next.js (Vercel, Netlify, servidor Node próprio, etc.). Basta configurar as
variáveis de ambiente de produção e rodar `npm run build && npm run start`
(ou o processo equivalente da plataforma escolhida).
