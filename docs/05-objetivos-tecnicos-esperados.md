# 05 — Objetivos técnicos esperados (estado y visión)

**Índice del paquete de docs:** [`00-indice-documentacion.md`](./00-indice-documentacion.md)

Este documento describe **qué hay hoy** en `sv-landing`, **hacia dónde** se quiere llevar la experiencia y **cómo** encaja el trabajo iterativo por sección. Complementa las instrucciones operativas de [`../claude.md`](../claude.md) con foco en alcance y calidad esperada.

## Estado actual: prototipo funcional media / media-alta

La landing ya cuenta con:

- **Stack estable:** Next.js (App Router), TypeScript estricto, Tailwind, Framer Motion, patrones de UI tipo Aceternity.
- **Estructura global implementada:** layout, navegación, secciones principales, i18n ES/EN, pie y flujos de contacto/donación según el copy documentado en [`02-contenido-web.md`](./02-contenido-web.md).
- **Contenido y mensaje** alineados al propósito de la asociación (ver [`01-comercial-purpose.md`](./01-comercial-purpose.md)).
- **Tema formalizado** en código y CSS (`theme/theme.ts`, `:root` en `app/globals.css`), aunque la UI **aún no** consume esos tokens de forma uniforme en todos los bloques (ver [`04-uso-del-tema.md`](./04-uso-del-tema.md)).
- **Imágenes:** en gran medida placeholders listos para sustituir por assets reales bajo `public/assets/` (ver [`03-manejo-imagenes-next.md`](./03-manejo-imagenes-next.md)).

En conjunto, eso define un **prototipo funcional de fidelidad media–media-alta**: navegable, coherente a nivel de arquitectura y mensaje, pero con margen claro para pulir **impacto visual**, **performance percibida**, **accesibilidad fina** y **unificación del sistema de diseño** en cada sección.

## Objetivo: última pasada de alta fidelidad

La meta explícita es una **landing muy atractiva, moderna y de alto impacto visual** que:

1. **Capture en segundos** la atención y la emoción (hero, ritmo de scroll, jerarquía tipográfica).
2. **Transmita confianza** (consistencia cromática y tipográfica, espaciado, imágenes reales de calidad).
3. **Invite a la acción** alineada con la causa: contacto, difusión, colaboración (CTAs claros sin ruido).

Eso implica, entre otras cosas, lo que ya anticipa `claude.md`:

- Alto impacto visual: gradientes y tratamientos de superficie con criterio, animaciones con scroll, microinteracciones.
- Accesibilidad orientada a **WCAG 2.1 AA** como piso (contraste, foco, etiquetas).
- Imágenes con **`next/image`**, lazy loading donde corresponda, y revisión de LCP/CLS al cerrar cada bloque.
- **Mobile-first** real: cada sección debe comportarse bien desde ~320px, con alternativas claras (stack, carrusel, acordeón) cuando el layout desktop no escala.

## Estrategia: iterar sección por sección

La **estructura global del proyecto ya está implementada** (rutas, secciones, datos de copy, convenciones de carpetas para assets). Por eso el trabajo de alta fidelidad no parte de rehacer el esqueleto, sino de **iterar bloque a bloque**:

- Una sección a la vez: hero, nosotros, misión/visión/valores, actividades/social/construcción, talleres, donación, contacto, footer, etc.
- En cada iteración: aplicar tokens del tema donde falten, sustituir placeholders, afinar motion, revisar responsive y accesibilidad, y medir si hace falta (Lighthouse en esa vista).

Así se reduce riesgo de regresiones y se mantiene un **ritmo de entrega revisable** (PR o commit por sección).

## Relación con `claude.md`

El archivo [`../claude.md`](../claude.md) concentra **reglas de trabajo para quien implementa** (leer el tema antes de codificar, SOLID/DRY, sin `any`, listas dinámicas con `.map()`, preferencias de estilo global y por sección, formato de entrega).

Este **05** fija el **marco de producto y calidad**: prototipo actual, visión de landing final, y el acuerdo de **no rearmar la estructura** sino **pulir y elevar fidelidad** por sección. Si hubiera tensión entre una convención genérica y los docs numerados (`01`–`04`), priman **tema** ([`04-uso-del-tema.md`](./04-uso-del-tema.md)) y **contenido** ([`02-contenido-web.md`](./02-contenido-web.md)) para marca y copy.

## Checklist orientativo por sección (al cerrar “alta fidelidad”)

- [ ] Colores y tipografía alineados a tokens (`theme` / `var(--…)`), sin grises “sueltos” que compitan con la marca.
- [ ] Imagen real o ilustración acordada, con `alt` en ambos idiomas.
- [ ] Animaciones con propósito (no distraer); respeto a `prefers-reduced-motion` donde aplique.
- [ ] Contraste y foco verificables en estados hover/focus/active.
- [ ] Layout probado en al menos un ancho móvil y uno desktop ancho.
- [ ] Sin regresiones de build ni de i18n para las claves tocadas.

Cuando la mayoría de las secciones cumplan esto, el sitio pasa de “prototipo sólido” a **landing de presentación pública** lista para campañas y tráfico orgánico/pago hacia la causa.
