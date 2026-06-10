'use client'

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedFeatureCardProps {
  index: string;
  tag: string;
  title: React.ReactNode;
  imageSrc: string;
  color: "orange" | "purple" | "blue";
  className?: string;
}

const colorVariants = {
  /* warm amber — matches site accent #92400E */
  orange: {
    '--feature-color':       'hsl(27, 72%, 46%)',
    '--feature-color-light': 'hsl(32, 60%, 88%)',
    '--feature-color-dark':  'hsl(30, 40%, 97%)',
  },
  /* warm taupe / mushroom */
  purple: {
    '--feature-color':       'hsl(35, 18%, 44%)',
    '--feature-color-light': 'hsl(35, 18%, 86%)',
    '--feature-color-dark':  'hsl(35, 14%, 97%)',
  },
  /* deep burgundy / wine */
  blue: {
    '--feature-color':       'hsl(355, 38%, 40%)',
    '--feature-color-light': 'hsl(4, 40%, 87%)',
    '--feature-color-dark':  'hsl(0, 22%, 97%)',
  },
};

const AnimatedFeatureCard = React.forwardRef<
  HTMLDivElement,
  AnimatedFeatureCardProps
>(({ className, index, tag, title, imageSrc, color, ...props }, ref) => {
  const cardStyle = colorVariants[color] as React.CSSProperties;

  return (
    <motion.div
      ref={ref}
      style={cardStyle}
      className={cn(
        "relative flex h-[380px] w-full max-w-sm flex-col justify-end overflow-hidden rounded-2xl border bg-card p-6 shadow-sm",
        className
      )}
      whileHover="hover"
      initial="initial"
      variants={{
        initial: { y: 0,   boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
        hover:   { y: -10, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15), 0 10px 10px -5px rgba(0,0,0,0.06)" },
      }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      {...props}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{ background: `radial-gradient(circle at 50% 30%, var(--feature-color-light) 0%, transparent 70%)` }}
      />

      {/* Index */}
      <div className="absolute top-6 left-6 font-mono text-lg font-bold text-muted-foreground">
        {index}
      </div>

      {/* Floating image */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center"
        variants={{
          initial: { scale: 1,   y: 0   },
          hover:   { scale: 1.3, y: -20 },
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={tag}
          className="w-40 h-40 object-contain"
        />
      </motion.div>

      {/* Content box */}
      <div className="relative z-20 rounded-lg border bg-background/80 p-4 backdrop-blur-sm">
        <span
          className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold"
          style={{ backgroundColor: 'var(--feature-color-dark)', color: 'var(--feature-color)' }}
        >
          {tag}
        </span>
        <p className="text-base text-card-foreground">{title}</p>
      </div>
    </motion.div>
  );
});
AnimatedFeatureCard.displayName = "AnimatedFeatureCard";

export { AnimatedFeatureCard };
