import { Category, Product, StyleQuestion, BudgetOption } from "./types";

export const categories: Category[] = [
  {
    id: "activewear",
    name: "Activewear",
    emoji: "\u{1F3C3}\u200D\u2640\uFE0F",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "streetwear",
    name: "Streetwear",
    emoji: "\u{1F9E2}",
    gradient: "from-gray-700 to-gray-900",
  },
  {
    id: "beauty",
    name: "Beauty",
    emoji: "\u2728",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    id: "bags",
    name: "Bags",
    emoji: "\u{1F45C}",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "home",
    name: "Home",
    emoji: "\u{1F3E0}",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    id: "electronics",
    name: "Electronics",
    emoji: "\u{1F4F1}",
    gradient: "from-blue-500 to-indigo-600",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Seamless High-Waist Leggings",
    price: "$4.50",
    emoji: "\u{1F456}",
    tags: ["seamless", "squat-proof"],
  },
  {
    id: "2",
    name: "Vintage Wash Oversized Hoodie",
    price: "$8.20",
    emoji: "\u{1F9E5}",
    tags: ["oversized", "vintage"],
  },
  {
    id: "3",
    name: "Minimalist Canvas Tote",
    price: "$3.80",
    emoji: "\u{1F45C}",
    tags: ["canvas", "eco-friendly"],
  },
  {
    id: "4",
    name: "Bold Print Sports Bra",
    price: "$5.50",
    emoji: "\u{1F459}",
    tags: ["colorful", "supportive"],
  },
  {
    id: "5",
    name: "Neon Accent Running Shorts",
    price: "$4.20",
    emoji: "\u{1FA73}",
    tags: ["bright", "quick-dry"],
  },
  {
    id: "6",
    name: "Earth Tone Ribbed Tank",
    price: "$3.20",
    emoji: "\u{1F45A}",
    tags: ["neutral", "layering"],
  },
];

export const styleQuestions: StyleQuestion[] = [
  {
    id: "vibe",
    question: "Your vibe?",
    optionA: { emoji: "\u{1F308}", label: "Bold & Colorful", value: "bold" },
    optionB: {
      emoji: "\u26AA",
      label: "Minimal & Neutral",
      value: "minimal",
    },
  },
  {
    id: "fit",
    question: "Preferred fit?",
    optionA: {
      emoji: "\u{1F4E6}",
      label: "Oversized & Relaxed",
      value: "oversized",
    },
    optionB: {
      emoji: "\u{1F4D0}",
      label: "Fitted & Structured",
      value: "fitted",
    },
  },
  {
    id: "priority",
    question: "What matters more?",
    optionA: {
      emoji: "\u{1F4B0}",
      label: "Best price always",
      value: "price",
    },
    optionB: {
      emoji: "\u2B50",
      label: "Quality over price",
      value: "quality",
    },
  },
];

export const budgetOptions: BudgetOption[] = [
  {
    id: "low",
    label: "Budget-friendly",
    range: "$1-5",
    emoji: "\u{1F4B5}",
    desc: "Testing the market",
  },
  {
    id: "mid",
    label: "Mid-range",
    range: "$5-15",
    emoji: "\u{1F4B0}",
    desc: "Quality basics",
  },
  {
    id: "high",
    label: "Premium",
    range: "$15+",
    emoji: "\u{1F48E}",
    desc: "High-end positioning",
  },
];

export const videoMapping: Record<string, string> = {
  welcome: "/videos/asmr-products.mp4",
  categories: "/videos/asmr-products.mp4",
  products: "/videos/yoga-leggings.mp4",
  style: "/videos/vintage-hoodie.mp4",
  budget: "/videos/asmr-products.mp4",
  done: "/videos/asmr-products.mp4",
};

export const screenOrder = [
  "welcome",
  "categories",
  "products",
  "style",
  "budget",
  "done",
] as const;
