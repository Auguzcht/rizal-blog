"use client";

import { Section } from "./Section";
import { Guestbook } from "@/components/guestbook";

export function GuestbookSection() {
  return (
    <Section
      id="guestbook"
      eyebrow="Echoes of the Wall"
      title="Words That Echo Always"
      full
    >
      <p className="prose-rizal max-w-[65ch] mb-12">
        What thoughts does Rizal&apos;s story stir in you? Leave your mark on
        this wall — a reflection, a favorite quote, a question. Your voice joins
        the chorus of those who continue to think about the man and his meaning.
      </p>

      <Guestbook />
    </Section>
  );
}
