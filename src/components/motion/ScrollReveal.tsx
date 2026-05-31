"use client";

import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./scroll-reveal.css";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: React.ReactNode;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";
};

export function ScrollReveal({
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
  as: Tag = "h2",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const splitText = useMemo(() => {
    if (typeof children !== "string") return children;
    return children.split(/(\s+)/).map((word, i) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={i}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = window;
    const triggers: ScrollTrigger[] = [];

    const st1 = ScrollTrigger.create({
      trigger: el,
      scroller,
      start: "top bottom",
      end: rotationEnd,
      scrub: true,
      onUpdate: (self) => {
        const rot = baseRotation * (1 - self.progress);
        el.style.transformOrigin = "0% 50%";
        el.style.transform = `rotate(${rot}deg)`;
      },
    });
    triggers.push(st1);

    const words = el.querySelectorAll<HTMLElement>(".word");
    if (words.length > 0) {
      words.forEach((w) => {
        w.style.opacity = String(baseOpacity);
        if (enableBlur) w.style.filter = `blur(${blurStrength}px)`;
      });

      const st2 = ScrollTrigger.create({
        trigger: el,
        scroller,
        start: "top bottom-=20%",
        end: wordAnimationEnd,
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          words.forEach((w, i) => {
            const delay = i * 0.05;
            const wordP = Math.max(0, Math.min(1, (p - delay) / (1 - delay)));
            w.style.opacity = String(baseOpacity + wordP * (1 - baseOpacity));
            if (enableBlur) {
              w.style.filter = `blur(${blurStrength * (1 - wordP)}px)`;
            }
          });
        },
      });
      triggers.push(st2);
    }

    triggersRef.current = triggers;

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, [enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <Tag className={`scroll-reveal-text ${textClassName}`}>{splitText}</Tag>
    </div>
  );
}
