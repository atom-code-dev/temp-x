"use client";

import { cn } from "@/lib/utils";

interface HeroPatternProps {
  className?: string;
  pattern?: "grid" | "dots" | "lines" | "hexagon";
  color?: string;
  size?: number;
  opacity?: number;
}

export function HeroPattern({
  className,
  pattern = "grid",
  color = "#e5e7eb",
  size = 20,
  opacity = 0.1,
}: HeroPatternProps) {
  const patternStyle = {
    backgroundColor: `${color}${Math.floor(opacity * 255).toString(16).padStart(2, "0")}`,
    backgroundSize: `${size}px ${size}px`,
  };

  const getPatternImage = () => {
    switch (pattern) {
      case "grid":
        return `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`;
      case "dots":
        return `radial-gradient(circle, ${color} 1px, transparent 1px)`;
      case "lines":
        return `repeating-linear-gradient(45deg, ${color}, ${color} 1px, transparent 1px, transparent ${size}px)`;
      case "hexagon":
        return `url("data:image/svg+xml,%3Csvg width='${size}' height='${size}' viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M${size/2} 0 L${size} ${size/4} L${size} ${3*size/4} L${size/2} ${size} L0 ${3*size/4} L0 ${size/4} Z' fill='none' stroke='${color.replace('#', '%23')}' stroke-width='1' opacity='${opacity}'/%3E%3C/svg%3E")`;
      default:
        return `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`;
    }
  };

  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        ...patternStyle,
        backgroundImage: getPatternImage(),
      }}
    />
  );
}