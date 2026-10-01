/** Decap `list` + nested `field` saves `{ [name]: string }[]`; files may use plain `string[]`. */
export function normalizeDecapStringList(values: unknown): string[] {
  if (!Array.isArray(values)) return [];
  return values
    .map((entry) => {
      if (typeof entry === "string") return entry;
      if (entry && typeof entry === "object") {
        const row = entry as Record<string, unknown>;
        const v = row.item ?? row.path;
        return typeof v === "string" ? v : "";
      }
      return "";
    })
    .filter((s) => s.length > 0);
}
