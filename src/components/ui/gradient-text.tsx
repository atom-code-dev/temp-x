"use client";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export function GradientText({
  children,
  className,
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 8,
  showBorder = false,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundSize: `${colors.length * 100}%`,
    animation: `gradient ${animationSpeed}s ease infinite`,
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
  };

  return (
    <>
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      <span
        className={cn(
          "relative inline-block bg-clip-text text-transparent",
          {
            "border-2 border-transparent": showBorder,
          },
          className
        )}
        style={gradientStyle}
      >
        {children}
      </span>
    </>
  );
}