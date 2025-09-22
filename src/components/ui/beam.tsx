"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface BeamProps {
  className?: string;
  color?: string;
  duration?: number;
  size?: number;
}

export function Beam({
  className,
  color = "#3b82f6",
  duration = 2,
  size = 2,
}: BeamProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const beams = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 200 + 100,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      beams.forEach((beam) => {
        beam.x += Math.cos(beam.angle) * beam.speed;
        beam.y += Math.sin(beam.angle) * beam.speed;

        if (beam.x < -beam.length) beam.x = canvas.width + beam.length;
        if (beam.x > canvas.width + beam.length) beam.x = -beam.length;
        if (beam.y < -beam.length) beam.y = canvas.height + beam.length;
        if (beam.y > canvas.height + beam.length) beam.y = -beam.length;

        const endX = beam.x + Math.cos(beam.angle) * beam.length;
        const endY = beam.y + Math.sin(beam.angle) * beam.length;

        const gradient = ctx.createLinearGradient(beam.x, beam.y, endX, endY);
        gradient.addColorStop(0, color + "00");
        gradient.addColorStop(0.5, color + Math.floor(beam.opacity * 255).toString(16).padStart(2, "0"));
        gradient.addColorStop(1, color + "00");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = size;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(beam.x, beam.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [color, duration, size]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 pointer-events-none", className)}
    />
  );
}