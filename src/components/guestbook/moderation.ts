const PROFANITY = new Set([
  "fuck", "shit", "ass", "bitch", "damn", "crap", "dick", "bastard",
  "piss", "slut", "whore", "cock", "cunt", "douche", "twat", "wanker",
  "putangina", "puta", "tangina", "gago", "bobo", "tanga", "ulol",
  "lintik", "leche", "yawa", "pisti", "hinayupak", "tarantado",
  "bungi", "pipi", "bingi", "pilay", "ugok", "pakyu",
]);

export function isAllowed(message: string): { ok: boolean; reason?: string } {
  if (message.trim().length === 0) return { ok: false, reason: "empty" };
  if (message.length > 240) return { ok: false, reason: "too_long" };
  const words = message.toLowerCase().split(/\s+/);
  for (const word of words) {
    const clean = word.replace(/[^a-zñäëöü]/g, "");
    if (PROFANITY.has(clean)) return { ok: false, reason: "profanity" };
  }
  return { ok: true };
}
