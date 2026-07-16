# Imagens do site

Coloque aqui as fotografias reais da MAC Climatização, organizadas por pasta:

- `hero/` — foto principal usada na seção inicial (instalação, manutenção ou higienização).
- `sobre/` — foto da equipe ou de um profissional em atendimento.
- `trabalhos/` — fotos da galeria de trabalhos realizados (instalações, manutenções, higienizações, atendimentos residenciais e comerciais).

Depois de adicionar uma imagem, atualize o arquivo de dados correspondente:

- Hero: `src/components/sections/Hero.tsx` — substitua o `<PlaceholderImage />` por `<Image src="/images/hero/arquivo.jpg" ... />`.
- Sobre: `src/components/sections/About.tsx`.
- Galeria: `src/data/gallery.ts` — defina `src: "/images/trabalhos/arquivo.jpg"` no item correspondente.

Use imagens em `.jpg` ou `.webp`, idealmente com pelo menos 1200px de largura, para boa qualidade sem prejudicar o carregamento.
