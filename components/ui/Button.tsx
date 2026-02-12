"use client";

import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  ariaLabel?: string;
}

export default function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  ariaLabel,
}: ButtonProps) {
  const variants = {
    primary:
      "bg-white text-gray-900 hover:shadow-lg hover:shadow-white/20",
    secondary:
      "bg-white/10 text-white border border-white/20 hover:bg-white/20",
    ghost: "bg-transparent text-white/70 hover:text-white",
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={`
        px-8 py-4 rounded-2xl font-semibold text-base
        transition-shadow duration-150
        disabled:opacity-50 disabled:pointer-events-none
        focus-visible:outline-2 focus-visible:outline-sourcy-teal focus-visible:outline-offset-2
        ${variants[variant]}
        ${className}
      `}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}
