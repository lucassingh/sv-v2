"use client";

import Image from "next/image";
import { useMemo, type ReactElement } from "react";
import { useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { Pause, Play } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  Card,
  Carousel,
  type AppleCardsCarouselItem,
} from "@/components/ui/apple-cards-carousel";
import { cn } from "@/lib/utils";

const MOB_MOCK = { w: 350, h: 691, src: "/assets/4-activities/mob-mockup.png" as const };
const MOB_VIDEO = "/assets/4-activities/mob-video.mp4";

const CAROUSEL_IMAGES = [
  "/assets/4-activities/img-1.png",
  "/assets/4-activities/img-2.png",
  "/assets/4-activities/img-3.png",
  "/assets/4-activities/img-4.png",
  "/assets/4-activities/img-5.png",
  "/assets/4-activities/img-6.png",
] as const;

/**
 * Recorte pantalla sobre PNG 350×691 (mockup iPhone).
 * `top/left/right/bottom` en % del PNG para alinear con el vidrio real; el video usa zoom leve
 * para comer letterbox típico del mp4.
 */
const MOB_CLIP = {
  top: "3.85%",
  right: "6.15%",
  bottom: "3.05%",
  left: "6.15%",
  borderRadius: "2.62rem",
} as const;

const MOB_VIDEO_FILL_SCALE = 1.2;

const controlFab =
  "inline-flex shrink-0 items-center justify-center rounded-full border border-[rgba(243,240,228,0.22)] " +
  "bg-[rgba(47,63,68,0.88)] text-[var(--color-accent)] shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md " +
  "transition-[background-color,transform,box-shadow] duration-200 ease-out " +
  "hover:bg-[rgba(47,63,68,0.96)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.42)] active:scale-[0.97] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]";

type VideoManualControlsProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  playLabel: string;
  pauseLabel: string;
  compact?: boolean;
};

function VideoManualControls({ videoRef, playLabel, pauseLabel, compact }: VideoManualControlsProps) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const sync = () => setPlaying(!v.paused);
    v.addEventListener("play", sync);
    v.addEventListener("pause", sync);
    sync();
    return () => {
      v.removeEventListener("play", sync);
      v.removeEventListener("pause", sync);
    };
  }, [videoRef]);

  const requestPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    void v.play().catch(() => {
      v.muted = true;
      void v.play().catch(() => {});
    });
  }, [videoRef]);

  const requestPause = useCallback(() => {
    videoRef.current?.pause();
  }, [videoRef]);

  const playIcon = compact ? "h-7 w-7" : "h-9 w-9";
  const playCircle = compact ? "h-14 w-14" : "h-[4.25rem] w-[4.25rem]";
  const pauseFab = compact ? "h-11 w-11" : "h-12 w-12";

  if (!playing) {
    return (
      <button
        type="button"
        aria-label={playLabel}
        onClick={requestPlay}
        className={cn(
          "absolute inset-0 z-10 flex cursor-pointer items-center justify-center",
          "bg-black/42 transition-[background-color] duration-200 hover:bg-black/52",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
        )}
      >
        <span
          className={cn(
            "flex items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-secondary)] shadow-lg",
            playCircle,
          )}
          aria-hidden
        >
          <Play className={cn(playIcon, "ml-0.5")} strokeWidth={2.25} />
        </span>
      </button>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-end p-2 sm:p-3 md:p-4">
      <button
        type="button"
        aria-label={pauseLabel}
        aria-pressed={playing}
        onClick={requestPause}
        className={cn(controlFab, pauseFab, "pointer-events-auto")}
      >
        <Pause className={compact ? "h-5 w-5" : "h-5 w-5"} strokeWidth={2.25} />
      </button>
    </div>
  );
}

type IphoneDeviceFrameProps = {
  className?: string;
  videoRef: RefObject<HTMLVideoElement | null>;
  videoSrc: string;
  videoAria: string;
  mockW: number;
  mockH: number;
  mockSrc: string;
  clip: {
    top: string;
    right: string;
    bottom: string;
    left: string;
    borderRadius: string;
  };
  videoFillScale?: number;
  controlsSlot?: ReactNode;
};

