"use client";

import { forwardRef, useMemo, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import "./variable-proximity.css";

function useAnimationFrame(callback: () => void) {
  const cbRef = useRef(callback);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  cbRef.current = callback;

  useEffect(() => {
    let frameId: number;
    const loop = () => {
      cbRef.current();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);
}

function useMousePositionRef(containerRef: React.RefObject<HTMLDivElement | null>) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev: MouseEvent) =>
      updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

type VariableProximityProps = {
  label: string;
  fromFontVariationSettings?: string;
  toFontVariationSettings?: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  radius?: number;
  falloff?: "linear" | "exponential" | "gaussian";
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
};

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>(
  (
    {
      label,
      fromFontVariationSettings = "'wght' 400",
      toFontVariationSettings = "'wght' 700",
      containerRef,
      radius = 100,
      falloff = "linear",
      className = "",
      onClick,
      style,
    },
    ref,
  ) => {
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const interpolatedSettingsRef = useRef<string[]>([]);
    const mousePositionRef = useMousePositionRef(containerRef);
    const lastPositionRef = useRef({ x: 0, y: 0 });

    const parsedSettings = useMemo(() => {
      const parseSettings = (str: string) =>
        new Map(
          str
            .split(",")
            .map((s) => s.trim())
            .map((s) => {
              const [name, value] = s.split(" ");
              return [name.replace(/['"]/g, ""), parseFloat(value)];
            }),
        );

      const from = parseSettings(fromFontVariationSettings);
      const to = parseSettings(toFontVariationSettings);

      return Array.from(from.entries()).map(([axis, fromValue]) => ({
        axis,
        fromValue,
        toValue: to.get(axis) ?? fromValue,
      }));
    }, [fromFontVariationSettings, toFontVariationSettings]);

    const dist = (x1: number, y1: number, x2: number, y2: number) =>
      Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    const calcFalloff = useCallback(
      (distance: number) => {
        const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
        switch (falloff) {
          case "exponential":
            return norm ** 2;
          case "gaussian":
            return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
          case "linear":
          default:
            return norm;
        }
      },
      [radius, falloff],
    );

    useAnimationFrame(() => {
      if (!containerRef?.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const { x, y } = mousePositionRef.current;
      if (
        lastPositionRef.current.x === x &&
        lastPositionRef.current.y === y
      ) {
        return;
      }
      lastPositionRef.current = { x, y };

      letterRefs.current.forEach((letterRef, i) => {
        if (!letterRef) return;

        const rect = letterRef.getBoundingClientRect();
        const cx = rect.left + rect.width / 2 - containerRect.left;
        const cy = rect.top + rect.height / 2 - containerRect.top;
        const distance = dist(x, y, cx, cy);

        if (distance >= radius) {
          letterRef.style.fontVariationSettings = fromFontVariationSettings;
          return;
        }

        const f = calcFalloff(distance);
        const settings = parsedSettings
          .map(({ axis, fromValue, toValue }) => {
            const v = fromValue + (toValue - fromValue) * f;
            return `'${axis}' ${v}`;
          })
          .join(", ");

        interpolatedSettingsRef.current[i] = settings;
        letterRef.style.fontVariationSettings = settings;
      });
    });

    const words = label.split(" ");
    let letterIndex = 0;

    return (
      <span
        ref={ref}
        className={`${className} variable-proximity`}
        onClick={onClick}
        style={{ display: "inline", ...style }}
      >
        {words.map((word, wi) => (
          <span
            key={wi}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {word.split("").map((letter) => {
              const ci = letterIndex++;
              return (
                <motion.span
                  key={ci}
                  ref={(el) => {
                    letterRefs.current[ci] = el;
                  }}
                  style={{
                    display: "inline-block",
                    fontVariationSettings:
                      interpolatedSettingsRef.current[ci],
                  }}
                  aria-hidden="true"
                >
                  {letter}
                </motion.span>
              );
            })}
            {wi < words.length - 1 && (
              <span style={{ display: "inline-block" }}>&nbsp;</span>
            )}
          </span>
        ))}
        <span className="sr-only">{label}</span>
      </span>
    );
  },
);

VariableProximity.displayName = "VariableProximity";
export default VariableProximity;
