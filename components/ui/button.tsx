import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export function Button({
  className,
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center border text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50",
        variant === "outline" ? "bg-transparent" : "border-transparent",
        className
      )}
      {...props}
    />
  );
}
