# Site Mac Climatização

Site institucional e landing page de conversão para a **Mac Climatização**,
empresa de climatização e ar-condicionado que atende Alfenas e região (MG).

Construído com Next.js (App Router), React, TypeScript, Tailwind CSS,
Framer Motion e Lucide Icons.

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
- **Segundo WhatsApp**: (35) 99957-4681, além do (35) 98827-3068 informado
  originalmente.
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
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — número de WhatsApp no formato internacional (já preenchido com `5535988273068`).
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
    trabalhos-realizados/ Galeria de trabalhos
    contato/              Contato + formulário
    politica-de-privacidade/
    termos-de-uso/
    not-found.tsx          Página 404 personalizada
    sitemap.ts / robots.ts SEO técnico
    icon.tsx               Favicon gerado
  components/
    layout/                Header, Footer, menu mobile, WhatsApp flutuante, CTA fixo mobile
    sections/               Todas as seções da home (Hero, Serviços, FAQ, etc.)
    ui/                     Componentes reutilizáveis (Button, Container, PlaceholderImage...)
    analytics/              Scripts de GA4 / GTM / Meta Pixel
  data/                     Fonte única de dados (empresa, serviços, FAQ, galeria, depoimentos)
  lib/                      Utilitários (WhatsApp, analytics, schema.org)
public/
  images/                   Pasta para fotos reais (ver README dentro da pasta)
```

## Substituindo dados reais e imagens

### 1. Fotos

Adicione as fotos reais em `public/images/` (veja `public/images/README.md`
para a organização de pastas) e troque o componente `<PlaceholderImage />`
pelo componente `<Image />` do Next.js nos seguintes arquivos:

- Hero: `src/components/sections/Hero.tsx`
- Sobre: `src/components/sections/About.tsx`
- Galeria: defina o campo `src` de cada item em `src/data/gallery.ts` — o
  componente já troca automaticamente o placeholder pela foto real quando
  `src` deixa de ser `null`.
- Antes/depois: `src/components/sections/BeforeAfterSlider.tsx`

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

Todos os botões de WhatsApp usam o número `5535988273068` e geram mensagens
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
