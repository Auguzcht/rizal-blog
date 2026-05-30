"use client";

import { Section } from "./Section";
import { Button } from "@/components/ui/Button";

export function GuestbookSection() {
  return (
    <Section
      id="guestbook"
      eyebrow="Echoes of the Wall"
      title="Words That Echo Always"
    >
      <p>
        What thoughts does Rizal&apos;s story stir in you? Leave your mark on
        this wall — a reflection, a favorite quote, a question. Your voice joins
        the chorus of those who continue to think about the man and his meaning.
      </p>

      <div className="mt-12 p-8 border-2 border-dashed border-sepia-400 rounded-sm text-center">
        <p className="font-serif-i italic text-body-lg text-sepia-600 mb-6">
          The guestbook will be available once Firebase is connected. Sign in with
          Google or GitHub to leave your message.
        </p>
        <Button variant="accent" disabled>
          Leave Your Mark
        </Button>
      </div>
    </Section>
  );
}
