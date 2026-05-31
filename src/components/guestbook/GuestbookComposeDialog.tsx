"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useAuthStore } from "@/store/useAuthStore";
import { useGuestbookStore } from "@/store/useGuestbookStore";
import { createPost } from "@/lib/firestore";
import { isAllowed } from "./moderation";
import type { GuestbookPostInput } from "@/types/guestbook";

type GuestbookComposeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function GuestbookComposeDialog({
  open,
  onOpenChange,
}: GuestbookComposeDialogProps) {
  const user = useAuthStore((s) => s.user);
  const draft = useGuestbookStore((s) => s.draft);
  const setDraft = useGuestbookStore((s) => s.setDraft);
  const clearDraft = useGuestbookStore((s) => s.clearDraft);
  const prependPost = useGuestbookStore((s) => s.prependPost);

  const [attribution, setAttribution] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [avatarErr, setAvatarErr] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setError(null);

    const check = isAllowed(draft);
    if (!check.ok) {
      setError(
        check.reason === "empty"
          ? "Please write a message."
          : check.reason === "too_long"
            ? "Message must be 240 characters or fewer."
            : "Message contains inappropriate language.",
      );
      return;
    }

    if (!user) {
      setError("Please sign in first.");
      return;
    }

    setSubmitting(true);
    try {
      const name = user.name?.trim() || "Anonymous";

      const input: GuestbookPostInput = {
        uid: user.uid,
        name,
        message: draft.trim(),
        attribution: attribution.trim() || undefined,
        avatarUrl: user.photoURL ?? undefined,
        provider: user.provider ?? "google.com",
      };

      // Optimistic post
      const tempId = `temp-${Date.now()}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      prependPost({ ...input, id: tempId, createdAt: new Date() as any });

      const realId = await createPost(input);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      useGuestbookStore.getState().replacePost(tempId, { ...input, id: realId, createdAt: new Date() as any });

      clearDraft();
      setAttribution("");
      onOpenChange(false);
    } catch (e) {
      setError("Something went wrong. Please try again.");
      console.error("Post error:", e);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave Your Mark</DialogTitle>
          <DialogDescription>
            Share your thoughts on Rizal&apos;s story.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* User info — read-only from auth */}
          <div className="flex items-center gap-3 p-3 rounded-sm bg-parchment-100">
            {user?.photoURL && !avatarErr ? (
              <img
                src={user.photoURL}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
                onError={() => setAvatarErr(true)}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-sepia-400 flex items-center justify-center text-parchment-50">
                <User size={14} />
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-body text-sm text-ink-700">
                {user?.name ?? "Anonymous"}
              </span>
              <span className="font-caption text-[10px] text-sepia-600">
                Name from your account
              </span>
            </div>
          </div>

          <Input
            placeholder="Attribution (optional) — e.g., BS CS, Mapúa MCM"
            value={attribution}
            onChange={(e) => setAttribution(e.target.value)}
            maxLength={60}
          />

          <div className="relative">
            <Textarea
              placeholder="Write your message..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={240}
              rows={4}
            />
            <span className="absolute bottom-2 right-3 text-[10px] text-sepia-600">
              {draft.length}/240
            </span>
          </div>

          {error && <p className="text-xs text-blood-600">{error}</p>}

          <Button
            variant="accent"
            onClick={handleSubmit}
            disabled={submitting || !draft.trim()}
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Posting...
              </span>
            ) : (
              "Post Message"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
