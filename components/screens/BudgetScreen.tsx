"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { budgetOptions } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

interface BudgetScreenProps {
  onSelect: (budget: string) => void;
}

export default function BudgetScreen({ onSelect }: BudgetScreenProps) {
  const handleSelect = (budgetId: string) => {
    trackEvent({ event: "budget_selected", data: { budget: budgetId } });
    onSelect(budgetId);
  };

  return (
    <div className="flex flex-col h-full px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-2">
          {"What\u2019s your price point? \u{1F4B8}"}
        </h2>
        <p className="text-white/60 text-sm">Per-unit cost range you target</p>
      </motion.div>

      <div className="flex flex-col gap-3 flex-1">
        {budgetOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
          >
            <GlassCard
              className="p-5 cursor-pointer hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(option.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(option.id);
                }
              }}
              aria-label={`${option.label}: ${option.range} - ${option.desc}`}
            >
              <div className="flex items-center gap-4">
                <span
                  className="text-3xl"
                  role="img"
                  aria-hidden="true"
                >
                  {option.emoji}
                </span>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-lg font-semibold text-white">
                      {option.label}
                    </h3>
                    <span className="text-sourcy-teal font-bold">
                      {option.range}
                    </span>
                  </div>
                  <p className="text-white/50 text-sm">{option.desc}</p>
                </div>
                <svg
                  className="w-5 h-5 text-white/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
