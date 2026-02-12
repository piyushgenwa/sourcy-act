"use client";

import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useActivationStore } from "@/lib/store";
import { videoMapping } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";
import VideoBackground from "@/components/ui/VideoBackground";
import ProgressDots from "@/components/ui/ProgressDots";
import WelcomeScreen from "@/components/screens/WelcomeScreen";
import CategoriesScreen from "@/components/screens/CategoriesScreen";
import ProductSwipeScreen from "@/components/screens/ProductSwipeScreen";
import StylePreferencesScreen from "@/components/screens/StylePreferencesScreen";
import BudgetScreen from "@/components/screens/BudgetScreen";
import DoneScreen from "@/components/screens/DoneScreen";

const screenTransition = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.3, ease: "easeOut" as const },
};

export default function ActivationProvider() {
  const store = useActivationStore();
  const videoSrc = videoMapping[store.currentScreen] || videoMapping.welcome;

  // Track abandonment on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (store.currentScreen !== "done" && store.startTime) {
        trackEvent({
          event: "activation_abandoned",
          data: {
            lastScreen: store.currentScreen,
            timeSpent: Date.now() - store.startTime,
          },
        });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [store.currentScreen, store.startTime]);

  const goToNext = useCallback(
    (screen: typeof store.currentScreen) => {
      store.setScreen(screen);
    },
    [store]
  );

  const handleBudgetSelect = useCallback(
    (budget: string) => {
      store.setBudget(budget);

      // Complete activation
      const totalTime = store.startTime ? Date.now() - store.startTime : 0;
      trackEvent({
        event: "activation_completed",
        data: {
          totalTime,
          preferences: {
            categories: store.selectedCategories,
            swipes: store.productSwipes,
            style: store.stylePreferences,
            budget,
          },
        },
      });

      store.setScreen("done");
    },
    [store]
  );

  const renderScreen = () => {
    switch (store.currentScreen) {
      case "welcome":
        return (
          <WelcomeScreen onStart={() => goToNext("categories")} />
        );
      case "categories":
        return (
          <CategoriesScreen
            selectedCategories={store.selectedCategories}
            onToggle={store.toggleCategory}
            onNext={() => goToNext("products")}
          />
        );
      case "products":
        return (
          <ProductSwipeScreen
            onSwipe={store.swipeProduct}
            onComplete={() => goToNext("style")}
          />
        );
      case "style":
        return (
          <StylePreferencesScreen
            onSelect={store.setStylePreference}
            onComplete={() => goToNext("budget")}
          />
        );
      case "budget":
        return <BudgetScreen onSelect={handleBudgetSelect} />;
      case "done":
        return (
          <DoneScreen
            selectedCategories={store.selectedCategories}
            productSwipes={store.productSwipes}
            stylePreferences={store.stylePreferences}
            budget={store.budget}
            onReset={store.reset}
          />
        );
    }
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      <VideoBackground src={videoSrc} />

      <div className="relative z-10 h-full w-full max-w-md mx-auto flex flex-col">
        {/* Progress dots - hidden on welcome and done screens */}
        {store.currentScreen !== "welcome" &&
          store.currentScreen !== "done" && (
            <div className="pt-6 px-6">
              <ProgressDots currentScreen={store.currentScreen} />
            </div>
          )}

        {/* Screen content */}
        <div className="flex-1 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={store.currentScreen}
              {...screenTransition}
              className="h-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
