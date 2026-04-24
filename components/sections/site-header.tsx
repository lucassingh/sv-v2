"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { sectionIds, type NavSectionId } from "@/lib/section-ids";
import { LanguageToggle } from "@/components/language-toggle";
import { handleInPageNavClick } from "@/lib/scroll-to-section";

const linkBase =
  "rounded-full px-2.5 py-1.5 text-center text-xs font-medium transition-colors lg:px-3 lg:text-[13px]";
const linkInactive = `${linkBase} text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900`;
const linkActive = `${linkBase} bg-zinc-800 text-white hover:bg-zinc-800 hover:text-white`;

type SiteHeaderProps = {
  activeSectionId: NavSectionId;
};

export function SiteHeader({ activeSectionId }: SiteHeaderProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const links: { id: NavSectionId; label: string }[] = [
    { id: sectionIds.inicio, label: t("nav.home") },
    { id: sectionIds.nosotros, label: t("nav.about") },
    { id: sectionIds.social, label: t("nav.social") },
    { id: sectionIds.actividades, label: t("nav.actividades") },
    { id: sectionIds.colabora, label: t("nav.donations") },
    { id: sectionIds.contacto, label: t("nav.contact") },
  ];

  const mobileLinkClass = (id: NavSectionId) =>
    activeSectionId === id
      ? "block rounded-lg bg-zinc-800 px-3 py-2.5 text-base font-medium text-white"
      : "block rounded-lg px-3 py-2.5 text-base text-zinc-800 hover:bg-zinc-100";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
        <a
          href={`#${sectionIds.inicio}`}
          className="shrink-0 font-serif text-lg font-bold text-zinc-800 sm:text-xl"
          onClick={(e) => handleInPageNavClick(e, sectionIds.inicio, () => setOpen(false))}
        >
          Sembrando Valores
        </a>

        <nav className="mx-auto hidden min-w-0 max-w-2xl flex-1 flex-wrap items-center justify-center gap-x-1 gap-y-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={activeSectionId === link.id ? linkActive : linkInactive}
              onClick={(e) => handleInPageNavClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <LanguageToggle />
          <button
            type="button"
            className="rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 lg:hidden"
            aria-expanded={open}
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" strokeWidth={2} /> : <Menu className="size-6" strokeWidth={2} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-zinc-200 bg-white px-4 py-3 lg:hidden" aria-label={t("nav.mobileLabel")}>
          <ul className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={mobileLinkClass(link.id)}
                  onClick={(e) => handleInPageNavClick(e, link.id, () => setOpen(false))}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
