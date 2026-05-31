"use client";

import { useEffect, useState } from "react";

const STYLE_ID = "ios-cursor-style";

export function IosCursor() {
  const [reduced] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    if (reduced) return;

    // Create ring
    const ring = document.createElement("div");
    ring.style.position = "fixed";
    ring.style.top = "0";
    ring.style.left = "0";
    ring.style.width = "38px";
    ring.style.height = "38px";
    ring.style.borderRadius = "50%";
    ring.style.border = "2px solid rgba(251,247,236,0.5)";
    ring.style.background = "rgba(251,247,236,0.08)";
    ring.style.boxShadow = "0 0 0 1px rgba(30,22,17,0.12), 0 2px 8px rgba(30,22,17,0.08)";
    ring.style.pointerEvents = "none";
    ring.style.zIndex = "2147483647";
    document.body.appendChild(ring);

    // Create dot
    const dot = document.createElement("div");
    dot.style.position = "fixed";
    dot.style.top = "0";
    dot.style.left = "0";
    dot.style.width = "10px";
    dot.style.height = "10px";
    dot.style.borderRadius = "50%";
    dot.style.backgroundColor = "#FBF7EC";
    dot.style.boxShadow = "0 0 0 1.5px rgba(30,22,17,0.2), 0 2px 6px rgba(30,22,17,0.15)";
    dot.style.pointerEvents = "none";
    dot.style.zIndex = "2147483647";
    document.body.appendChild(dot);

    // Add cursor style
    const styleEl = document.createElement("style");
    styleEl.id = STYLE_ID;
    styleEl.textContent =
      "*, *::before, *::after, input, textarea, select, [contenteditable] { cursor: none !important; }";
    document.head.appendChild(styleEl);

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotP = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringP = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const pos = () => {
      ring.style.transform = `translate3d(${ringP.x - 19}px, ${ringP.y - 19}px, 0)`;
      dot.style.transform = `translate3d(${dotP.x - 5}px, ${dotP.y - 5}px, 0)`;
    };

    pos();

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", onMove);

    let id = 0;
    const tick = () => {
      dotP.x += (mouse.x - dotP.x) * 0.3;
      dotP.y += (mouse.y - dotP.y) * 0.3;
      ringP.x += (dotP.x - ringP.x) * 0.1;
      ringP.y += (dotP.y - ringP.y) * 0.1;
      pos();
      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(id);
      styleEl.remove();
      ring.remove();
      dot.remove();
    };
  }, [reduced]);

  return null;
}
