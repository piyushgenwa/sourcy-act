"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BinaryChoice from "@/components/ui/BinaryChoice";
import ProgressBar from "@/components/ui/ProgressBar";
import { styleQuestions } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

interface StylePreferencesScreenProps {
  onSelect: (questionId: string, value: string) => void;
  onComplete: () => void;
}

export default function StylePreferencesScreen({
  onSelect,
  onComplete,
}: StylePreferencesScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleSelect = useCallback(
    (value: string) => {
      const question = styleQuestions[currentQuestion];
      onSelect(question.id, value);

      trackEvent({
        event: "style_selected",
        data: { questionId: question.id, value },
      });

      if (currentQuestion + 1 >= styleQuestions.length) {
        setTimeout(onComplete, 300);
      } else {
        setCurrentQuestion((prev) => prev + 1);
      }
    },
    [currentQuestion, onSelect, onComplete]
  );

  const question = styleQuestions[currentQuestion];

  return (
    <div className="flex flex-col h-full px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <ProgressBar
          current={currentQuestion}
          total={styleQuestions.length}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex flex-col flex-1"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {question.question}
            </h2>
            <p className="text-white/50 text-sm">
              Question {currentQuestion + 1} of {styleQuestions.length}
            </p>
          </div>

          <div className="flex-1 flex items-center">
            <BinaryChoice
              optionA={question.optionA}
              optionB={question.optionB}
              onSelect={handleSelect}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
