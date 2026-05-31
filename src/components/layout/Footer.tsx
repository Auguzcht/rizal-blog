"use client";

import { FaLinkedin, FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import { useLenis } from "@/components/layout/LenisProvider";
import { FadeIn } from "@/components/motion/FadeIn";

const COLUMNS = [
  [
    { id: "biological", label: "Origins" },
    { id: "timeline", label: "Life" },
    { id: "pitfalls", label: "Heroism" },
    { id: "guestbook", label: "Guestbook" },
  ],
  [
    { id: "environmental", label: "Environment" },
    { id: "character", label: "Character" },
    { id: "legacy", label: "Legacy" },
    { id: "references", label: "References" },
  ],
];

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
        <div className="mx-auto max-w-screen-xl px-4 md:px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12">
            {/* Left: credits */}
            <div className="flex flex-col gap-3 max-w-sm">
              <p className="font-body text-body text-sm md:text-base text-sepia-600">
                Built with ᥫ᭡ for <strong className="text-ink-700">SS038</strong>, The
                Life and Works of Rizal. <br />Mapúa Malayan Colleges Mindanao.
              </p>

              <div className="flex flex-col gap-1 mt-1">
                {/* Alfred */}
                <div className="flex items-center gap-2">
                  <p className="font-body text-sm text-ink-700">
                    Alfred Dads D. Nodado{" "}
                    <span className="text-sepia-600">| BS CS 3-A321</span>
                  </p>
                  <a
                    href="https://www.linkedin.com/in/alfred-nodado-b24647251"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sepia-600 hover:text-gold-500 transition-colors"
                    aria-label="Alfred Nodado LinkedIn"
                  >
                    <FaLinkedin size={14} />
                  </a>
                  <a
                    href="https://github.com/Auguzcht"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sepia-600 hover:text-gold-500 transition-colors"
                    aria-label="Alfred Nodado GitHub"
                  >
                    <FaGithub size={14} />
                  </a>
                </div>
                <p className="font-body text-xs text-sepia-600 ml-0">
                  Full-Stack Developer and Researcher
                </p>

                {/* Hanna */}
                <div className="flex items-center gap-2 mt-2">
                  <p className="font-body text-sm text-ink-700">
                    Hanna Keziah T. Sato{" "}
                    <span className="text-sepia-600">| BS CS 3-A321</span>
                  </p>
                  <a
                    href="https://www.linkedin.com/in/hanna-keziah-sato-1811162b5/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sepia-600 hover:text-gold-500 transition-colors"
                    aria-label="Hanna Sato LinkedIn"
                  >
                    <FaLinkedin size={14} />
                  </a>
                </div>
                <p className="font-body text-xs text-sepia-600 ml-0">
                  UI/UX Designer and Researcher
                </p>
              </div>

              <a
                href="https://github.com/Auguzcht/rizal-blog"
                target="_blank"
                rel="noopener noreferrer"
                className="font-caption text-caption text-sepia-600 hover:text-gold-500 transition-colors underline underline-offset-2 mt-2 inline-flex items-center gap-1"
              >
                Source Code <ExternalLink size={12} />
              </a>
            </div>

            {/* Separator */}
            <div className="hidden md:block w-px self-stretch bg-sepia-400/30" />
            <div className="block md:hidden w-full h-px bg-sepia-400/30" />

            {/* Right: 2-column section links */}
            <div className="flex gap-10 md:gap-14">
              {COLUMNS.map((col, ci) => (
                <div key={ci} className="flex flex-col gap-y-2">
                  {col.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => scrollToSection(s.id)}
                      className="font-caption text-caption text-sepia-600 hover:text-gold-500 transition-colors text-left whitespace-nowrap"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom quote — Mi Último Adiós, opening line (verified) */}
          <p className="mt-10 font-script text-2xl md:text-3xl text-gold-500 px-4 text-center leading-relaxed">
            &ldquo;Adiós, Patria adorada, regi&oacute;n del sol querida,<br className="md:hidden" />
            Perla del Mar de Oriente, nuestro perdido Ed&eacute;n.&rdquo;
          </p>
          <p className="font-serif-i italic text-sm text-sepia-600 text-center mt-2">
            &mdash; Mi &Uacute;ltimo Adiós, stanza 1 (1896)
          </p>

          <p className="mt-6 font-caption text-caption text-xs md:text-sm text-sepia-400 text-center">
            &copy; {new Date().getFullYear()} — All rights reserved. Images are
            public domain unless otherwise credited.
          </p>
        </div>
      </FadeIn>
    </footer>
  );
}
