"use client";

import { cn } from "@/lib/utils";

interface ShimmerButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
  onClick?: () => void;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  [key: string]: any;
}

export function ShimmerButton({
  children,
  className,
  variant = "default",
  size = "default",
  onClick,
  shimmerColor = "#ffffff",
  shimmerSize = "120px",
  borderRadius = "100px",
  shimmerDuration = "3s",
  background = "rgba(0, 0, 0, 1)",
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background overflow-hidden",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
          "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
          "h-10 py-2 px-4": size === "default",
          "h-9 px-3 rounded-md": size === "sm",
          "h-11 px-8 rounded-md": size === "lg",
        },
        className
      )}
      onClick={onClick}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div
        className="absolute inset-0 overflow-hidden rounded-md"
        style={{
          background,
        }}
      >
        <div
          className="absolute -top-[100%] left-[100%] w-[shimmerSize] h-[shimmerSize] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${shimmerColor} 0%, transparent 70%)`,
            width: shimmerSize,
            height: shimmerSize,
            animation: `shimmer ${shimmerDuration} infinite`,
          }}
        />
      </div>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </button>
  );
}