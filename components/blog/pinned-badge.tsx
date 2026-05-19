import { Pin } from "lucide-react";

type Props = {
  label: string;
};

export function BlogPinnedBadge({ label }: Props) {
  return (
    <span className="blog-pinned-badge">
      <Pin className="h-3.5 w-3.5 shrink-0" aria-hidden />
      {label}
    </span>
  );
}
