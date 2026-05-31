"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/useAuthStore";
import { useGuestbookStore } from "@/store/useGuestbookStore";
import { listPosts } from "@/lib/firestore";
import { GuestbookCard } from "./GuestbookCard";
import { GuestbookSignInButtons } from "./GuestbookSignInButtons";
import { GuestbookComposeDialog } from "./GuestbookComposeDialog";
import { paletteFor, tiltFor } from "./cardPalette";

export function Guestbook() {
  const user = useAuthStore((s) => s.user);
  const posts = useGuestbookStore((s) => s.posts);
  const setPosts = useGuestbookStore((s) => s.setPosts);
  const cursor = useGuestbookStore((s) => s.cursor);
  const setCursor = useGuestbookStore((s) => s.setCursor);
  const hasMore = useGuestbookStore((s) => s.hasMore);
  const setHasMore = useGuestbookStore((s) => s.setHasMore);
  const clearDraft = useGuestbookStore((s) => s.clearDraft);

  const [composeOpen, setComposeOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [composerImgErr, setComposerImgErr] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const result = await listPosts();
        setPosts(result.posts);
        setCursor(result.nextCursor ?? null);
        setHasMore(result.hasMore);
      } catch (e) {
        console.error("Failed to load guestbook:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function loadMore() {
    if (!cursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const result = await listPosts(cursor);
      useGuestbookStore.getState().appendPosts(result.posts);
      setCursor(result.nextCursor ?? null);
      setHasMore(result.hasMore);
    } catch (e) {
      console.error("Failed to load more:", e);
    } finally {
      setLoadingMore(false);
    }
  }

  function openCompose() {
    clearDraft();
    setComposeOpen(true);
  }

  // First card: sign-in or composer
  const firstCardPal = paletteFor("first-card", 0);
  const firstTilt = tiltFor(0);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* ── First card: sign-in / composer ── */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: firstTilt }}
          whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-sm border shadow-paper p-5 flex flex-col gap-3 transition-shadow duration-300"
          style={{
            backgroundColor: firstCardPal.bg,
            borderColor: firstCardPal.border,
            color: firstCardPal.text,
          }}
        >
          {user ? (
            <div className="flex flex-col gap-4 h-full">
              <div className="flex items-center gap-3">
              {user.photoURL && !composerImgErr ? (
                <img
                  src={user.photoURL}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                  onError={() => setComposerImgErr(true)}
                />
              ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: firstCardPal.accent, color: firstCardPal.bg }}
                  >
                    <User size={18} />
                  </div>
                )}
                <div>
                  <p className="font-display text-sm text-ink-700">{user.name}</p>
                  <p className="font-serif-i italic text-xs text-sepia-600">Signed in</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 mt-auto">
                <Button variant="accent" onClick={openCompose} size="sm">
                  Write a Message
                </Button>
              </div>
            </div>
          ) : (
            <GuestbookSignInButtons onSignIn={openCompose} />
          )}
        </motion.div>

        {/* ── Post cards ── */}
        {loading ? (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center py-12">
            <p className="font-serif-i italic text-sepia-600">Loading voices...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center py-12">
            <p className="font-serif-i italic text-sepia-600">
              No messages yet. Be the first to leave your mark.
            </p>
          </div>
        ) : (
          posts.map((post, i) => (
            <GuestbookCard key={post.id} post={post} index={i + 1} />
          ))
        )}
      </div>

      {/* Load more */}
      {hasMore && posts.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? (
              <span className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Loading...
              </span>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}

      <GuestbookComposeDialog open={composeOpen} onOpenChange={setComposeOpen} />
    </div>
  );
}
