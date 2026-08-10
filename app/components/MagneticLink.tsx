"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";

// Wraps a link in a subtle magnetic pull toward the cursor — a small
// tactile detail that makes the element feel alive under the hand.
// Forwards all other motion.a props (whileHover, animate, etc.) untouched.
export function MagneticLink({
  style,
  onMouseMove,
  onMouseLeave,
  ...rest
}: HTMLMotionProps<"a">) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  return (
    <motion.a
      ref={ref}
      style={{ ...style, x: springX, y: springY }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
          x.set(Math.cos(angle) * 8);
          y.set(Math.sin(angle) * 8);
        }
        onMouseMove?.(e);
      }}
      onMouseLeave={(e) => {
        x.set(0);
        y.set(0);
        onMouseLeave?.(e);
      }}
      {...rest}
    />
  );
}
