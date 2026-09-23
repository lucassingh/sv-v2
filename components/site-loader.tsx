"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { ISOLOGO_SV_STROKE_PATH, ISOLOGO_SV_VIEWBOX } from "@/components/icons/isologo-sv";

const LOADER_DURATION = 2.2;
const LOADER_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const LOADER_EXIT_DURATION_MS = 650;

/** Overlay de entrada: dibuja el contorno del isologo y cierra cuando el trazo termina. */
export function SiteLoader() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(0);
  const lastPercent = useRef(0);
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useMotionValueEvent(progress, "change", (v) => {
    const next = Math.min(100, Math.floor(v * 10) * 10);
    if (next !== lastPercent.current) {
      lastPercent.current = next;
      setPercent(next);
    }
  });

  useEffect(() => {
    if (reduceMotion) {
      progress.set(1);
      lastPercent.current = 100;
      setPercent(100);
      const t1 = setTimeout(() => setExiting(true), 200);
      return () => clearTimeout(t1);
    }
    const controls = animate(progress, 1, {
      duration: LOADER_DURATION,
      ease: LOADER_EASE,
      onComplete: () => setExiting(true),
    });
    return () => controls.stop();
  }, [reduceMotion, progress]);

  useEffect(() => {
    if (!exiting) return;
    const t2 = setTimeout(() => setVisible(false), LOADER_EXIT_DURATION_MS);
    return () => clearTimeout(t2);
  }, [exiting]);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-(--z-overlay) flex items-center justify-center overflow-hidden transition-opacity ease-[cubic-bezier(0.22,1,0.36,1)] ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${LOADER_EXIT_DURATION_MS}ms` }}
    >
      <div aria-hidden className="loader-gradient absolute inset-0" />
      <div className="relative flex flex-col items-center">
        <svg
          viewBox={ISOLOGO_SV_VIEWBOX}
          style={{ height: "clamp(11rem, 28vw, 22rem)", width: "clamp(11rem, 28vw, 22rem)" }}
          fill="none"
          aria-hidden
        >
          <motion.path
            d={ISOLOGO_SV_STROKE_PATH}
            stroke="var(--color-accent)"
            strokeWidth={0.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength: progress }}
          />
        </svg>
        <span
          aria-hidden
          className="mt-7.5 font-sans text-xs font-medium tracking-[0.32em] text-(--color-accent) tabular-nums"
        >
          {percent}%
        </span>
      </div>
      <span className="sr-only">{t("loader.status")}</span>
    </div>
  );
}
