"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface HeroVideoProps {
  className?: string;
  videoSrc: string;
  posterSrc?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  overlay?: boolean;
}

export function HeroVideo({
  className,
  videoSrc,
  posterSrc,
  autoPlay = true,
  muted = true,
  loop = true,
  overlay = true,
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={videoSrc}
        poster={posterSrc}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
      />
      {overlay && (
        <div className="absolute inset-0 bg-black/30" />
      )}
      <button
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center w-full h-full group"
      >
        <div
          className={cn(
            "w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-white/30",
            isPlaying && "opacity-0 group-hover:opacity-100"
          )}
        >
          <svg
            className={cn(
              "w-8 h-8 text-white transition-transform duration-300",
              isPlaying ? "scale-75" : "scale-100"
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {isPlaying ? (
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </div>
      </button>
    </div>
  );
}