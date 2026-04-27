"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";

import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

export type AppleCardsCarouselItem = {
  src: string;
  title: string;
  /** Tema corto (se muestra en mayúscula y tamaño chico, encima del título). */
  category: string;
  /** Texto adicional bajo el título en el modal; opcional, normalmente no se usa. */
  content?: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  /** Reservado por compatibilidad con el demo de Aceternity; no se usa en nuestras cards. */
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384;
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const isMobile = () => {
    return typeof window !== "undefined" && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex: 0 }}
    >
      <div className="relative w-full">
        <div className="z-40 mb-3 flex justify-end gap-2 pr-0 sm:mb-4 md:pr-2">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-opacity disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll carousel left"
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-opacity disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll carousel right"
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-0 pb-10 [scrollbar-width:none] md:pb-16 md:pt-2 [&::-webkit-scrollbar]:hidden"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
            )}
          />

          <div
            className={cn(
              "flex w-max min-w-0 flex-row justify-start gap-4 pl-0 sm:pl-1",
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: AppleCardsCarouselItem;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  const handleClose = useCallback(() => {
    setOpen(false);
    onCardClose(index);
  }, [index, onCardClose]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, handleClose]);

  useOutsideClick(containerRef, handleClose);

  const lid = (suffix: string) =>
    layout ? `${suffix}-${index}-${card.title.slice(0, 24)}` : undefined;

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={lid("apple-card")}
              className="relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white p-4 font-sans md:p-10 dark:bg-neutral-900"
            >
              <button
                type="button"
                className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white"
                onClick={handleClose}
                aria-label="Close"
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <motion.p
                layoutId={lid("apple-category")}
                className="text-[0.65rem] font-medium uppercase leading-relaxed tracking-[0.2em] text-neutral-500 md:text-xs dark:text-neutral-400"
                style={{ fontFamily: "var(--font-family-sans)" }}
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={lid("apple-title")}
                className="mt-3 whitespace-pre-line text-2xl font-bold leading-[1.12] tracking-[var(--letter-spacing-tight)] text-neutral-800 [text-wrap:balance] sm:text-3xl md:mt-5 md:text-4xl dark:text-white"
                style={{ fontFamily: "var(--font-family-sans)" }}
              >
                {card.title}
              </motion.p>
              {card.content ? (
                <div className="pt-8 md:pt-10">{card.content}</div>
              ) : null}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        layoutId={lid("apple-card")}
        onClick={handleOpen}
        className="relative z-10 flex h-80 w-56 shrink-0 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[40rem] md:w-96 dark:bg-neutral-900"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="relative z-40 p-6 md:p-8">
          <motion.p
            layoutId={lid("apple-category")}
            className="text-left text-[0.6rem] font-medium uppercase leading-relaxed tracking-[0.18em] text-white/90 sm:text-[0.65rem] sm:tracking-[0.2em] md:text-xs"
            style={{ fontFamily: "var(--font-family-sans)" }}
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={lid("apple-title")}
            className="mt-2.5 max-w-[14rem] text-left text-lg font-bold leading-snug [text-wrap:balance] text-white whitespace-pre-line sm:max-w-xs sm:text-xl md:mt-3.5 md:text-2xl lg:text-3xl"
            style={{ fontFamily: "var(--font-family-sans)" }}
          >
            {card.title}
          </motion.p>
        </div>
        <BlurImage
          src={card.src}
          alt={card.title}
          className="absolute inset-0 z-10 h-full w-full object-cover object-center"
        />
      </motion.button>
    </>
  );
};

type BlurImageProps = {
  src: string;
  alt: string;
  className?: string;
};

/** Imagen de card sin blur: el patrón blur+onLoad dejaba la foto borrosa si el load no disparaba (caché, etc.). */
export const BlurImage = ({ src, className, alt }: BlurImageProps) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- assets locales en /public
    <img
      className={cn("h-full w-full", className)}
      src={src}
      alt={alt || "Card image"}
      loading="lazy"
      decoding="async"
    />
  );
};
