# 08 — Metodología de trabajo: del prototipo a la landing editorial

**Índice del paquete de docs:** [`00-indice-documentacion.md`](./00-indice-documentacion.md)

Este documento describe **cómo pasar** del estado actual (**prototipo funcional media / media-alta**, ver [`05-objetivos-tecnicos-esperados.md`](./05-objetivos-tecnicos-esperados.md)) a implementar la **dirección visual editorial** (grid-breaking, tipografía, scroll) **sin rehacer el esqueleto** del proyecto: adaptando **tema** ([`04-uso-del-tema.md`](./04-uso-del-tema.md)), **contenido** ([`02-contenido-web.md`](./02-contenido-web.md)), **i18n** ([`06-translate.md`](./06-translate.md)) y **motion** ([`07-motion-y-gsap.md`](./07-motion-y-gsap.md)).

Las reglas de stack y arquitectura de código siguen en [`../claude.md`](../claude.md).

---

## 1. Punto de partida y objetivo

| Hoy | Hacia dónde |
|-----|-------------|
| Rutas, secciones, copy e i18n ya montados | Misma **estructura**, mayor **fidelidad visual** y de **motion** |
| UI con mezcla de tokens y utilidades “sueltas” | **Tokens** (`theme/`, `var(--…)`) como base en cada bloque |
| Placeholders de imagen | Assets reales según [`03-manejo-imagenes-next.md`](./03-manejo-imagenes-next.md) |
| Framer Motion en varios sitios; GSAP disponible | **GSAP / ScrollTrigger** en el eje vertical editorial; **Framer Motion** en microinteracciones locales ([`07-motion-y-gsap.md`](./07-motion-y-gsap.md)) |

El **mensaje** no cambia: [`01-comercial-purpose.md`](./01-comercial-purpose.md). El **cómo** se ve y se anima sí evoluciona hacia estilo *estudio editorial*.

---

## 2. Antes de tocar código: lectura mínima

Orden recomendado la primera vez (o al retomar el proyecto):

1. [`01-comercial-purpose.md`](./01-comercial-purpose.md) — qué debe lograr el sitio.
2. [`02-contenido-web.md`](./02-contenido-web.md) — qué dice cada bloque (no inventar copy).
3. [`04-uso-del-tema.md`](./04-uso-del-tema.md) — tokens y sección *Ritmo editorial y espaciado vertical*.
4. [`05-objetivos-tecnicos-esperados.md`](./05-objetivos-tecnicos-esperados.md) — alcance y checklist de calidad.
5. [`07-motion-y-gsap.md`](./07-motion-y-gsap.md) — si vas a animar al scroll o con timelines.
6. [`../claude.md`](../claude.md) — stack y reglas de código (SOLID, sin `any`, `.map()`, etc.).

---

## 3. Dirección visual (referencia, no copia)

**Etiqueta:** *Editorial Grid-Breaking* con **énfasis tipográfico** y narrativa **scroll-triggered**. En una frase: **estudio creativo minimalista con jerarquía tipográfica**.

**URL de web con la principal propuesta para imitar** 
- https://realnoni.com/

**URLs de referencia** (layout, ritmo, tipografía y scroll; **no** copiar assets ni marca ajenas):

- https://ricardoseola.com/salvato/
- https://uneevo.com/
- https://www.zitafernandez.com/

**Prioridades al implementar:**

- **Jerarquía tipográfica** fuerte, alineada a tokens en `04`.
- **Grids con ruptura intencional:** asimetría controlada; sin caos.
- **Motion al scroll** (entradas, pin, scrub suave) con **GSAP / ScrollTrigger** cuando sea secuencial o dependa del viewport; Framer Motion para lo muy local del componente.
- **Aire y ritmo editorial;** evitar glassmorphism/neumorphism genérico salvo que el tema lo justifique.
- **Accesibilidad:** WCAG 2.1 AA; `prefers-reduced-motion` (`05`, `07`).

### Coherencia visual (crítico)

La coherencia **no** es “todas las secciones iguales en densidad”: puede haber **scroll largo y mucho espacio** si jerarquía y marca siguen claras.

- **Marca y sistema:** colores, tipografía, `theme.layout` / márgenes laterales según `04`; el **espaciado vertical** puede variar fuerte entre secciones.
- **Ritmo:** alternar bloques densos y muy respirados es válido; evitar falta de foco.
- **Motion vertical:** un mismo lenguaje **GSAP** en el flujo; Framer en hover/taps puntuales.
- **Hover/focus:** duraciones y curvas reconocibles (p. ej. ~200–300ms ease-out si `04` no define otra cosa).

### Reglas de layout internas

- Eje: `grid-breaking` + `scroll-triggered`; en **donación** y **contacto**, priorizar **claridad** (`content-focused`) sobre experimentación.
- **Performance:** `next/image`, lazy donde aplique; GSAP sin trabajo innecesario en el hilo principal y con **limpieza** al desmontar (`07`).

---

### Reglas de felxibilidad

- Podes hacer que las secciones no sean como esta hoy el prototipo por ej, que en alguna seccion no utilices una img por que es una seccion disruptiva y distinta a las demas (es solo un ej) o que es una seccion que realzas con un background del tema y tipografia super gigante, o utilices la imagen super grande con una mascara etc.

## 4. Cómo empezar a “vestir” el estilo sin romper nada

No hace falta un branch gigante que toque todo el sitio.

