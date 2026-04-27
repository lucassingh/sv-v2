# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Contexto Global del Proyecto

## Stack Tecnológico

- **Next.js** con App Router (versión en `package.json`)
- TypeScript (modo estricto)
- Tailwind CSS para estilos
- **Framer Motion** — microinteracciones y transiciones de UI en componentes (hover, stagger simple, presencia en layout)
- **GSAP** (incl. **ScrollTrigger** cuando haga falta) — secuencias con scroll, timelines, reveals y transiciones editoriales; respetar **`prefers-reduced-motion`**. Convenciones: **`docs/07-motion-y-gsap.md`**
- Aceternity UI

## Metodología, dirección visual e iteración

Del prototipo **media / media-alta** a la landing **editorial** (tema, contenido, motion), **cómo iterar por sección**, referencias de estilo, mobile-first, plantillas de pedido y formato de entrega: **`docs/08-metodologia-de-trabajo.md`**.

## Documentación obligatoria

Índice del paquete: **`docs/00-indice-documentacion.md`**.

Al tocar **texto visible** o `aria-*` por idioma: **`docs/06-translate.md`** — claves en **`locales/es.json`** y **`locales/en.json`**.

**Antes de generar código**, leer según el caso:

- **`docs/04-uso-del-tema.md`** — siempre que afecte UI (tokens, tipografía, layout).
- **`docs/07-motion-y-gsap.md`** — si hay animación al scroll, pin, scrub o timelines GSAP.
- **`docs/08-metodologia-de-trabajo.md`** — al planificar o ejecutar el **paso editorial por sección** (o la primera vez que se aborda el rediseño).

**Regla de oro:** `docs/04-uso-del-tema.md` manda en estilos y tokens por encima de convenciones generales cuando afecta marca y consistencia visual.

El **mensaje y tono** siguen **`docs/01-comercial-purpose.md`** y el resto de `docs/`. La dirección visual concreta está en **`08`** (y enlaces a `02`, `04`, `07`).

## Requerimientos globales de arquitectura

### Código

- Principios SOLID y DRY
- Componentes reutilizables y desacoplados
- Patrones: Compound Components, Render Props, Custom Hooks
- Contenido iterable (cards, grids, lists) con `.map()`
- Props tipadas con interfaces o type alias
- No usar `any` en TypeScript

### Performance

- `next/image`, lazy loading bajo el pliegue, prefetch estratégico
- GSAP: evitar carga innecesaria en el hilo principal; **limpieza** al desmontar — **`docs/07-motion-y-gsap.md`**

---

## Comandos

```bash
npm run dev      # servidor local (Next.js dev)
npm run build    # build de producción
npm run start    # servidor de producción (tras build)
npm run lint     # ESLint
```

> `next.config.mjs` tiene `typescript.ignoreBuildErrors: true` durante el desarrollo.

---

## Arquitectura de la app

### Estructura principal

```
app/
  layout.tsx         # RootLayout: carga Next/font (DM Serif + Roboto Condensed), I18nProvider, Analytics
  page.tsx           # Única ruta — compone las secciones en LandingChrome
  globals.css        # Variables CSS (:root) espejo de theme/theme.ts + @import tailwindcss

theme/
  theme.ts           # Fuente única de tokens (colores, tipografía, radios, sombras, z-index, layout)
  index.ts           # Reexporta todo lo de theme.ts

components/
  landing-chrome.tsx              # Shell cliente: SiteHeader + ScrollToTopButton + scroll-spy activo
  sections/                       # Una sección por archivo (hero, about, social-section, construccion-infraestructura, donation, contact, site-header, footer)
  aceternity/                     # Primitivos de Aceternity UI adaptados
  providers/i18n-provider.tsx     # Restaura idioma de localStorage, sincroniza <html lang>
  language-toggle.tsx             # Botón ES/EN

lib/
  i18n/client.ts       # Inicializa i18next con locales/es.json y locales/en.json
  section-ids.ts       # IDs de ancla y orden de scroll-spy (navScrollSpyOrder)
  section-layout.ts    # Clases Tailwind compartidas: sectionContainer, sectionYComfortable, sectionYHero
  scroll-to-section.ts # Utilidad: applyInitialHashSection (scroll al hash inicial)
  contact-constants.ts # Email, teléfono, dirección (fuente única)
  utils.ts             # cn() = clsx + tailwind-merge

hooks/
  use-landing-scroll.ts  # IntersectionObserver → activeSectionId + showScrollToTop

locales/
  es.json / en.json    # Todo el copy visible y aria-* traducibles
```

### Flujo de datos clave

- **Texto visible** → siempre en `locales/es.json` + `locales/en.json`; consumido con `useTranslation()` en Client Components.
- **Tokens de diseño** → importar de `@/theme`; en CSS usar `var(--color-primary)` etc. (definidas en `:root` de `globals.css`).
- **IDs de sección** → definidos en `lib/section-ids.ts`; reutilizados por `SiteHeader`, `useLandingScroll` y cada sección como `id={sectionIds.xxx}`.
- **Layout compartido** → `sectionContainer` y `sectionYComfortable` de `lib/section-layout.ts` en la mayoría de secciones.

### Dos capas de tokens enlazadas

`theme/theme.ts` (TS) ↔ `app/globals.css :root` (CSS vars). Al cambiar un color o token que exista en ambos, editar los dos en paralelo.
