"use client";

import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { useState, useCallback } from "react";
import { Product } from "@/lib/types";

interface SwipeCardProps {
  product: Product;
  onSwipe: (liked: boolean) => void;
  isTop: boolean;
  index: number;
}

const SWIPE_THRESHOLD = 100;

export default function SwipeCard({
  product,
  onSwipe,
  isTop,
  index,
}: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const nopeOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const offset = info.offset.x;
      if (Math.abs(offset) > SWIPE_THRESHOLD) {
        setExitDirection(offset > 0 ? "right" : "left");
        onSwipe(offset > 0);
      }
    },
    [onSwipe]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setExitDirection("right");
        onSwipe(true);
      } else if (e.key === "ArrowLeft") {
        setExitDirection("left");
        onSwipe(false);
      }
    },
    [onSwipe]
  );

  // Stack effect: cards behind are slightly smaller and offset
  const stackScale = 1 - index * 0.05;
  const stackY = index * 8;

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        scale: stackScale,
        y: stackY,
        zIndex: 10 - index,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={isTop ? handleDragEnd : undefined}
      initial={{ scale: stackScale, y: stackY }}
      animate={
        exitDirection
          ? {
              x: exitDirection === "right" ? 500 : -500,
              rotate: exitDirection === "right" ? 30 : -30,
              opacity: 0,
            }
          : { scale: stackScale, y: stackY }
      }
      transition={
        exitDirection
          ? { duration: 0.3, ease: "easeOut" }
          : { type: "spring", stiffness: 300, damping: 25 }
      }
      tabIndex={isTop ? 0 : -1}
      onKeyDown={isTop ? handleKeyDown : undefined}
      role="button"
      aria-label={`${product.name}, ${product.price}. Swipe right to like, left to skip.`}
    >
      <div className="w-full h-full bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
        {/* LIKE badge */}
        <motion.div
          className="absolute top-8 right-8 px-4 py-2 border-2 border-green-400 rounded-lg"
          style={{ opacity: isTop ? likeOpacity : 0 }}
        >
          <span className="text-green-400 font-bold text-xl tracking-wider">
            LIKE
          </span>
        </motion.div>

        {/* NOPE badge */}
        <motion.div
          className="absolute top-8 left-8 px-4 py-2 border-2 border-red-400 rounded-lg"
          style={{ opacity: isTop ? nopeOpacity : 0 }}
        >
          <span className="text-red-400 font-bold text-xl tracking-wider">
            NOPE
          </span>
        </motion.div>

        {/* Product content */}
        <div className="text-center mt-4">
          <span className="text-7xl mb-6 block" role="img" aria-hidden="true">
            {product.emoji}
          </span>
          <h3 className="text-xl font-semibold text-white mb-2">
            {product.name}
          </h3>
          <p className="text-2xl font-bold text-sourcy-teal mb-4">
            {product.price}
            <span className="text-sm text-white/50 font-normal ml-1">
              /unit
            </span>
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Swipe hint */}
        {isTop && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8 text-white/40 text-sm">
            <span>&larr; Skip</span>
            <span>Like &rarr;</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
