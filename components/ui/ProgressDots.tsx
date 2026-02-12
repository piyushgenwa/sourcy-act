"use client";

import { motion } from "framer-motion";
import { screenOrder } from "@/lib/data";
import { ScreenName } from "@/lib/types";

interface ProgressDotsProps {
  currentScreen: ScreenName;
}

export default function ProgressDots({ currentScreen }: ProgressDotsProps) {
  const currentIndex = screenOrder.indexOf(currentScreen);

  return (
    <div className="flex items-center gap-2 justify-center" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={screenOrder.length}>
      {screenOrder.map((screen, index) => {
        const isActive = index === currentIndex;
        const isDone = index < currentIndex;

        return (
          <motion.div
            key={screen}
            className="h-2 rounded-full"
            initial={false}
            animate={{
              width: isActive ? 32 : 8,
              backgroundColor: isActive
                ? "#ffffff"
                : isDone
                  ? "#2dd4bf"
                  : "rgba(255, 255, 255, 0.3)",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            aria-label={`Step ${index + 1}: ${screen}`}
          />
        );
      })}
    </div>
  );
}
