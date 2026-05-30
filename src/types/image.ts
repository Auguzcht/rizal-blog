export type ImageRef = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  sourceId: string;
  aspect?: "4/3" | "3/2" | "16/9" | "1/1";
};
