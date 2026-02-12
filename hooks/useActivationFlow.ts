"use client";

import { useCallback } from "react";
import { useActivationStore } from "@/lib/store";
import { trackEvent } from "@/lib/analytics";
import { screenOrder } from "@/lib/data";
import { ScreenName } from "@/lib/types";

export function useActivationFlow() {
  const store = useActivationStore();

  const goToNext = useCallback(() => {
    const currentIndex = screenOrder.indexOf(store.currentScreen);
    if (currentIndex < screenOrder.length - 1) {
      const nextScreen = screenOrder[currentIndex + 1] as ScreenName;
      store.setScreen(nextScreen);
    }
  }, [store]);

  const goToPrevious = useCallback(() => {
    const currentIndex = screenOrder.indexOf(store.currentScreen);
    if (currentIndex > 0) {
      const prevScreen = screenOrder[currentIndex - 1] as ScreenName;
      store.setScreen(prevScreen);
    }
  }, [store]);

  const completeActivation = useCallback(() => {
    const totalTime = store.startTime ? Date.now() - store.startTime : 0;
    trackEvent({
      event: "activation_completed",
      data: {
        totalTime,
        preferences: {
          categories: store.selectedCategories,
          swipes: store.productSwipes,
          style: store.stylePreferences,
          budget: store.budget,
        },
      },
    });
  }, [store]);

  return {
    ...store,
    goToNext,
    goToPrevious,
    completeActivation,
  };
}
