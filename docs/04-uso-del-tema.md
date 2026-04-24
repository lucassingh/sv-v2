# 04 — Tema de diseño (`theme/` y variables CSS)

**Índice del paquete de docs:** [`00-indice-documentacion.md`](./00-indice-documentacion.md)

Guía para usar el sistema de tokens del proyecto **Sembrando Valores** (Next.js en `sv-landing/`).

## Ubicación de archivos

| Qué | Ruta |
|-----|------|
| Fuente única en TypeScript | `sv-landing/theme/theme.ts` |
| Reexportaciones | `sv-landing/theme/index.ts` |
| Variables CSS globales (espejo) | `sv-landing/app/globals.css` → bloque `:root` |
| Carga de fuentes (Next/font) | `sv-landing/app/layout.tsx` |
| Comentario de migración Tailwind | `sv-landing/tailwind.config.ts` |

## Principio: dos capas enlazadas

1. **`theme/theme.ts`** define valores en TS (colores en hex, escalas, stacks de fuente, etc.). Es la referencia al editar la marca.
2. **`globals.css`** repite los mismos valores como **variables CSS** en `:root` (`--color-primary`, `--font-size-base`, …) para poder usarlos en CSS puro, módulos CSS o utilidades arbitrarias de Tailwind (`bg-[var(--color-primary)]`).

Al **cambiar un color o un token** que exista en ambos sitios, actualizá **primero** `theme/theme.ts` y **después** el bloque `:root` en `globals.css` para que sigan iguales. (Más adelante se puede automatizar con un script si hace falta.)

## Uso en TypeScript / React

Import desde el alias del proyecto:

```ts
import { theme, themeColors, themeFontFamily, themeFontSize } from "@/theme";
```

### Colores

```ts
theme.colors.primary;   // "#2f3f44"
theme.colors.secondary; // "#94bbc4"
theme.colors.accent;    // "#1E4B6E"
theme.colors.light;     // "#ffffff"
theme.colors.dark;      // "#1b1b1e"
```

Útil en estilos inline, props de librerías (charts, canvas), o `style={{ color: theme.colors.accent }}`.

Los nombres sugeridos para variables CSS están en `colorCssVarNames` (por ejemplo `colorCssVarNames.primary` → `"--color-primary"`).

### Tipografía

- **`theme.fontFamily.serif`** / **`theme.fontFamily.sans`**: strings listos para `fontFamily` en React (`style` o styled-components), ya incluyen `var(--font-serif)` / `var(--font-sans)` y fallbacks a DM Serif Display y Roboto Condensed.

```tsx
<p style={{ fontFamily: theme.fontFamily.sans }}>Texto</p>
```

- **`theme.fontSize`**: escala en `rem` (`xs`, `sm`, `base`, … `7xl`).
- **`theme.lineHeight`**, **`theme.letterSpacing`**, **`theme.fontWeight`**: números o strings según el token. Los pesos reflejan lo cargado en Google Fonts en `layout.tsx` (300, 400, 500, 700).

### Otros tokens

- **`theme.radius`**: radios en rem (coherentes con `rounded-*` de Tailwind).
- **`theme.shadow`**, **`theme.transition`**, **`theme.zIndex`**, **`theme.layout`**: sombras, tiempos de transición, capas y anchos máximos de contenido.

El objeto **`theme`** agrupa todo lo anterior por conveniencia.

### Tipos

```ts
import type { Theme, ThemeColorName } from "@/theme";
```

## Uso en CSS

Las variables viven en `:root` dentro de `app/globals.css`. Ejemplos:

```css
.mi-bloque {
  color: var(--color-primary);
  background: var(--color-light);
  font-family: var(--font-family-sans);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  z-index: var(--z-header);
}
```

Lista útil de prefijos:

- Colores: `--color-primary`, `--color-secondary`, `--color-accent`, `--color-light`, `--color-dark`
- Fuentes: `--font-family-sans`, `--font-family-serif` (usan `--font-sans` / `--font-serif` de Next)
- Tamaños: `--font-size-xs` … `--font-size-7xl`
- Interlineado: `--line-height-tight` … `--line-height-loose`
- Tracking: `--letter-spacing-tighter` … `--letter-spacing-widest`
- Radios: `--radius-sm` … `--radius-full`
- Sombras: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-inner`
- Transiciones: `--transition-fast`, `--transition-base`, `--transition-slow`
- Z-index: `--z-base`, … `--z-overlay`
- Layout: `--layout-content-max`, `--layout-prose-max`

## Ritmo editorial y espaciado vertical

La dirección visual del sitio es *editorial* (mucho aire, scroll narrado, grids con ruptura controlada; ver [`../claude.md`](../claude.md)). Eso **no** contradice el sistema de tokens:

- **Márgenes laterales y ancho de contenido:** respetar `theme.layout` / `--layout-content-max` (y `--layout-prose-max` donde aplique lectura larga) para que el sitio siga reconocible como **Sembrando Valores**.
- **Espacio entre secciones:** puede variar fuerte (secciones “respiradas” vs bloques más densos) si la **jerarquía tipográfica** y los colores siguen `04`. No hace falta un mismo `padding-block` entre todas las secciones; sí evitar saltos arbitrarios de **color** o **familia tipográfica** sin intención de marca.

## Uso con Tailwind (arbitrary values)

Sin tocar `tailwind.config.ts` todavía, podés referenciar variables:

```html
<div class="bg-[var(--color-primary)] text-[var(--color-light)] rounded-[var(--radius-md)]">
```

Para una API más limpia (`bg-brand-primary`), el siguiente paso es extender `theme.extend.colors` en `tailwind.config.ts` mapeando a esas mismas `var(--…)`.

## Fuentes y Next.js (`layout.tsx`)

Next/font **exige literales** en `variable: "--font-serif"`. Por eso esos strings están escritos a mano en `layout.tsx` y **deben coincidir** con `fontCssVarNames` en `theme/theme.ts`. Si renombrás una variable CSS de fuente, actualizá ambos sitios.

Las clases `font-sans` / `font-serif` de Tailwind siguen apuntando a la config actual; cuando migres, podés alinear `tailwind.config.ts` con `theme.fontFamily` o con `var(--font-family-sans)`.

## Estado actual de la UI

Los componentes **aún no** fueron migrados masivamente a estos tokens: muchos siguen usando la paleta zinc de Tailwind y grises. El tema y `:root` están **preparados** para ir reemplazando clases y colores de forma gradual.

## Resumen rápido

| Necesitás… | Usá… |
|------------|--------|
| Valor en JS/TS | `import { theme } from "@/theme"` |
| Valor en CSS / módulos CSS | `var(--color-primary)`, etc. |
| Cambiar la marca | Editá `theme/theme.ts` y el bloque `:root` en `globals.css` |
| Tipos | `Theme`, `ThemeColorName` desde `@/theme` |
