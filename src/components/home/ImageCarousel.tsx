"use client";

import Image from "next/image";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import type React from "react";

type Slide = {
  src: string;
  alt?: string;
  title?: string;
  subtitle?: string;
};

type Props = {
  slides: Slide[];
  variant?: "hero" | "strip";
  className?: string;
};

const AUTO_INTERVAL = 5000;
const DRAG_THRESHOLD = 40;

export function ImageCarousel({
  slides,
  variant = "hero",
  className,
}: Props) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dragStartX = useRef<number | null>(null);

  if (!slides || slides.length === 0) return null;

  const goTo = (next: number) => {
    const len = slides.length;
    setIndex(((next % len) + len) % len);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    if (!slides.length) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(next, AUTO_INTERVAL);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, slides.length]);

  const startDrag = (x: number | null) => {
    dragStartX.current = x;
  };

  const endDrag = (x: number | null) => {
    if (dragStartX.current == null || x == null) return;
    const delta = x - dragStartX.current;
    if (Math.abs(delta) > DRAG_THRESHOLD) {
      if (delta < 0) next();
      else prev();
    }
    dragStartX.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startDrag(e.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    endDrag(e.changedTouches[0]?.clientX ?? null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    startDrag(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    endDrag(e.clientX);
  };

  // STRIP VARIANT (NEW PRODUCT bandı)
  if (variant === "strip") {
    const slide = slides[index];

    return (
      <div
        className={clsx("w-full", className)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="relative w-full aspect-[5334/1043]">
              <Image
                key={slide.src + index}
                src={slide.src}
                alt={slide.alt ?? ""}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 960px, 100vw"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={clsx(
                  "h-1 rounded-full transition-all duration-300",
                  i === index
                    ? "w-8 bg-slate-800"
                    : "w-6 bg-slate-300 hover:bg-slate-400"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // HERO VARIANT
  const containerClass =
    variant === "hero"
      ? "relative w-full h-[70vh] md:h-[85vh] min-h-[500px] max-h-[800px] overflow-hidden"
      : "relative w-full max-w-5xl mx-auto h-[220px] md:h-[260px] overflow-hidden rounded-3xl shadow-lg";

  return (
    <div
      className={clsx(containerClass, className)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src + i}
          className={clsx(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            i === index ? "opacity-100 z-10" : "opacity-0"
          )}
        >
          <Image
            src={slide.src}
            alt={slide.alt ?? ""}
            fill
            priority={i === 0}
            // 1. slaytta mobilde kadrajı biraz aşağı al, desktop aynı kalsın
            className={clsx(
              "object-cover",
              i === 0 && "object-[center_40%] md:object-center"
            )}
          />

          {/* SLIDE 1 – QUALITY WALL PANELS / BUILD THE FUTURE */}
          {i === 0 ? (
            <>
              <div className="absolute inset-0">
                <div className="mx-auto flex h-full max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col justify-center gap-4 pt-24 md:pt-32 lg:pt-40 text-left text-slate-900 max-w-xl">
                    {slide.title && (
                      <p className="text-sm md:text-base tracking-[0.25em] text-slate-500 uppercase">
                        {slide.title}
                      </p>
                    )}

                    {slide.subtitle && (
                      <p className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug">
                        {slide.subtitle}
                      </p>
                    )}

                    <div className="mt-10 text-[10px] md:text-xs text-slate-500 space-y-1">
                      <p>ENF GRADE ENVIRONMENTAL-FRIENDLY BUILDING MATERIALS</p>
                      <p>EMPOWERING A HEALTHY NEW LIFESTYLE</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : i === 1 ? (
            /* SLIDE 2 – DRAW INSPIRATION FROM NATURE (yukarı alınmış) */
            <>
              <div className="absolute inset-0">
                <div className="mx-auto flex h-full max-w-7xl px-4 sm:px-6 lg:px-8">
                  {/* justify-start + padding-top ile yukarı aldık */}
                  <div className="flex flex-col justify-start gap-4 text-left text-white max-w-xl pt-20 md:pt-28 lg:pt-32">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug">
                      DRAW INSPIRATION
                      <br className="hidden md:block" />
                      {" "}FROM NATURE
                    </p>
                  </div>
                </div>

                <div className="absolute left-4 md:left-[calc((100vw-1120px)/2+1rem)] bottom-10 md:bottom-14 text-[10px] md:text-xs tracking-[0.2em] text-white/80 space-y-1">
                  <p>THE EXQUISITE CRAFTSMANSHIP</p>
                  <p>CREATES A PERFECT FUSION OF SPACE AND ART</p>
                </div>
              </div>
            </>
          ) : (
            /* SLIDE 3 ve diğerleri – üstte ortalanmış başlık */
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/25" />

              {(slide.title || slide.subtitle) && (
                <div className="absolute inset-0 flex flex-col items-center text-center px-6 md:px-16 text-white pt-16 md:pt-24 lg:pt-28">
                  {slide.title && (
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-[0.15em] mb-4 animate-fade-in">
                      {slide.title}
                    </h2>
                  )}
                  {slide.subtitle && (
                    <p className="text-sm md:text-base lg:text-lg tracking-[0.15em] opacity-90 max-w-3xl leading-relaxed animate-fade-in-delay">
                      {slide.subtitle}
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      ))}

      {/* Oklar: mobilde biraz aşağı, desktop aynı */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-4 md:left-8 top-[60%] md:top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-2xl shadow-lg transition-all duration-300 hover:scale-110"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-4 md:right-8 top-[60%] md:top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-2xl shadow-lg transition-all duration-300 hover:scale-110"
      >
        ›
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={clsx(
              "h-1 rounded-full transition-all duration-300",
              i === index
                ? "w-10 bg-white shadow-lg"
                : "w-6 bg-white/50 hover:bg-white/80"
            )}
          />
        ))}
      </div>
    </div>
  );
}