1. **Elegí una primera sección** (suele ser **hero** o la que más duela visualmente).
2. En ese archivo: migrar colores/tipografía/espaciado hacia **tokens** (`04`); ajustar layout hacia editorial dentro de `--layout-content-max`.
3. **Copy:** solo lo que diga `02`; si cambiás strings visibles, actualizá **`locales/es.json` y `locales/en.json`** (`06`).
4. **Imágenes:** sustituí placeholders según `03`.
5. **Motion:** añadí GSAP solo donde aporte al relato del scroll; respetá `07`.
6. **Cerrá** la sección con build ok, vista móvil ~320px y desktop ancho, y sin regresiones de i18n.

Repetí el ciclo en la **siguiente** sección. La consistencia global aparece al unificar tokens y lenguaje de motion, no al hacer todas las secciones el mismo día.

---

## 5. Orden sugerido de secciones (ajustable)

Un orden razonable para **maximizar impacto** y **aprender patrones** reutilizables:

1. Hero (primera impresión + tipo + posible scroll intro)
2. Nosotros / historia
3. Misión, visión, valores
4. Actividades / social / construcción (según `02`)
5. Talleres u otros bloques de contenido
6. Colaboración / donación (**claridad** prioritaria)
7. Contacto y footer

Si una sección es dependencia de otra (ej. CTA global), podés tocarla después o alinearla cuando pasés por **donación/contacto**.

---

## 6. Checklist por sección (cada iteración)

Usalo antes de dar por cerrada una sección o un PR:

- [ ] **Tema:** colores, fuentes, radios, sombras desde `theme` / `var(--…)` (sin grises sueltos que compitan con la marca).
- [ ] **Contenido:** alineado a `02`; sin textos “inventados” fuera de acuerdo.
- [ ] **i18n:** claves en ES y EN si tocaste copy o `aria-*` traducible (`06`).
- [ ] **Imágenes:** `next/image`, `alt` en ambos idiomas si aplica (`03`).
- [ ] **Layout editorial:** márgenes laterales coherentes; ritmo vertical con criterio (`04`, sección ritmo editorial).
- [ ] **Motion:** propósito claro; `prefers-reduced-motion`; cleanup GSAP (`07`).
- [ ] **Mobile-first:** probado en un ancho chico; alternativa si el grid desktop no escala (stack, carrusel, acordeón).
- [ ] **Build** y **Lighthouse** opcional en esa vista si hubo cambios de performance.

Checklist más orientado a “landing final” cuando ya esté todo pulido: [`05-objetivos-tecnicos-esperados.md`](./05-objetivos-tecnicos-esperados.md) (sección checklist).

---

## 7. Mobile-first (obligatorio)

- **SIEMPRE** pensar primero en **~320px** y subir breakpoints: `sm:640px md:768px lg:1024px xl:1280px`.

| Desktop | Mobile (alternativa típica) |
|---------|-----------------------------|
| Grid 3–4 columnas | Stack vertical o carrusel horizontal |
| Sidebar + main | Drawer o acordeón |
| Tablas complejas | Cards apiladas |
| Hover como única pista | Touch-friendly (tap) |

- Si el layout editorial no escala bien: **adaptar** (no borrar contenido).
- Si hay duda de patrón: conviene decidir explícitamente (ej. stack vs carrusel).
- **GSAP en mobile:** timelines más cortas; menos pin; legibilidad y scroll natural primero.

---

## 8. Cómo pedir trabajo puntual (humano o agente)

Plantilla útil:

> En la sección **[nombre]**, quiero **[cambio visual o animación]** inspirado en **[URL o descripción]**, respetando **[`04-uso-del-tema.md`](./04-uso-del-tema.md)** y, si hay scroll/timeline, **[`07-motion-y-gsap.md`](./07-motion-y-gsap.md)**. El copy debe seguir **[`02-contenido-web.md`](./02-contenido-web.md)** y i18n **[`06-translate.md`](./06-translate.md)**.

---

## 9. Instrucciones de trabajo (agente / desarrollo)

Al implementar **cualquier** componente o sección:

1. **ANTES:** leer `04-uso-del-tema.md` (si no se leyó en la sesión); si hay motion GSAP al scroll, también `07-motion-y-gsap.md`; para **alcance y orden de trabajo**, este **`08`**.
2. **DURANTE:** aplicar reglas de [`../claude.md`](../claude.md); TypeScript estricto (sin `any`); mobile-first; tokens; GSAP en eje editorial al scroll; Framer Motion en microinteracciones locales cuando sea más simple.
3. **DESPUÉS:** código completo y funcional; build coherente con el alcance de la sección.

---

## 10. Formato de entrega por sección

Conviene que cada entrega incluya:

- Componente principal + subcomponentes necesarios.
- Tipos/interfaces.
- Hook personalizado si hay animación o estado complejo (refs GSAP, `useLayoutEffect` / equivalente isomórfico si aplica).
- Breve nota (2–3 líneas): cómo se aplicó el **tema**, **mobile**, y **GSAP vs Framer Motion** según `07`.

---

## 11. Relación con otros documentos

| Documento | Rol |
|-----------|-----|
| [`05`](./05-objetivos-tecnicos-esperados.md) | **Qué** es el prototipo y **qué** es “alta fidelidad” a nivel producto |
| **Este `08`** | **Cómo** iterar sección a sección y con qué lecturas/checklists |
| [`../claude.md`](../claude.md) | Stack, reglas de código y enlace rápido a `docs/` |
| [`07`](./07-motion-y-gsap.md) | Detalle técnico de GSAP en Next |

Si hay tensión entre una convención genérica y los docs `01`–`08`, priman **tema** (`04`) y **contenido** (`02`) para marca y copy; para **motion**, alinear `07`, `04` y `claude.md` (véase también el párrafo de tensión en `05`).
