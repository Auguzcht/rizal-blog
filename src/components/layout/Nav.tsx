"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useUIStore } from "@/store/useUIStore";
import { useLenis } from "@/components/layout/LenisProvider";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { id: "hero", label: "Introduction" },
  { id: "thesis", label: "Thesis" },
  { id: "biological", label: "Origins" },
  { id: "environmental", label: "Environment" },
  { id: "timeline", label: "Life" },
  { id: "character", label: "Character" },
  { id: "pitfalls", label: "Heroism" },
  { id: "legacy", label: "Legacy" },
  { id: "guestbook", label: "Guestbook" },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export function Nav() {
  const active = useActiveSection(SECTION_IDS);
  const navOpen = useUIStore((s) => s.navOpen);
  const setNavOpen = useUIStore((s) => s.setNavOpen);
  const lenis = useLenis();

  const { scrollY } = useScroll();
  const navBg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(251, 247, 236, 0)", "rgba(251, 247, 236, 0.92)"],
  );
  const navBorder = useTransform(
    scrollY,
    [0, 80],
    ["rgba(232, 218, 188, 0)", "rgba(232, 218, 188, 1)"],
  );

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 overflow-x-hidden"
      style={{
        backgroundColor: navBg,
        borderBottom: "1px solid",
        borderColor: navBorder,
      }}
    >
      {/* ── Mobile layout ── */}
      <div className="flex md:hidden items-center justify-between px-4 py-3">
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2 font-display text-base text-ink-700 hover:text-gold-500 transition-colors"
        >
          <img src="/Rizal-Logo-Transparent.png" alt="" className="w-6 h-6 object-contain" />
          Life of Rizal
        </button>
        <button
          className="flex items-center justify-center text-ink-700"
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Toggle navigation"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {navOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden md:flex items-center justify-between px-6 py-4">
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2 font-display text-lg text-ink-700 hover:text-gold-500 transition-colors"
        >
          <img src="/Rizal-Logo-Transparent.png" alt="" className="w-7 h-7 object-contain" />
          Life of Rizal
        </button>
        <ul className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "text-sm tracking-wide transition-colors hover:text-gold-500 whitespace-nowrap",
                  active === item.id
                    ? "text-ink-700 font-medium"
                    : "text-sepia-600",
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Mobile menu ── */}
      {navOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden border-t border-parchment-200 bg-parchment-50/95 backdrop-blur-sm"
        >
          <ul className="flex flex-col px-4 py-3 gap-1">
            {NAV_ITEMS.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.04,
                }}
              >
                <button
                  onClick={() => {
                    scrollToSection(item.id);
                    setNavOpen(false);
                  }}
                  className={cn(
                    "w-full text-left text-sm tracking-wide py-2.5 px-2 rounded-sm transition-colors hover:bg-parchment-100",
                    active === item.id
                      ? "text-ink-700 font-medium bg-parchment-100"
                      : "text-sepia-600",
                  )}
                >
                  {item.label}
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
