"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface ConfettiProps {
  className?: string;
  colors?: string[];
  count?: number;
  size?: number;
  duration?: number;
}

export function Confetti({
  className,
  colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"],
  count = 100,
  size = 10,
  duration = 3000,
}: ConfettiProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const confetti = Array.from({ length: count }, (_, i) => {
      const particle = document.createElement("div");
      particle.className = "absolute w-2 h-2 rounded-full";
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = "50%";
      particle.style.top = "50%";
      particle.style.transform = "translate(-50%, -50%)";
      particle.style.animation = `confetti-fall ${duration + Math.random() * 2000}ms ease-out forwards`;
      particle.style.animationDelay = `${Math.random() * 1000}ms`;
      
      const angle = (Math.PI * 2 * i) / count;
      const velocity = 5 + Math.random() * 10;
      const gravity = 0.5;
      
      particle.style.setProperty("--tx", `${Math.cos(angle) * velocity * 50}px`);
      particle.style.setProperty("--ty", `${Math.sin(angle) * velocity * 50}px`);
      
      return particle;
    });

    confetti.forEach((particle) => containerRef.current?.appendChild(particle));

    const style = document.createElement("style");
    style.textContent = `
      @keyframes confetti-fall {
        0% {
          transform: translate(-50%, -50%) translate(0, 0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) translate(var(--tx), calc(var(--ty) + 200px)) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      confetti.forEach((particle) => particle.remove());
      style.remove();
    };
  }, [colors, count, size, duration]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 pointer-events-none", className)} />
  );
}