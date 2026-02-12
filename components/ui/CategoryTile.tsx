"use client";

import { motion } from "framer-motion";
import { Category } from "@/lib/types";

interface CategoryTileProps {
  category: Category;
  selected: boolean;
  onToggle: () => void;
}

export default function CategoryTile({
  category,
  selected,
  onToggle,
}: CategoryTileProps) {
  const triggerHaptic = () => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(10);
    }
  };

  return (
    <motion.button
      onClick={() => {
        triggerHaptic();
        onToggle();
      }}
      whileTap={{ scale: 0.92 }}
      animate={{ scale: selected ? 0.95 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`
        relative flex flex-col items-center justify-center
        aspect-square rounded-2xl p-4
        bg-gradient-to-br ${category.gradient}
        transition-shadow duration-200
        focus-visible:outline-2 focus-visible:outline-sourcy-teal focus-visible:outline-offset-2
        ${selected ? "ring-2 ring-white shadow-lg" : "opacity-80 hover:opacity-100"}
      `}
      aria-label={`${category.name}${selected ? " (selected)" : ""}`}
      aria-pressed={selected}
    >
      <span className="text-3xl mb-2" role="img" aria-hidden="true">
        {category.emoji}
      </span>
      <span className="text-sm font-medium text-white">{category.name}</span>

      {/* Checkmark */}
      <motion.div
        initial={false}
        animate={{ scale: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="text-gray-900"
        >
          <path
            d="M2 7L5.5 10.5L12 3.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.button>
  );
}
