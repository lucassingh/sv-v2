/**
 * Tokens de diseño globales (colores, tipografía, ritmo).
 * Los hex de color viven aquí; en `app/globals.css` hay un espejo en `:root` para uso con `var(--…)` en CSS.
 *
 * Fuentes: coinciden con `next/font` en `app/layout.tsx` (`--font-serif`, `--font-sans` en `<html>`).
 */

/**
 * Nombres de variables CSS que Next/font inyecta en el layout.
 * Deben ser idénticos a los literales `variable` en `app/layout.tsx` (la API de Next no admite referencias).
 */
export const fontCssVarNames = {
  serif: "--font-serif",
  sans: "--font-sans",
} as const;

function fontStack(
  cssVarName: string,
  fallbackName: string,
  generic: "serif" | "sans-serif",
): string {
  return `var(${cssVarName}), "${fallbackName}", ${generic}`;
}

/** Paleta principal (hex). */
export const themeColors = {
  primary: "#2f3f44",
  secondary: "#94bbc4",
  accent: "#1E4B6E",
  light: "#ffffff",
  dark: "#1b1b1e",
} as const;

/** Nombres de variables CSS para colores (valores = themeColors). Usar en CSS/Tailwind cuando migres estilos). */
export const colorCssVarNames = {
  primary: "--color-primary",
  secondary: "--color-secondary",
  accent: "--color-accent",
  light: "--color-light",
  dark: "--color-dark",
} as const;

/** Familias tipográficas (usan las variables de Next/font + fallback local). */
export const themeFontFamily = {
  serif: fontStack(fontCssVarNames.serif, "DM Serif Display", "serif"),
  sans: fontStack(fontCssVarNames.sans, "Roboto Condensed", "sans-serif"),
} as const;

/** Escala de tamaños (rem). Aún no enlazada a Tailwind; lista para `style` o futura capa @theme. */
export const themeFontSize = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
} as const;

export const themeLineHeight = {
  none: 1,
  tight: 1.15,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.625,
  loose: 1.75,
} as const;

export const themeLetterSpacing = {
  tighter: "-0.03em",
  tight: "-0.02em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.08em",
  widest: "0.2em",
} as const;

/** Pesos alineados a los cargados en `layout.tsx` (Roboto Condensed: 300, 400, 500, 700). */
export const themeFontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
} as const;

/** Radios coherentes con utilidades tipo `rounded-lg` (~0.5rem). */
export const themeRadius = {
  none: "0",
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  full: "9999px",
} as const;

export const themeShadow = {
  sm: "0 1px 2px rgb(0 0 0 / 0.06)",
  md: "0 4px 12px rgb(0 0 0 / 0.08)",
  lg: "0 12px 32px rgb(0 0 0 / 0.1)",
  inner: "inset 0 2px 4px rgb(0 0 0 / 0.06)",
} as const;

export const themeTransition = {
  durationFast: "150ms",
  durationBase: "200ms",
  durationSlow: "300ms",
  easingStandard: "cubic-bezier(0.4, 0, 0.2, 1)",
  easingEmphasized: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

export const themeZIndex = {
  base: 0,
  raised: 10,
  dropdown: 30,
  fab: 40,
  header: 50,
  overlay: 100,
} as const;

/** Anchos de contenido alineados a `max-w-7xl` de Tailwind (80rem). */
export const themeLayout = {
  contentMax: "80rem",
  proseMax: "65ch",
} as const;

export const theme = {
  colors: themeColors,
  colorCssVarNames,
  fontCssVarNames,
  fontFamily: themeFontFamily,
  fontSize: themeFontSize,
  lineHeight: themeLineHeight,
  letterSpacing: themeLetterSpacing,
  fontWeight: themeFontWeight,
  radius: themeRadius,
  shadow: themeShadow,
  transition: themeTransition,
  zIndex: themeZIndex,
  layout: themeLayout,
} as const;

export type Theme = typeof theme;
export type ThemeColorName = keyof typeof themeColors;
