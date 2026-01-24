"use client";

// Single source of truth for category styling
export const categoryStyles: Record<string, { label: string; accentColor: string }> = {
  "Content Systems": {
    label: "Content Systems",
    accentColor: "#A78BFA", // violet-400
  },
  "Revenue & GTM": {
    label: "Revenue & GTM",
    accentColor: "#4ADE80", // green-400
  },
  "Decisioning": {
    label: "Decisioning",
    accentColor: "#38BDF8", // sky-400
  },
  "Ops": {
    label: "Ops",
    accentColor: "#FB923C", // orange-400
  },
};

interface CategoryLabelProps {
  category: string;
  className?: string;
}

export function CategoryLabel({ category, className = "" }: CategoryLabelProps) {
  const style = categoryStyles[category];
  
  if (!style) {
    // Fallback for unknown categories
    return <span className={className}>{category}</span>;
  }

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Glow layer - blurred duplicate behind */}
      <span
        className="absolute inset-0 blur-[6px] opacity-60 pointer-events-none"
        style={{ color: style.accentColor }}
        aria-hidden="true"
      >
        {style.label}
      </span>
      {/* Foreground text */}
      <span
        className="relative z-10"
        style={{ color: style.accentColor }}
      >
        {style.label}
      </span>
    </span>
  );
}

// Get accent color for a category (useful for borders, etc.)
export function getCategoryAccentColor(category: string): string {
  return categoryStyles[category]?.accentColor ?? "#A1A1AA"; // zinc-400 fallback
}

