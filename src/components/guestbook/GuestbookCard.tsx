"use client";

import { motion } from "motion/react";
import type { GuestbookPost } from "@/types/guestbook";
import { formatDate } from "@/lib/format";
import { paletteFor, doodleFor, tiltFor } from "./cardPalette";
import { useState } from "react";
import { User } from "lucide-react";
import { cn } from "@/lib/cn";

const AUTHORS = ["Alfred Nodado", "Alfred Dads D. Nodado", "Hanna Keziah T. Sato", "Hanna Sato"];

function isAuthor(name: string): boolean {
  return AUTHORS.some((a) => name.toLowerCase().includes(a.toLowerCase()));
}

type GuestbookCardProps = {
  post: GuestbookPost;
  isComposer?: boolean;
  index?: number;
};

export function GuestbookCard({ post, isComposer, index = 0 }: GuestbookCardProps) {
  const [imgError, setImgError] = useState(false);

  if (isComposer) return null;

  const pal = paletteFor(post.id, index);
  const doodle = doodleFor(post.id);
  const tilt = tiltFor(index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: tilt }}
      whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "rounded-sm border shadow-paper p-5 flex flex-col gap-3",
        "transition-shadow duration-300",
      )}
      style={{
        backgroundColor: pal.bg,
        borderColor: pal.border,
        color: pal.text,
      }}
    >
      {/* Doodle */}
      <span
        className="text-lg opacity-20 select-none self-end"
        style={{ color: pal.accent }}
        aria-hidden="true"
      >
        {doodle}
      </span>

      {/* Message */}
      <p className="font-body text-sm leading-relaxed flex-1">{post.message}</p>

      {/* Footer */}
      <div className="flex items-center gap-2 pt-2 border-t" style={{ borderColor: pal.border }}>
        {post.avatarUrl && !imgError ? (
          <img
            src={post.avatarUrl}
            alt=""
            className="w-7 h-7 rounded-full object-cover shrink-0"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: pal.accent, color: pal.bg }}
            aria-hidden="true"
          >
            <User size={14} />
          </div>
        )}
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium truncate">
            {post.name}
            {isAuthor(post.name) && (
              <span className="text-[10px] ml-1.5 px-1.5 py-0.5 rounded-sm font-medium"
                style={{ backgroundColor: pal.accent, color: pal.bg }}
              >
                Author
              </span>
            )}
            {post.attribution && (
              <span className="opacity-60 ml-1">· {post.attribution}</span>
            )}
          </span>
          <span className="text-[10px] opacity-50">
            {post.createdAt?.toDate ? formatDate(post.createdAt.toDate()) : ""}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
