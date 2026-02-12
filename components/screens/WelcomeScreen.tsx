"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import { trackEvent } from "@/lib/analytics";

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const handleStart = () => {
    trackEvent({ event: "activation_started" });
    onStart();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
      <GlassCard className="p-8 w-full max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.div
            className="text-6xl mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <span role="img" aria-hidden="true">
              {"\u{1F30F}"}
            </span>
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-3">
            Welcome to Sourcy
          </h1>

          <p className="text-white/70 text-base mb-8 leading-relaxed">
            Find your perfect products in 60 seconds.
            <br />
            Swipe, tap, and discover.
          </p>

          <Button onClick={handleStart} className="w-full">
            {"Let\u2019s go \u2192"}
          </Button>

          <p className="text-white/40 text-xs mt-4">
            Takes less than a minute
          </p>
        </motion.div>
      </GlassCard>
    </div>
  );
}
