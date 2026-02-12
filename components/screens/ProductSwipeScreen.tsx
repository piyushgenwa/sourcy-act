"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import SwipeCard from "@/components/ui/SwipeCard";
import { products } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

interface ProductSwipeScreenProps {
  onSwipe: (productId: string, liked: boolean) => void;
  onComplete: () => void;
}

export default function ProductSwipeScreen({
  onSwipe,
  onComplete,
}: ProductSwipeScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = useCallback(
    (liked: boolean) => {
      const product = products[currentIndex];
      onSwipe(product.id, liked);

      trackEvent({
        event: "product_swiped",
        data: { productId: product.id, liked, position: currentIndex },
      });

      const nextIndex = currentIndex + 1;
      if (nextIndex >= products.length) {
        setTimeout(onComplete, 300);
      } else {
        setCurrentIndex(nextIndex);
      }
    },
    [currentIndex, onSwipe, onComplete]
  );

  return (
    <div className="flex flex-col h-full px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold text-white mb-2">
          Hot or not? {"\u{1F525}"}
        </h2>
        <p className="text-white/60 text-sm">
          Swipe right to like, left to skip
        </p>
      </motion.div>

      {/* Card stack */}
      <div className="relative flex-1 min-h-0">
        <div className="relative w-full h-full max-h-[400px] mx-auto">
          {products.slice(currentIndex, currentIndex + 3).map((product, i) => (
            <SwipeCard
              key={product.id}
              product={product}
              onSwipe={handleSwipe}
              isTop={i === 0}
              index={i}
            />
          ))}

          {currentIndex >= products.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center h-full"
            >
              <p className="text-white/60 text-lg">All done! Moving on...</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mt-6">
        {products.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              i < currentIndex
                ? "bg-sourcy-teal"
                : i === currentIndex
                  ? "bg-white"
                  : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
