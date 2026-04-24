/** IDs de ancla (no traducibles). */
export const sectionIds = {
  inicio: "inicio",
  nosotros: "nosotros",
  social: "social",
  actividades: "actividades",
  colabora: "colabora",
  contacto: "contacto",
} as const;

/** Orden para scroll-spy y “volver arriba” (primera = hero, segunda = sobre nosotros). */
export const navScrollSpyOrder = [
  sectionIds.inicio,
  sectionIds.nosotros,
  sectionIds.social,
  sectionIds.actividades,
  sectionIds.colabora,
  sectionIds.contacto,
] as const;

export type NavSectionId = (typeof navScrollSpyOrder)[number];

export const SITE_FOOTER_ID = "site-footer";
