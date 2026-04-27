"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { SiteHeader } from "@/components/sections/site-header";
import { FloatingSocialRail } from "@/components/floating-social-rail";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { useLandingScroll } from "@/hooks/use-landing-scroll";
import { applyInitialHashSection } from "@/lib/scroll-to-section";

type LandingChromeProps = {
  children: ReactNode;
};

export function LandingChrome({ children }: LandingChromeProps) {
  const { activeSectionId, navBackdrop, fabBackdrop, showScrollToTop } = useLandingScroll();

  useEffect(() => {
    applyInitialHashSection();
  }, []);

  return (
    <>
      <SiteHeader activeSectionId={activeSectionId} navBackdrop={navBackdrop} />
      {children}
      <FloatingSocialRail visible={showScrollToTop} fabBackdrop={fabBackdrop} />
      <ScrollToTopButton visible={showScrollToTop} fabBackdrop={fabBackdrop} />
    </>
  );
}
