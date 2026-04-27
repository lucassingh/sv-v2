"use client";

import { SocialActividadesThread } from "@/components/sections/social-actividades-thread";
import { SocialEscuelaFutbolShowcase } from "@/components/sections/social-escuela-futbol-showcase";
import { SocialIntroRibbon } from "@/components/sections/social-intro-ribbon";
import { sectionIds } from "@/lib/section-ids";

export function SocialSection() {
  return (
    <section
      id={sectionIds.social}
      className="border-x-0 border-t-0 border-b border-[rgba(47,63,68,0.12)]"
    >
      <SocialIntroRibbon />
      <SocialEscuelaFutbolShowcase />
      <SocialActividadesThread />
    </section>
  );
}
