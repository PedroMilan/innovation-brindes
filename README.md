# Innovation Brindes -- Teste Frontend

Aplicação desenvolvida com **Next.js (App Router)**, **TypeScript**,
**TailwindCSS**, **Zustand**, **React Query** e **Axios (com
interceptors)**.

---

# 🚀 Como rodar a aplicação com Docker

## 1️⃣ Build da imagem

```bash
docker build -t innovation-brindes-app .
```

## 2️⃣ Rodar o container

```bash
docker run -p 3000:3000   -e NEXT_PUBLIC_API_URL=https://apihomolog.innovationbrindes.com.br/api/innova-dinamica   innovation-brindes-app
```

A aplicação ficará disponível em:

http://localhost:3000

---

# 🛠 Stack Utilizada

- Next.js (App Router)
- TypeScript
- TailwindCSS
- Zustand (State Management)
- React Query (Data Fetching + Cache)
- Axios com Interceptors
- Radix Dialog (Modal Acessível)
- Middleware para proteção de rotas
- Docker (Multi-stage build)

---

# 🔐 Autenticação

- Login via `POST /login/acessar`
- Token salvo em:
  - `localStorage` (necessário para o interceptor)
  - `cookie` (necessário para o middleware)
- Interceptor adiciona automaticamente: Authorization: Bearer
  `<token>`{=html}
- Em caso de `401`, o usuário é redirecionado para `/login`

---

# 📦 Funcionalidades Implementadas

✔ Login com "manter logado"\
✔ Rota protegida com Middleware\
✔ Listagem de produtos\
✔ Busca com debounce (POST)\
✔ Ordenação local (nome e preço)\
✔ Infinite scroll (client-side)\
✔ Favoritos persistidos no localStorage\
✔ Quick View em modal acessível\
✔ Tratamento de erro + retry\
✔ Skeleton loading\
✔ SEO básico (title + description)

---

# 🧠 Decisões Técnicas

## Middleware + Cookie

O Middleware do Next.js não possui acesso ao localStorage.\
Por isso o token também é salvo em cookie para permitir proteção de rota
no edge.

## Infinite Scroll Client-side

A API não fornece paginação.\
Foi adotada estratégia de: - Buscar todos os produtos - Paginar em
memória por lotes - IntersectionObserver para carregar mais

## Zustand

Escolhido por: - Simplicidade - Performance - Evitar re-renderizações
desnecessárias - Persistência facilitada

## React Query

Utilizado para: - Cache inteligente - Controle de loading - Retry
controlado - Separação clara da camada de dados

## Modal com Radix

Garantia de: - Focus trap - ESC para fechar - Aria attributes -
Acessibilidade adequada

---

# ⚠ Pendências / Melhorias Futuras

- Paginação real caso API evolua
- Testes automatizados (Jest + RTL)
- Error Boundary global personalizada
- Validação de schema no login
- Melhoria no carregamento incremental do infinite scroll
- Ajustes finos para atingir 100% no Lighthouse

---

# 📊 Lighthouse (Desktop)

Executado em modo produção.

Resultado médio obtido:

- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 100

Adicionar screenshot em: docs/lighthouse-desktop.png

---

# 🎥 Demonstração do Fluxo

Fluxo demonstrado:

1.  Login
2.  Redirecionamento para produtos
3.  Busca com debounce
4.  Favoritar produto
5.  Quick View
6.  Logout

Adicionar GIF ou MP4 curto em: docs/demo-flow.mp4

---

# 🧪 Rodando sem Docker

```bash
yarn
yarn dev
```

Criar `.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://apihomolog.innovationbrindes.com.br/api/innova-dinamica
```

---

# 📌 Considerações Finais

Projeto estruturado com foco em boas práticas modernas do ecossistema
React, organização por domínio e escalabilidade futura.
# innovation-brindes
