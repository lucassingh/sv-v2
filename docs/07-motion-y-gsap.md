# 07 — Motion: GSAP, ScrollTrigger y convenciones en Next.js

**Índice del paquete de docs:** [`00-indice-documentacion.md`](./00-indice-documentacion.md)

Complementa la **dirección visual** y el criterio **Framer Motion vs GSAP** en [`../claude.md`](../claude.md). El **orden de trabajo** por sección y las referencias de estilo están en [`08-metodologia-de-trabajo.md`](./08-metodologia-de-trabajo.md). El **ritmo vertical** respecto de tokens está en [`04-uso-del-tema.md`](./04-uso-del-tema.md) (sección *Ritmo editorial y espaciado vertical*). Aquí: decisiones técnicas repetibles al implementar animaciones.

## Cuándo usar qué

| Situación | Herramienta sugerida |
|-----------|----------------------|
| Secuencias al **scroll**, **pin**, **scrub**, storytelling vertical | **GSAP** + **ScrollTrigger** |
| **Timelines** complejas o varios elementos sincronizados | **GSAP** |
| Hover, tap, stagger corto en un **card** o botón | **Framer Motion** (suele bastar) |
| Presencia en layout (AnimatePresence, variantes simples) | **Framer Motion** |

Evitar mezclar en el **mismo tramo de scroll** dos estilos de easing o duración muy distintos entre bloques adyacentes: mejor unificar criterio vía GSAP en ese eje.

## Next.js (App Router)

- GSAP y ScrollTrigger tocan **DOM** y **window**: usalos en **Client Components** (`"use client"`) o en efectos que solo corran en el cliente.
- Registrá **ScrollTrigger** una vez donde armes la animación: `gsap.registerPlugin(ScrollTrigger)` (idempotente si se repite en el mismo bundle).
- **Limpieza obligatoria** al desmontar el componente: `ScrollTrigger.getAll().forEach((t) => t.kill())` filtrado por el contenedor que creaste, o guardá referencias a los triggers/timelines creados y llamá `.kill()` / `revert()` según el caso. Objetivo: sin listeners ni observers huérfanos al cambiar de ruta.

## Accesibilidad y SEO

- Respetar **`prefers-reduced-motion`**: reducir duraciones, desactivar scrub/pin agresivo, o saltar animaciones no esenciales; el contenido debe seguir **legible y usable** sin motion.
- **Contenido crítico** (titulares, CTAs, datos de donación/contacto): no depender de que “aparezca” solo tras animación para existir en DOM o ser indexable; evitar `opacity: 0` permanente sin `useLayoutEffect`/hydration coherente.

## Mobile

- Priorizar **legibilidad y toque**: acortar timelines, evitar **pin** largo que encierre poco contenido, revisar que el scroll no se sienta “trabado”.
- Coherente con [`../claude.md`](../claude.md) (sección mobile / GSAP).

## Dependencia

- Paquete **`gsap`** en `package.json`. Import típico: `import gsap from "gsap"` y `import { ScrollTrigger } from "gsap/ScrollTrigger"`.
