"use client";

import { motion } from "framer-motion";

interface ChoiceOption {
  emoji: string;
  label: string;
  value: string;
}

interface BinaryChoiceProps {
  optionA: ChoiceOption;
  optionB: ChoiceOption;
  onSelect: (value: string) => void;
}

export default function BinaryChoice({
  optionA,
  optionB,
  onSelect,
}: BinaryChoiceProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <motion.button
        onClick={() => onSelect(optionA.value)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-5 px-6 rounded-2xl bg-white/10 backdrop-blur-sm
          border border-white/20 text-white text-left
          hover:bg-white/20 transition-colors
          focus-visible:outline-2 focus-visible:outline-sourcy-teal focus-visible:outline-offset-2"
        aria-label={optionA.label}
      >
        <span className="text-2xl mr-3" role="img" aria-hidden="true">
          {optionA.emoji}
        </span>
        <span className="text-lg font-medium">{optionA.label}</span>
      </motion.button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-white/20" />
        <span className="text-white/50 text-sm font-medium">or</span>
        <div className="flex-1 h-px bg-white/20" />
      </div>

      <motion.button
        onClick={() => onSelect(optionB.value)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-5 px-6 rounded-2xl bg-white/10 backdrop-blur-sm
          border border-white/20 text-white text-left
          hover:bg-white/20 transition-colors
          focus-visible:outline-2 focus-visible:outline-sourcy-teal focus-visible:outline-offset-2"
        aria-label={optionB.label}
      >
        <span className="text-2xl mr-3" role="img" aria-hidden="true">
          {optionB.emoji}
        </span>
        <span className="text-lg font-medium">{optionB.label}</span>
      </motion.button>
    </div>
  );
}
