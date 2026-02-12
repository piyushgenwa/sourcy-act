"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import { categories, budgetOptions } from "@/lib/data";

interface DoneScreenProps {
  selectedCategories: string[];
  productSwipes: { productId: string; liked: boolean }[];
  stylePreferences: Record<string, string>;
  budget: string | null;
  onReset: () => void;
}

export default function DoneScreen({
  selectedCategories,
  productSwipes,
  stylePreferences,
  budget,
  onReset,
}: DoneScreenProps) {
  const likedCount = productSwipes.filter((s) => s.liked).length;
  const budgetLabel = budgetOptions.find((b) => b.id === budget);
  const categoryNames = selectedCategories
    .map((id) => categories.find((c) => c.id === id)?.name)
    .filter(Boolean);

  return (
    <div className="flex flex-col h-full px-6 py-8 overflow-y-auto no-scrollbar">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="text-center mb-6"
      >
        <span className="text-6xl block mb-4" role="img" aria-hidden="true">
          {"\u{1F389}"}
        </span>
        <h2 className="text-3xl font-bold text-white mb-2">
          {"You\u2019re all set!"}
        </h2>
        <p className="text-white/60">
          {"Here\u2019s what we learned about you"}
        </p>
      </motion.div>

      <div className="flex flex-col gap-3">
        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="p-4">
            <h3 className="text-sm font-medium text-white/50 mb-2">
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {categoryNames.map((name) => (
                <span
                  key={name}
                  className="px-3 py-1 rounded-full bg-sourcy-teal/20 text-sourcy-teal text-sm"
                >
                  {name}
                </span>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Product preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-4">
            <h3 className="text-sm font-medium text-white/50 mb-2">
              Product Taste
            </h3>
            <p className="text-white">
              Liked{" "}
              <span className="font-bold text-sourcy-teal">{likedCount}</span>{" "}
              out of {productSwipes.length} products
            </p>
          </GlassCard>
        </motion.div>

        {/* Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="p-4">
            <h3 className="text-sm font-medium text-white/50 mb-2">
              Your Style
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.values(stylePreferences).map((value) => (
                <span
                  key={value}
                  className="px-3 py-1 rounded-full bg-white/10 text-white text-sm capitalize"
                >
                  {value}
                </span>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Budget */}
        {budgetLabel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard className="p-4">
              <h3 className="text-sm font-medium text-white/50 mb-2">
                Budget
              </h3>
              <p className="text-white">
                {budgetLabel.emoji} {budgetLabel.label} ({budgetLabel.range})
              </p>
            </GlassCard>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-col gap-3"
      >
        <Button className="w-full">
          {"View my matches \u2192"}
        </Button>
        <Button variant="ghost" onClick={onReset} className="w-full">
          Start over
        </Button>
      </motion.div>
    </div>
  );
}
