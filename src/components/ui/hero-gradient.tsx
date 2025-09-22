"use client";

import { cn } from "@/lib/utils";

interface HeroGradientProps {
  className?: string;
  type?: "linear" | "radial" | "conic";
  colors?: string[];
  direction?: string;
  position?: string;
  size?: string;
}

export function HeroGradient({
  className,
  type = "linear",
  colors = ["#3b82f6", "#8b5cf6", "#ec4899"],
  direction = "to bottom right",
  position = "center",
  size = "100% 100%",
}: HeroGradientProps) {
  const getGradient = () => {
    switch (type) {
      case "linear":
        return `linear-gradient(${direction}, ${colors.join(", ")})`;
      case "radial":
        return `radial-gradient(circle at ${position}, ${colors.join(", ")})`;
      case "conic":
        return `conic-gradient(from 0deg at ${position}, ${colors.join(", ")})`;
      default:
        return `linear-gradient(${direction}, ${colors.join(", ")})`;
    }
  };

  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        background: getGradient(),
        backgroundSize: size,
      }}
    />
  );
}