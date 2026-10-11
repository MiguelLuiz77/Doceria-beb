# Mariah! Doce Bar

Site de apresentação e catálogo da Mariah! Doce Bar, em React + TypeScript + Vite.

## Rodar localmente

```bash
pnpm install
pnpm dev
```

## Checagens

```bash
pnpm lint
pnpm build
```

## Atualizar antes de publicar

- **WhatsApp:** preencha `whatsappNumber` em `src/config/business.ts` com o código do país e DDD, sem símbolos. Enquanto estiver vazio, o link abre o WhatsApp para escolher o destinatário.
- **Catálogo e preços:** atualize os produtos em `src/data/products.ts`. Os nomes, as descrições e os valores atuais são exemplos demonstrativos.
- **Contato:** preencha email, endereço e Instagram apenas quando os dados oficiais estiverem definidos em `src/config/business.ts`.
- **Fotos:** substitua as ilustrações SVG em `public/images/` pelas fotos aprovadas dos produtos quando estiverem disponíveis. `mariah-hero-poster.jpg` serve somente como poster/fallback da Hero.
- **Vídeo da Hero:** `public/videos/mariah-hero.mp4` toca em loop na Hero e não é controlado pela rolagem da página.

Os depoimentos no código são conteúdos de demonstração e devem ser substituídos por avaliações reais autorizadas antes da publicação.
