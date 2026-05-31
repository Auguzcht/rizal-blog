"use client";

import { FaGoogle, FaGithub } from "react-icons/fa";
import { signInWithGoogle, signInWithGithub, isAuthError } from "@/lib/auth";
import { useState } from "react";
import { motion } from "motion/react";

type GuestbookSignInButtonsProps = {
  onSignIn?: () => void;
};

export function GuestbookSignInButtons({ onSignIn }: GuestbookSignInButtonsProps) {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleSignIn(provider: "google" | "github") {
    setLoading(provider);
    try {
      if (provider === "google") await signInWithGoogle();
      else await signInWithGithub();
      onSignIn?.();
    } catch (e) {
      if (isAuthError(e) && e.code !== "auth/popup-closed-by-user") {
        console.error("Sign-in error:", e.message);
      }
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 opacity-20">
        <FaGoogle size={20} />
        <FaGithub size={20} />
      </div>

      <div className="text-center">
        <p className="font-display text-lg text-ink-700">Leave your mark</p>
        <p className="font-serif-i italic text-sm text-sepia-600 mt-1">
          Sign in to pin a note on the wall
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 mt-auto">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSignIn("github")}
          disabled={loading !== null}
          className="flex items-center justify-center gap-2 w-full rounded-sm border border-sepia-400 bg-parchment-50 px-4 py-2.5 text-sm text-ink-700 hover:bg-parchment-100 transition-colors disabled:opacity-50"
        >
          <FaGithub size={16} />
          {loading === "github" ? "Please wait..." : "Continue with GitHub"}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSignIn("google")}
          disabled={loading !== null}
          className="flex items-center justify-center gap-2 w-full rounded-sm border border-sepia-400 bg-parchment-50 px-4 py-2.5 text-sm text-ink-700 hover:bg-parchment-100 transition-colors disabled:opacity-50"
        >
          <FaGoogle size={16} />
          {loading === "google" ? "Please wait..." : "Continue with Google"}
        </motion.button>
      </div>

      <p className="text-[10px] text-sepia-600 text-center">
        We only access your name and avatar
      </p>
    </div>
  );
}
