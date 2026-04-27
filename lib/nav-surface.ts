import { sectionIds, type NavSectionId } from "@/lib/section-ids";

/**
 * Tipo de fondo **visible bajo la zona del nav** (no el color del nav).
 * - `dark`: contenido oscuro (p. ej. `--color-primary`) → barra **accent** (crema) + links oscuros.
 * - `light`: fondos claros (accent, light, zinc, banda `--color-secondary` actual…) → barra **primary** + links claros.
 *
 * Marcá bloques con `data-nav-backdrop="dark" | "light"` en el DOM. `useLandingScroll` muestrea con
 * `elementsFromPoint` (ignorando `<header>`) y cae en `navBackdropFallbackFromSection` si no hay marca.
 */
export type NavBackdropKind = "dark" | "light";

export function navBackdropFallbackFromSection(id: NavSectionId): NavBackdropKind {
  return id === sectionIds.inicio ? "dark" : "light";
}
