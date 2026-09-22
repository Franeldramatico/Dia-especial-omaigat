# Flores Amarillas para Aranxita 💛

Página web romántica de regalo: una entrega de flores amarillas interactiva para Aranxita, con carta de amor, música romántica, partículas doradas y una carta extra en PDF.

«Tú eres el rayo de sol más brillante de mi vida»

## Tecnologías

- [Angular 21](https://angular.dev) (standalone components, signals) + SSR con Express
- [Tailwind CSS 4](https://tailwindcss.com)
- [Angular Material](https://material.angular.io) (iconos)
- [Motion One](https://motion.dev) (animaciones)

## Características

- Dedicatoria animada de apertura
- Ramo de flores amarillas interactivo con floración animada (SVG generado por código)
- Pradera floral interactiva
- Partículas doradas y música romántica de fondo
- Carta de amor en pantalla y carta en PDF (`public/assets/carta-para-aranxita.pdf`) con visor integrado, apertura en pestaña nueva y descarga
- Botones de acceso al PDF en navegación, hero, sección de la carta y footer

## Requisitos

- Node.js 20+

## Como ejecutar

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo en el puerto 3000 |
| `npm run build` | Build de producción (client + SSR) |
| `npm run serve:ssr:app` | Servir el build SSR (puerto 4000) |
| `npm run lint` | Linter (ESLint) |
| `npm run test` | Tests (Vitest) |

## Estructura

```
src/app/
  app.ts / app.html          Página principal
  components/
    opening-greeting.ts      Dedicatoria de apertura
    golden-particles.ts      Partículas doradas
    interactive-flower-bouquet.ts   Ramo de flores interactivo
    interactive-floral-meadow.ts    Pradera floral
    blooming-flowers-code.ts        Floración animada por código
    love-letter-section.ts          Carta de amor en la página
    love-letter-modal.ts            Carta en modal
    pdf-viewer-modal.ts             Visor de la carta en PDF
    floating-music-player.ts        Reproductor de música
  services/romantic-audio.ts Reproducción de audio romántico
  utils/floral-art.ts        Generación de arte floral SVG
public/
  assets/carta-para-aranxita.pdf    La carta en PDF
  assets/images/                     Imágenes de flores
```
