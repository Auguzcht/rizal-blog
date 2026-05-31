export type Image = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  sourceId: string;
  aspect?: "4/3" | "3/2" | "16/9" | "1/1" | "3/4";
  objectPosition?: string;
  wikilinkForDownload?: string;
  license?: string;
  downloadStatus?: "TODO" | "DONE";
  notes?: string;
};

export type ImageRef = {
  src: string;
  alt: string;
  caption: string;
  sourceId: string;
  objectPosition?: string;
};
