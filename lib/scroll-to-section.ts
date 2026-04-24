"use client";

import type { MouseEvent } from "react";

/** Scroll suave a la sección y deja la URL sin `#` (misma ruta + query). */
export function scrollToSection(sectionId: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  stripHashFromUrl();
}

function stripHashFromUrl() {
  if (typeof window === "undefined") return;
  const { pathname, search, hash } = window.location;
  if (!hash) return;
  window.history.replaceState(window.history.state, "", `${pathname}${search}`);
}

/**
 * Clic en `<a href="#id">`: evita el hash en la barra y hace scroll manual.
 * Mantener `href` con hash ayuda a accesibilidad / “abrir en pestaña nueva” (aunque allí sí verán #).
 */
export function handleInPageNavClick(
  e: MouseEvent<HTMLAnchorElement>,
  sectionId: string,
  after?: () => void,
) {
  e.preventDefault();
  scrollToSection(sectionId);
  after?.();
}

/**
 * Si el usuario entra con `/#seccion`, alinea el scroll y quita el hash de la URL.
 */
export function applyInitialHashSection() {
  if (typeof window === "undefined") return;
  const raw = window.location.hash.slice(1);
  if (!raw) return;
  const id = decodeURIComponent(raw);
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "auto", block: "start" });
  }
  stripHashFromUrl();
}
