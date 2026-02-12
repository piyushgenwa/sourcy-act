"use client";

import { motion } from "framer-motion";
import CategoryTile from "@/components/ui/CategoryTile";
import Button from "@/components/ui/Button";
import { categories } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

interface CategoriesScreenProps {
  selectedCategories: string[];
  onToggle: (categoryId: string) => void;
  onNext: () => void;
}

export default function CategoriesScreen({
  selectedCategories,
  onToggle,
  onNext,
}: CategoriesScreenProps) {
  const canProceed = selectedCategories.length >= 1;

  const handleNext = () => {
    trackEvent({
      event: "categories_selected",
      data: { categories: selectedCategories },
    });
    onNext();
  };

  return (
    <div className="flex flex-col h-full px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold text-white mb-2">
          {"What\u2019s your niche?"}
        </h2>
        <p className="text-white/60 text-sm">
          Pick the categories you sell (or want to)
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-3 gap-3 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * index, duration: 0.2 }}
          >
            <CategoryTile
              category={category}
              selected={selectedCategories.includes(category.id)}
              onToggle={() => onToggle(category.id)}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-auto">
        <Button onClick={handleNext} disabled={!canProceed} className="w-full">
          {canProceed
            ? `Continue with ${selectedCategories.length} selected`
            : "Select at least 1 category"}
        </Button>
      </div>
    </div>
  );
}
