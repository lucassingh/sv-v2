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
