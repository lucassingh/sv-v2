"use client";

import { useCallback, useEffect, useState } from "react";
import {
  navBackdropFallbackFromSection,
  type NavBackdropKind,
} from "@/lib/nav-surface";
import { navScrollSpyOrder, SITE_FOOTER_ID, type NavSectionId } from "@/lib/section-ids";

function getAnchorOffsetPx(): number {
  if (typeof document === "undefined") return 88;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--anchor-offset")
    .trim();
  if (raw.endsWith("rem")) {
    const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return parseFloat(raw) * rootPx;
  }
  return parseFloat(raw) || 88;
}

function computeActiveSection(): NavSectionId {
  const offset = getAnchorOffsetPx();
  const y = window.scrollY + offset + 2;
  let active: NavSectionId = navScrollSpyOrder[0];
  for (const id of navScrollSpyOrder) {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= y) active = id;
  }
  return active;
}

type SampleBackdropOpts = { skipScrollFab?: boolean };

/** `elementsFromPoint` hasta encontrar `[data-nav-backdrop]` (p. ej. bajo el nav o bajo el FAB). */
function sampleBackdropAtPoint(
  probeX: number,
  probeY: number,
  opts?: SampleBackdropOpts,
): NavBackdropKind | null {
  const stack = document.elementsFromPoint(probeX, probeY);
  for (const node of stack) {
    if (!(node instanceof Element)) continue;
    if (node.closest("header")) continue;
    if (opts?.skipScrollFab && node.closest("[data-scroll-fab]")) continue;
    const mark = node.closest("[data-nav-backdrop]");
    if (mark) {
      const v = mark.getAttribute("data-nav-backdrop");
      if (v === "dark" || v === "light") return v;
    }
  }
  return null;
}

function computeNavBackdrop(active: NavSectionId): NavBackdropKind {
  const offset = getAnchorOffsetPx();
  const probeY = Math.min(offset + 12, window.innerHeight - 8);
  const probeX = window.innerWidth * 0.5;
  return sampleBackdropAtPoint(probeX, probeY) ?? navBackdropFallbackFromSection(active);
}

/** Contraste del botón “subir”: muestrea cerca del centro del FAB (`bottom-6` + `right-4`/`sm:right-6`), no bajo el nav. */
function computeFabBackdrop(active: NavSectionId): NavBackdropKind {
  const wide = window.innerWidth >= 640;
  const insetRight = (wide ? 24 : 16) + 26;
  const insetBottom = 24 + 26;
  const probeX = Math.max(8, Math.min(window.innerWidth - 8, window.innerWidth - insetRight));
  const probeY = Math.max(8, Math.min(window.innerHeight - 8, window.innerHeight - insetBottom));
  return (
    sampleBackdropAtPoint(probeX, probeY, { skipScrollFab: true }) ??
    navBackdropFallbackFromSection(active)
  );
}

function isPastSecondSection(): boolean {
  const secondId = navScrollSpyOrder[1];
  if (!secondId) return false;
  const second = document.getElementById(secondId);
  if (!second) return false;
  return second.getBoundingClientRect().top < window.innerHeight - 48;
}

export function useLandingScroll() {
  const [activeSectionId, setActiveSectionId] = useState<NavSectionId>(navScrollSpyOrder[0]);
  const [navBackdrop, setNavBackdrop] = useState<NavBackdropKind>("dark");
  const [fabBackdrop, setFabBackdrop] = useState<NavBackdropKind>("dark");
  const [pastSecondSection, setPastSecondSection] = useState(false);
  const [footerIntersects, setFooterIntersects] = useState(false);

  const tick = useCallback(() => {
    const active = computeActiveSection();
    setActiveSectionId(active);
    setNavBackdrop(computeNavBackdrop(active));
    setFabBackdrop(computeFabBackdrop(active));
    setPastSecondSection(isPastSecondSection());
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [tick]);

  useEffect(() => {
    const el = document.getElementById(SITE_FOOTER_ID);
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setFooterIntersects(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showScrollToTop = pastSecondSection && !footerIntersects;

  return { activeSectionId, navBackdrop, fabBackdrop, showScrollToTop };
}
