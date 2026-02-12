type AnalyticsEvent =
  | { event: "activation_started" }
  | { event: "categories_selected"; data: { categories: string[] } }
  | {
      event: "product_swiped";
      data: { productId: string; liked: boolean; position: number };
    }
  | { event: "style_selected"; data: { questionId: string; value: string } }
  | { event: "budget_selected"; data: { budget: string } }
  | {
      event: "activation_completed";
      data: {
        totalTime: number;
        preferences: {
          categories: string[];
          swipes: { productId: string; liked: boolean }[];
          style: Record<string, string>;
          budget: string | null;
        };
      };
    }
  | {
      event: "activation_abandoned";
      data: { lastScreen: string; timeSpent: number };
    };

export function trackEvent(analyticsEvent: AnalyticsEvent) {
  // Stub: replace with real analytics (Mixpanel, Amplitude, etc.)
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${analyticsEvent.event}`, "data" in analyticsEvent ? analyticsEvent.data : "");
  }
}
