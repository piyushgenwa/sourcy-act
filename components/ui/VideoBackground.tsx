"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoBackgroundProps {
  src: string;
  fallbackGradient?: string;
}

export default function VideoBackground({
  src,
  fallbackGradient = "from-gray-900 via-gray-800 to-black",
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setIsLoaded(false);
    setCurrentSrc(src);
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setIsLoaded(true);
    video.addEventListener("canplay", handleCanPlay);

    video.load();

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [currentSrc]);

  return (
    <div className="fixed inset-0 z-0">
      {/* Fallback gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient}`}
      />

      {/* Video */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            key={currentSrc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src={currentSrc} type="video/mp4" />
            </video>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />
    </div>
  );
}
