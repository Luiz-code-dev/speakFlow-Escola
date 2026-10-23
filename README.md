# SpeakFlow Escolas — site institucional

Site institucional do **SpeakFlow Escolas**, plataforma de aprendizagem com inteligência artificial para redes municipais de ensino, desenvolvida pela [Codevelop Solutions](https://codevelop.com.br) (Salvador/BA).

**Produção:** https://speakflowescola.com.br

O site apresenta a plataforma a prefeitos, secretários de educação, coordenadores pedagógicos e equipes técnicas e jurídicas, e leva o visitante a **agendar uma demonstração**.

---

## Sumário

- [Stack](#stack)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como rodar localmente](#como-rodar-localmente)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Formulário de contato](#formulário-de-contato)
- [Demonstração interativa](#demonstração-interativa)
- [Acessibilidade e desempenho](#acessibilidade-e-desempenho)
- [SEO](#seo)
- [Domínio e deploy](#domínio-e-deploy)
- [Regras de conteúdo](#regras-de-conteúdo)

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Estilo | Tailwind CSS v4 + shadcn/ui |
| Animação | Framer Motion + canvas 2D (rede neural da abertura) |
| Ícones | lucide-react |
| Formulário | Server Action + Zod + Resend |
| Análise de acesso | Vercel Analytics (sem cookies) |

## Estrutura do projeto

```
app/
  actions/contact.ts     Server Action do formulário (Zod, honeypot, limite por IP, Resend)
  layout.tsx             Fontes, metadados, Open Graph e dados estruturados (JSON-LD)
  page.tsx               Página única com todas as seções
  privacidade/ termos/   Páginas legais (texto aguardando o jurídico)
  not-found.tsx          Página 404
  icon.svg apple-icon.tsx opengraph-image.tsx
  sitemap.ts robots.ts
components/
  site/                  Seções do site (hero, timeline, demo, contact...)
  ui/                    Componentes shadcn/ui
lib/
  site-data.ts           Todo o conteúdo textual (linha do tempo, demo, FAQ, papéis)
public/images/           Ilustrações dos cenários ilustrativos
```

O conteúdo fica centralizado em `lib/site-data.ts`, então revisões de texto não exigem mexer nos componentes.

## Como rodar localmente

Requisitos: Node.js 20+ e pnpm.

```bash
pnpm install
cp .env.example .env.local   # preencha os valores
pnpm dev                     # http://localhost:3000
```

Outros scripts:

```bash
pnpm build    # build de produção
pnpm start    # serve o build
pnpm lint
```

## Variáveis de ambiente

| Variável | Obrigatória | Uso |
| --- | --- | --- |
| `RESEND_API_KEY` | Sim | Chave da API Resend para enviar o e-mail do formulário. |
| `RESEND_FROM` | Sim | Remetente em um domínio verificado no Resend, ex.: `SpeakFlow Escolas <contato@speakflow.ia.br>`. |
| `B2B_NOTIFY_EMAIL` | Não | Caixa que recebe os pedidos. Padrão: `luiz.melo@cdsolutions.com.br`. |

As chaves **nunca** ficam no código. Configure-as em *Vercel → Project → Settings → Environment Variables*. Arquivos `.env*.local` estão no `.gitignore`.

> O site **não** usa `OPENAI_API_KEY`, `DATABASE_URL` nem `BACKEND_URL`. A demonstração é uma simulação com respostas pré-escritas, por decisão de produto: o site institucional não chama APIs de IA reais.

## Formulário de contato

Os botões "Agendar demonstração" levam para a âncora `#contato`. No envio:

1. **Validação** com Zod no servidor (nome, cargo, município/UF, e-mail, mensagem e consentimento obrigatórios; telefone e número de alunos opcionais).
2. **Antispam:** campo honeypot oculto + limite de 5 envios por IP a cada 10 minutos.
3. **Envio** pelo Resend, em HTML e texto, com `reply-to` apontando para o e-mail do visitante: basta responder o e-mail para falar com o contato.
4. **Privacidade:** não pede CPF nem dados de alunos; a caixa de consentimento vem desmarcada e aponta para `/privacidade`.

> O limite por IP fica em memória por instância serverless. Para um limite global, use Upstash Redis com `@upstash/ratelimit`.

## Demonstração interativa

A seção `#demonstracao` simula o retorno da IA para Inglês (fala), Português (escrita) e Matemática (raciocínio). Ela não faz nenhuma chamada de rede e mostra o selo **"Demonstração"**. Os textos estão em `lib/site-data.ts`.

## Acessibilidade e desempenho

- WCAG 2.1 AA: navegação por teclado, foco visível, link para pular ao conteúdo, contraste ≥ 4,5:1.
- `prefers-reduced-motion` desliga partículas, a rolagem horizontal fixa e as animações automáticas, mantendo o conteúdo.
- A linha do tempo é horizontal, guiada pela rolagem, só em telas com pelo menos 1024 × 760 px. Em celulares, tablets e notebooks baixos, ela é vertical para não cortar os cartões.
- O canvas é carregado sob demanda e pausa fora da tela ou com a aba oculta.
- Imagens com `next/image` e fonte Inter com `next/font`.
- Cabeçalhos de segurança em `next.config.mjs`: HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy` e `X-Frame-Options`.

## SEO

Metadados e Open Graph em `app/layout.tsx`, imagem OG gerada em `app/opengraph-image.tsx`, `sitemap.xml`, `robots.txt` e dados estruturados `Organization` e `SoftwareApplication`. O idioma é `pt-BR`. A URL canônica fica em `SITE_URL` (`lib/site-data.ts`).

## Domínio e deploy

Deploy na Vercel (branch `main` → produção).

Para usar **speakflowescola.com.br**:

1. Registre o domínio no [Registro.br](https://registro.br). Domínios `.com.br` exigem CPF ou CNPJ; use o CNPJ da Codevelop.
2. Na Vercel: *Project → Settings → Domains → Add* `speakflowescola.com.br` e `www.speakflowescola.com.br`.
3. No Registro.br, aponte os DNS para a Vercel (registro `A` para `76.76.21.21` e `CNAME` de `www` para `cname.vercel-dns.com`), ou troque os servidores DNS para `ns1.vercel-dns.com` e `ns2.vercel-dns.com`.
4. Opcional: verifique o domínio também no Resend para enviar como `contato@speakflowescola.com.br`.

## Regras de conteúdo

Não inventar estatísticas, depoimentos, clientes, logotipos de governo ou prêmios. Não mostrar preços nem mencionar "gratuito" ou "teste grátis". Não afirmar exclusividade; usar "reúne em uma só plataforma". Sem fotos de crianças reais e sem emojis.

---

© 2026 Codevelop Solutions · CNPJ 51.412.510/0001-07 · Salvador/BA
