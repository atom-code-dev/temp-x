"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface MeteorsProps {
  className?: string;
  number?: number;
}

export function Meteors({ className, number = 20 }: MeteorsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const meteors = Array.from({ length: number }, (_, i) => {
      const meteor = document.createElement("div");
      meteor.className = "absolute top-0 left-0 w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_0_1px_#ffffff10]";
      meteor.style.transform = `rotate(${Math.random() * 360}deg) translateX(0)`;
      meteor.style.animation = `meteor ${3 + Math.random() * 5}s linear infinite`;
      meteor.style.animationDelay = `${Math.random() * 5}s`;
      meteor.style.left = `${Math.random() * 100}%`;
      meteor.style.top = `${Math.random() * 100}%`;
      return meteor;
    });

    meteors.forEach((meteor) => containerRef.current?.appendChild(meteor));

    return () => {
      meteors.forEach((meteor) => meteor.remove());
    };
  }, [number]);

  return (
    <>
      <style jsx>{`
        @keyframes meteor {
          0% {
            transform: rotate(215deg) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(215deg) translateX(-500px);
            opacity: 0;
          }
        }
      `}</style>
      <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden", className)} />
    </>
  );
}