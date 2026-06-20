"use client";

import { useState, useCallback, useEffect } from "react";

export function ImageLightbox({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="blog-prose-img"
        onClick={() => setOpen(true)}
        style={{ cursor: "zoom-in" }}
      />
      {open && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.85)",
            cursor: "zoom-out",
            padding: "2rem",
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              borderRadius: "0.5rem",
            }}
          />
        </div>
      )}
    </>
  );
}
