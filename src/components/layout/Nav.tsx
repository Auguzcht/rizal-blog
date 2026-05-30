"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
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
  const navRef = useRef<HTMLElement>(null);
  const active = useActiveSection(SECTION_IDS);
  const navOpen = useUIStore((s) => s.navOpen);
  const setNavOpen = useUIStore((s) => s.setNavOpen);
  const loaded = useUIStore((s) => s.loaded);
  const lenis = useLenis();

  const { scrollY } = useScroll();
  const navBg = useTransform(
    scrollY,
    [0, 200],
    ["rgba(251, 247, 236, 0)", "rgba(251, 247, 236, 0.92)"],
  );
  const navBorder = useTransform(
    scrollY,
    [0, 200],
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
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-transform duration-700",
        !loaded && "-translate-y-full",
      )}
      style={{
        backgroundColor: navBg,
        borderBottom: "1px solid",
        borderColor: navBorder,
      }}
    >
      <nav className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <button
          onClick={() => scrollToSection("hero")}
          className="font-display text-lg text-ink-700 hover:text-gold-500 transition-colors"
        >
          The Shaping of a Hero
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "text-sm tracking-wide transition-colors hover:text-gold-500",
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-ink-700"
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Toggle navigation"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {navOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {navOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-parchment-200 bg-parchment-50/95 backdrop-blur-sm"
        >
          <ul className="flex flex-col px-6 py-4 gap-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    scrollToSection(item.id);
                    setNavOpen(false);
                  }}
                  className={cn(
                    "w-full text-left text-sm tracking-wide py-1 transition-colors",
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
        </motion.div>
      )}
    </motion.header>
  );
}
