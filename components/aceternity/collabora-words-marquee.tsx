"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MutableRefObject,
} from "react";
import { useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

/** px/s — desplazamiento hacia la izquierda. */
const SPEED_BASE = 52;
const SPEED_SLOW = 18;
/** Qué tan rápido la velocidad actual converge a la objetivo (evita parpadeos al cambiar `speed` en CSS). */
const SPEED_SMOOTHING = 5.5;
const SEGMENT_COPIES = 6;

function WordChunk({
  words,
  copyIndex,
  onEnter,
  onLeave,
}: {
  words: string[];
  copyIndex: number;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <span className="inline-flex shrink-0 items-baseline" aria-hidden>
      {words.map((w, i) => (
        <span
          key={`${copyIndex}-${i}-${w}`}
          className="inline-flex cursor-default items-baseline whitespace-nowrap px-0.5"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          <span className="font-semibold tracking-tight">{w}</span>
          <span
            className="mx-1 shrink-0 font-light text-[color:var(--color-secondary)] sm:mx-2"
            aria-hidden
          >
            *
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * Marquesina continua al pie de Colaborá: bucle sin salto (wrap por ancho medido)
 * y transición suave de velocidad al hover (sin reiniciar keyframes CSS).
 */
export function CollaboraWordsMarquee() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const hoverDepthRef = useRef(0);

  const words = useMemo(() => {
    const raw = t("donation.marqueeWords");
    return raw
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [t]);

  const bump = useCallback((delta: number) => {
    hoverDepthRef.current = Math.max(0, hoverDepthRef.current + delta);
  }, []);

  const rowStyle = { fontFamily: "var(--font-family-sans)" } as const;
  const rowClass =
    "font-sans text-[clamp(1.35rem,3.8vw,2.65rem)] leading-none text-[color:var(--color-secondary)] sm:text-[clamp(1.5rem,3.2vw,2.85rem)]";

  const maskClass =
    "[mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]";

  const anchorClass =
    "pointer-events-none absolute bottom-0 left-1/2 z-[1] w-screen max-w-none -translate-x-1/2 select-none pb-2 pt-10 sm:pb-3 sm:pt-12 lg:pt-14";

  if (reduceMotion || words.length === 0) {
    return (
      <div className={cn(anchorClass)} aria-hidden>
        <p
          className={cn("mx-auto max-w-5xl px-4 text-center text-balance", rowClass)}
          style={rowStyle}
        >
          {words.join(" * ")}
        </p>
      </div>
    );
  }

  return (
    <div className={anchorClass} aria-hidden>
      <div className={cn("pointer-events-auto overflow-hidden py-1", maskClass)}>
        <MarqueeRafTrack
          words={words}
          rowClass={rowClass}
          rowStyle={rowStyle}
          hoverDepthRef={hoverDepthRef}
          onEnter={() => bump(1)}
          onLeave={() => bump(-1)}
        />
      </div>
    </div>
  );
}

function MarqueeRafTrack({
  words,
  rowClass,
  rowStyle,
  hoverDepthRef,
  onEnter,
  onLeave,
}: {
  words: string[];
  rowClass: string;
  rowStyle: CSSProperties;
  hoverDepthRef: MutableRefObject<number>;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSegmentRef = useRef<HTMLSpanElement>(null);
  const [segmentWidth, setSegmentWidth] = useState(0);
  const offsetRef = useRef(0);
  const velocityRef = useRef(SPEED_BASE);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef(0);

  useLayoutEffect(() => {
    const el = firstSegmentRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.getBoundingClientRect().width;
      if (w > 0) setSegmentWidth(w);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [words, rowClass]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || segmentWidth <= 0) return;

    const W0 = segmentWidth;
    let x0 = offsetRef.current;
    while (x0 <= -W0) x0 += W0;
    while (x0 > 0) x0 -= W0;
    offsetRef.current = x0;
    track.style.transform = `translate3d(${x0}px,0,0)`;

    const tick = (now: number) => {
      const last = lastTimeRef.current;
      lastTimeRef.current = now;
      const dt = last == null ? 0 : Math.min(0.05, (now - last) / 1000);

      const target = hoverDepthRef.current > 0 ? SPEED_SLOW : SPEED_BASE;
      const v = velocityRef.current;
      const alpha = 1 - Math.exp(-dt * SPEED_SMOOTHING);
      velocityRef.current = v + (target - v) * alpha;

      let x = offsetRef.current;
      x -= velocityRef.current * dt;

      const W = segmentWidth;
      while (x <= -W) x += W;
      while (x > 0) x -= W;

      offsetRef.current = x;
      track.style.transform = `translate3d(${x}px,0,0)`;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [segmentWidth, hoverDepthRef]);

  return (
    <div className="relative w-full" style={rowStyle}>
      <div ref={trackRef} className="flex w-max flex-row will-change-transform">
        {Array.from({ length: SEGMENT_COPIES }, (_, i) => (
          <span
            key={i}
            ref={i === 0 ? firstSegmentRef : undefined}
            className={cn("inline-flex shrink-0 items-baseline pr-6 sm:pr-10", rowClass)}
          >
            <WordChunk words={words} copyIndex={i} onEnter={onEnter} onLeave={onLeave} />
          </span>
        ))}
      </div>
    </div>
  );
}
