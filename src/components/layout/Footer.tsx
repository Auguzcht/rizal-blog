"use client";

import { useLenis } from "@/components/layout/LenisProvider";
import { FadeIn } from "@/components/motion/FadeIn";

export function Footer() {
  const lenis = useLenis();

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
    <footer className="border-t border-parchment-200 bg-parchment-100/50">
      <FadeIn>
        <div className="mx-auto max-w-screen-xl px-6 py-16 text-center">
          <p className="font-body text-body text-sepia-600 max-w-prose mx-auto">
            Built for <strong className="text-ink-700">SS038</strong>, The Life
            and Works of Rizal. Mapúa Malayan Colleges Mindanao.
          </p>

          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              onClick={() => scrollToSection("references")}
              className="font-caption text-caption text-sepia-600 hover:text-gold-500 transition-colors underline underline-offset-2"
            >
              View References
            </button>
            <span className="text-parchment-200">|</span>
            <a
              href="https://github.com/fredivo/rizal-blog"
              target="_blank"
              rel="noopener noreferrer"
              className="font-caption text-caption text-sepia-600 hover:text-gold-500 transition-colors underline underline-offset-2"
            >
              Source Code
            </a>
          </div>

          <p className="mt-8 font-script text-xl text-sepia-400">
            Ang hindi marunong lumingon sa pinanggalingan ay hindi makararating
            sa paroroonan.
          </p>

          <p className="mt-6 font-caption text-caption text-sepia-400">
            &copy; {new Date().getFullYear()} — All rights reserved. Images are
            public domain unless otherwise credited.
          </p>
        </div>
      </FadeIn>
    </footer>
  );
}
