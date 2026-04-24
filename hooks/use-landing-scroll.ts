"use client";

import { useCallback, useEffect, useState } from "react";
import { navScrollSpyOrder, SITE_FOOTER_ID, type NavSectionId } from "@/lib/section-ids";

function getHeaderHeight(): number {
  if (typeof document === "undefined") return 80;
  const h = document.querySelector("header");
  return h?.offsetHeight ?? 80;
}

function computeActiveSection(): NavSectionId {
  const hh = getHeaderHeight();
  const y = window.scrollY + hh + 2;
  let active: NavSectionId = navScrollSpyOrder[0];
  for (const id of navScrollSpyOrder) {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= y) active = id;
  }
  return active;
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
  const [pastSecondSection, setPastSecondSection] = useState(false);
  const [footerIntersects, setFooterIntersects] = useState(false);

  const tick = useCallback(() => {
    setActiveSectionId(computeActiveSection());
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

  return { activeSectionId, showScrollToTop };
}
