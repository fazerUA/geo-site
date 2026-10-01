"use client";

import { ImageLightbox } from "@/components/blog/image-lightbox";

type Props = {
  src: string;
  alt: string;
};

export function SpecialistPhoto({ src, alt }: Props) {
  return (
    <ImageLightbox
      src={src}
      alt={alt}
      width={160}
      height={160}
      className="about-specialist-photo"
    />
  );
}
