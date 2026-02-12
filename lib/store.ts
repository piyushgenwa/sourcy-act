"use client";

import { create } from "zustand";
import { ActivationState, ScreenName } from "./types";

export const useActivationStore = create<ActivationState>((set) => ({
  currentScreen: "welcome",
  selectedCategories: [],
  productSwipes: [],
  stylePreferences: {},
  budget: null,
  startTime: null,

  setScreen: (screen: ScreenName) =>
    set((state) => ({
      currentScreen: screen,
      startTime: state.startTime ?? Date.now(),
    })),

  toggleCategory: (categoryId: string) =>
    set((state) => {
      const exists = state.selectedCategories.includes(categoryId);
      return {
        selectedCategories: exists
          ? state.selectedCategories.filter((id) => id !== categoryId)
          : [...state.selectedCategories, categoryId],
      };
    }),

  swipeProduct: (productId: string, liked: boolean) =>
    set((state) => ({
      productSwipes: [...state.productSwipes, { productId, liked }],
    })),

  setStylePreference: (questionId: string, value: string) =>
    set((state) => ({
      stylePreferences: { ...state.stylePreferences, [questionId]: value },
    })),

  setBudget: (budget: string) => set({ budget }),

  reset: () =>
    set({
      currentScreen: "welcome",
      selectedCategories: [],
      productSwipes: [],
      stylePreferences: {},
      budget: null,
      startTime: null,
    }),
}));
