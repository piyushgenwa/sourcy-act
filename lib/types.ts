export type ScreenName =
  | "welcome"
  | "categories"
  | "products"
  | "style"
  | "budget"
  | "done";

export interface Category {
  id: string;
  name: string;
  emoji: string;
  gradient: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  emoji: string;
  tags: string[];
}

export interface StyleQuestion {
  id: string;
  question: string;
  optionA: {
    emoji: string;
    label: string;
    value: string;
  };
  optionB: {
    emoji: string;
    label: string;
    value: string;
  };
}

export interface BudgetOption {
  id: string;
  label: string;
  range: string;
  emoji: string;
  desc: string;
}

export interface ProductSwipe {
  productId: string;
  liked: boolean;
}

export interface ActivationState {
  currentScreen: ScreenName;
  selectedCategories: string[];
  productSwipes: ProductSwipe[];
  stylePreferences: Record<string, string>;
  budget: string | null;
  startTime: number | null;

  // Actions
  setScreen: (screen: ScreenName) => void;
  toggleCategory: (categoryId: string) => void;
  swipeProduct: (productId: string, liked: boolean) => void;
  setStylePreference: (questionId: string, value: string) => void;
  setBudget: (budget: string) => void;
  reset: () => void;
}
