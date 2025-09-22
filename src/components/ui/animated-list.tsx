"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface AnimatedListProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

export function AnimatedList({ className, children, delay = 100 }: AnimatedListProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className={cn("space-y-4", className)}>
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <div
            key={index}
            className={cn(
              "transition-all duration-500 ease-out",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{
              transitionDelay: isVisible ? `${index * delay}ms` : "0ms",
            }}
          >
            {child}
          </div>
        ))
      ) : (
        <div
          className={cn(
            "transition-all duration-500 ease-out",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          )}
          style={{
            transitionDelay: isVisible ? `${delay}ms` : "0ms",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}