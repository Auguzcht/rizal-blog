"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

type RevealImageProps = {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
};

export function RevealImage({ src, alt, className, aspect }: RevealImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const img = imgRef.current;
    if (!wrapper || !img) return;

    const st1 = ScrollTrigger.create({
      trigger: wrapper,
      start: "top bottom-=15%",
      end: "center center",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        wrapper.style.opacity = String(0.08 + p * 0.92);
        wrapper.style.transform = `scale(${0.92 + p * 0.08})`;
      },
    });

    const st2 = ScrollTrigger.create({
      trigger: wrapper,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        img.style.transform = `scale(${1.15 - p * 0.15}) translateY(${8 - p * 8}%)`;
      },
    });

    triggersRef.current = [st1, st2];

    return () => {
      triggersRef.current.forEach((st) => st.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn("overflow-hidden rounded-sm", className)}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
