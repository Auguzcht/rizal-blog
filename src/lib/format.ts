export function formatDate(date: Date | { toDate(): Date }) {
  const d = "toDate" in date ? date.toDate() : date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export function formatRelative(date: Date | { toDate(): Date }) {
  const d = "toDate" in date ? date.toDate() : date;
  const diff = (Date.now() - d.getTime()) / 1000;
  const rtf = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });
  const ranges: Array<[number, Intl.RelativeTimeFormatUnit]> = [
    [60, "second"],
    [3600, "minute"],
    [86400, "hour"],
    [2592000, "day"],
    [31536000, "month"],
    [Infinity, "year"],
  ];
  for (const [limit, unit] of ranges) {
    if (Math.abs(diff) < limit) {
      const prev = ranges[ranges.findIndex((r) => r[0] === limit) - 1]?.[0] ?? 1;
      return rtf.format(Math.round(diff / prev), unit);
    }
  }
  return "";
}

export function formatReference(ref: {
  authors: string[];
  year?: number;
  title: string;
  publisher?: string;
  journal?: string;
  volume?: string;
  pages?: string;
  url?: string;
}): string {
  const authorStr =
    ref.authors.length > 2
      ? `${ref.authors[0]} et al.`
      : ref.authors.join(" & ");
  const year = ref.year ? ` (${ref.year}).` : "";
  const title = ` *${ref.title}*.`;
  const pub = ref.publisher ? ` ${ref.publisher}.` : "";
  const journal = ref.journal ? ` *${ref.journal}*` : "";
  const vol = ref.volume ? ` ${ref.volume}` : "";
  const pages = ref.pages ? `, ${ref.pages}` : "";
  const url = ref.url ? ` ${ref.url}` : "";
  return `${authorStr}${year}${title}${journal}${vol}${pages}${pub}${url}`;
}
