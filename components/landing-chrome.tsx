"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { SiteHeader } from "@/components/sections/site-header";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { useLandingScroll } from "@/hooks/use-landing-scroll";
import { applyInitialHashSection } from "@/lib/scroll-to-section";

type LandingChromeProps = {
  children: ReactNode;
};

export function LandingChrome({ children }: LandingChromeProps) {
  const { activeSectionId, showScrollToTop } = useLandingScroll();

  useEffect(() => {
    applyInitialHashSection();
  }, []);

  return (
    <>
      <SiteHeader activeSectionId={activeSectionId} />
      {children}
      <ScrollToTopButton visible={showScrollToTop} />
    </>
  );
}
