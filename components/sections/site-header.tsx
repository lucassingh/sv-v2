"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { sectionIds, type NavSectionId } from "@/lib/section-ids";
import type { NavBackdropKind } from "@/lib/nav-surface";
import { LanguageToggle } from "@/components/language-toggle";
import { handleInPageNavClick } from "@/lib/scroll-to-section";

const PRIMARY_RGB = "47, 63, 68";
const ACCENT_RGB = "243, 240, 228";

/** Activo: en crema el secondary puro se pierde; mezcla hacia primary. En barra oscura, secondary un poco más luminoso. */
const NAV_ACTIVE_TEXT_CREAM =
  "color-mix(in srgb, var(--color-secondary) 40%, var(--color-primary) 60%)";
const NAV_ACTIVE_TEXT_INK =
  "color-mix(in srgb, var(--color-secondary) 78%, white 22%)";

type SiteHeaderProps = {
  activeSectionId: NavSectionId;
  /** Contenido bajo el nav: oscuro → barra accent; claro → barra primary */
  navBackdrop: NavBackdropKind;
};

export function SiteHeader({ activeSectionId, navBackdrop }: SiteHeaderProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const prevScrollY = useRef(0);
  const navLockUntil = useRef(0);

  /** Barra primary (oscura) cuando el contenido detrás es claro */
  const primaryNav = navBackdrop === "light";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (Date.now() < navLockUntil.current) {
        prevScrollY.current = y;
        return;
      }
      if (y < 10) {
        setVisible(true);
      } else if (y > prevScrollY.current + 4) {
        setVisible(false);
        setOpen(false);
      } else if (y < prevScrollY.current - 4) {
        setVisible(true);
      }
      prevScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: NavSectionId,
    onClose?: () => void,
  ) => {
    navLockUntil.current = Date.now() + 900;
    setVisible(true);
    handleInPageNavClick(e, id, onClose);
  };

  const links: { id: NavSectionId; label: string }[] = [
    { id: sectionIds.inicio, label: t("nav.home") },
    { id: sectionIds.nosotros, label: t("nav.about") },
    { id: sectionIds.social, label: t("nav.social") },
    { id: sectionIds.actividades, label: t("nav.actividades") },
    { id: sectionIds.colabora, label: t("nav.donations") },
    { id: sectionIds.contacto, label: t("nav.contact") },
  ];

  const headerBg = primaryNav ? "var(--color-primary)" : "var(--color-accent)";

  const logoColor = primaryNav ? "var(--color-accent)" : "var(--color-primary)";

  const linkActiveStyle = {
    color: primaryNav ? NAV_ACTIVE_TEXT_INK : NAV_ACTIVE_TEXT_CREAM,
    opacity: 1,
  } as const;

  const linkIdleClass = primaryNav
    ? "text-[rgba(243,240,228,0.7)] hover:text-[var(--color-accent)]"
    : "text-[rgba(47,63,68,0.74)] hover:text-(--color-primary)";

  const mobileRowBorder = primaryNav
    ? "border-[rgba(243,240,228,0.14)]"
    : "border-[rgba(47,63,68,0.12)]";

  const menuIconColor = primaryNav ? `rgba(${ACCENT_RGB}, 0.78)` : `rgba(${PRIMARY_RGB}, 0.72)`;

  return (
    <header
      className={`fixed top-3 left-3 right-3 z-50 sm:top-4 sm:left-5 sm:right-5 rounded-lg shadow-(--shadow-lg)
        transition-[transform,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        motion-reduce:transition-transform motion-reduce:duration-300${
        visible ? "" : " -translate-y-[calc(100%+2rem)]"
      }`}
      style={{ backgroundColor: headerBg }}
    >
      <div className="flex items-center justify-between px-5 py-3.5 sm:px-6 lg:px-8 lg:py-4">
        <a
          href={`#${sectionIds.inicio}`}
          style={{ fontFamily: "var(--font-family-serif)", color: logoColor }}
          className="shrink-0 text-sm sm:text-base lg:text-[1.05rem] leading-tight tracking-wide"
          onClick={(e) => handleNavClick(e, sectionIds.inicio, () => setOpen(false))}
        >
          Sembrando Valores
        </a>

        <nav
          className="mx-auto hidden flex-1 lg:flex items-center justify-center gap-7"
          aria-label={t("nav.mobileLabel")}
        >
          {links.map(({ id, label }) => {
            const isActive = activeSectionId === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                style={{
                  fontFamily: "var(--font-family-sans)",
                  ...(isActive ? linkActiveStyle : {}),
                }}
                className={`relative group text-[10.5px] uppercase tracking-[0.18em] pb-0.5 transition-colors duration-200${
                  isActive ? " font-semibold" : ` font-medium ${linkIdleClass}`
                }`}
                onClick={(e) => handleNavClick(e, id)}
              >
                {label}
                <span
                  aria-hidden
                  style={{
                    backgroundColor: isActive
                      ? primaryNav
                        ? NAV_ACTIVE_TEXT_INK
                        : NAV_ACTIVE_TEXT_CREAM
                      : undefined,
                  }}
                  className={`absolute bottom-0 left-0 h-px transition-[width] duration-300 ease-out${
                    isActive
                      ? " w-full"
                      : primaryNav
                        ? " w-0 bg-[rgba(243,240,228,0.88)] group-hover:w-full"
                        : " w-0 bg-(--color-primary) group-hover:w-full"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <LanguageToggle variant={primaryNav ? "headerInk" : "headerCream"} />
          <button
            type="button"
            style={{ color: menuIconColor }}
            className={`rounded p-1.5 transition-colors duration-200 lg:hidden ${
              primaryNav ? "hover:text-(--color-accent)" : "hover:text-(--color-primary)"
            }`}
            aria-expanded={open}
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open
              ? <X className="size-5" strokeWidth={1.5} />
              : <Menu className="size-5" strokeWidth={1.5} />
            }
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="px-5 pb-7 pt-1 sm:px-6"
            aria-label={t("nav.mobileLabel")}
          >
            <ul className="flex flex-col">
              {links.map(({ id, label }) => {
                const isActive = activeSectionId === id;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      style={{
                        fontFamily: "var(--font-family-sans)",
                        ...(isActive ? linkActiveStyle : {}),
                      }}
                      className={`block py-4 text-[11px] uppercase tracking-[0.18em] border-b ${mobileRowBorder} transition-colors duration-200${
                        isActive ? " font-semibold" : ` font-medium ${linkIdleClass}`
                      }`}
                      onClick={(e) => handleNavClick(e, id, () => setOpen(false))}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
