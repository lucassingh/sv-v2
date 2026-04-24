"use client";

import { useEffect, useRef } from "react";

export function BackgroundGradient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;

      container.style.setProperty("--mouse-x", x.toString());
      container.style.setProperty("--mouse-y", y.toString());
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(circle 600px at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%), rgba(63, 63, 70, 0.07), rgba(63, 63, 70, 0.02))`,
      }}
    />
  );
}
