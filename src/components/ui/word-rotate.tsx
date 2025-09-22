"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  className?: string;
  duration?: number;
}

export function WordRotate({
  words,
  className,
  duration = 2000,
}: WordRotateProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <span className={cn("inline-block relative", className)}>
      {words.map((word, index) => (
        <span
          key={word}
          className={cn(
            "absolute top-0 left-0 w-full transition-all duration-500 ease-in-out",
            index === currentIndex
              ? "opacity-100 transform-none"
              : "opacity-0 translate-y-4"
          )}
        >
          {word}
        </span>
      ))}
      <span className="invisible">{words[0]}</span>
    </span>
  );
}