function IphoneDeviceFrame({
  className,
  videoRef,
  videoSrc,
  videoAria,
  mockW,
  mockH,
  mockSrc,
  clip,
  videoFillScale = 1,
  controlsSlot,
}: IphoneDeviceFrameProps) {
  return (
    <div className={cn("relative mx-auto w-full max-w-full", className)}>
      <div className="relative w-full" style={{ aspectRatio: `${mockW} / ${mockH}` }}>
        <div
          className="absolute z-[1] overflow-hidden bg-black"
          style={{
            top: clip.top,
            right: clip.right,
            bottom: clip.bottom,
            left: clip.left,
            borderRadius: clip.borderRadius,
          }}
        >
          <div className="relative h-full w-full overflow-hidden">
            <video
              ref={videoRef}
              className="pointer-events-none absolute left-1/2 top-1/2 block min-h-full min-w-full object-cover object-center"
              style={{
                transform: `translate(-50%, -50%) scale(${videoFillScale})`,
                transformOrigin: "center center",
              }}
              src={videoSrc}
              loop
              playsInline
              preload="metadata"
              muted={false}
              aria-label={videoAria}
            />
            {controlsSlot}
          </div>
        </div>
        <Image
          src={mockSrc}
          alt=""
          width={mockW}
          height={mockH}
          className="pointer-events-none relative z-[2] h-auto w-full select-none"
          sizes="(max-width: 768px) 100vw, min(90vw, 720px)"
        />
      </div>
    </div>
  );
}

type CarouselCopy = {
  items: Array<{ category: string; title: string }>;
};

function ConstruccionDesktopAppleCarousel() {
  const { t, i18n } = useTranslation();

  const carouselItems = useMemo(() => {
    const raw = t("sections.construccion.carousel", { returnObjects: true });
    const copy = raw as CarouselCopy;
    if (!copy?.items?.length) {
      return [] as ReactElement[];
    }
    const cards: AppleCardsCarouselItem[] = copy.items.map((item, i) => ({
      src: CAROUSEL_IMAGES[i] ?? CAROUSEL_IMAGES[0],
      category: item.category,
      title: item.title,
    }));
    return cards.map((card, index) => (
      <Card key={`${card.title}-${index}`} card={card} index={index} layout />
    ));
  }, [t, i18n.language]);

  return (
    <div
      className="relative w-screen min-w-0 max-w-[100dvw] shrink-0 [margin-left:calc(50%-50vw)]"
    >
      <div className="mx-auto w-full min-w-0 max-w-[min(92rem,calc(100vw-1.5rem))] min-[1600px]:max-w-[96rem] px-3 sm:px-4">
        <Carousel items={carouselItems} />
      </div>
    </div>
  );
}

type ConstruccionVideoMockupBlockProps = {
  mobVideoAria: string;
};

export function ConstruccionVideoMockupBlock({ mobVideoAria }: ConstruccionVideoMockupBlockProps) {
  const { t } = useTranslation();
  const mobVideoRef = useRef<HTMLVideoElement>(null);
  const playLabel = t("sections.construccion.videoPlay");
  const pauseLabel = t("sections.construccion.videoPause");

  return (
    <div className="w-full max-w-[min(100%,100vw-2rem)] md:mx-auto lg:max-w-6xl xl:max-w-7xl">
      <div className="hidden w-full py-2 md:block">
        <ConstruccionDesktopAppleCarousel />
      </div>

      <div className="mx-auto w-full max-w-[280px] py-2 md:hidden">
        <IphoneDeviceFrame
          videoRef={mobVideoRef}
          videoSrc={MOB_VIDEO}
          videoAria={mobVideoAria}
          mockW={MOB_MOCK.w}
          mockH={MOB_MOCK.h}
          mockSrc={MOB_MOCK.src}
          clip={MOB_CLIP}
          videoFillScale={MOB_VIDEO_FILL_SCALE}
          controlsSlot={
            <VideoManualControls
              videoRef={mobVideoRef}
              playLabel={playLabel}
              pauseLabel={pauseLabel}
              compact
            />
          }
        />
      </div>
    </div>
  );
}
