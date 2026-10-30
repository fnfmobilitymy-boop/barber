import type { CSSProperties } from "react";

// Each ID selects a unique photograph; no photograph is reused across sections.
const photographs: Record<
  string,
  { sheet: string; column: number; row: number }
> = {
  "shop-interior": { sheet: "lookbook-editorial", column: 0, row: 0 },
  "low-fade": { sheet: "lookbook-editorial", column: 1, row: 0 },
  "classic-pompadour": { sheet: "lookbook-editorial", column: 2, row: 0 },
  "shop-tools": { sheet: "lookbook-editorial", column: 0, row: 1 },
  "textured-crop": { sheet: "lookbook-editorial", column: 1, row: 1 },
  "sculpted-beard": { sheet: "lookbook-editorial", column: 2, row: 1 },
  "craft-scene": { sheet: "services-editorial", column: 0, row: 0 },
  "scissor-detail": { sheet: "services-editorial", column: 1, row: 0 },
  "signature-service": { sheet: "services-editorial", column: 2, row: 0 },
  "fade-service": { sheet: "services-editorial", column: 0, row: 1 },
  "beard-service": { sheet: "services-editorial", column: 1, row: 1 },
  "complete-service": { sheet: "services-editorial", column: 2, row: 1 },
};
export function EditorialPhoto({
  image,
  alt,
  className = "",
}: {
  image: string;
  alt: string;
  className?: string;
}) {
  const { sheet, column, row } = photographs[image];
  return (
    <div className={`editorial-photo ${className}`} data-photo-id={image}>
      <img
        loading="lazy"
        decoding="async"
        src={`${import.meta.env.BASE_URL}images/${sheet}.png`}
        alt={alt}
        style={
          { "--photo-column": column, "--photo-row": row } as CSSProperties
        }
      />
    </div>
  );
}
