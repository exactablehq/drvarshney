"use client";

import { useRef, useState } from "react";
import { useMotionValue, useAnimationFrame } from "framer-motion";

/**
 * Continuous, seamless marquee driven by a raw motion value + rAF loop.
 * Hover only slows the speed — it never pauses or snaps the track back,
 * because we never touch Framer's `animate` keyframe restart path.
 */
export function useMarquee(speedPxPerSec = 40, slowPxPerSec = 12) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (!track) return;
    // Content is tripled for seamless looping — wrap at one third.
    const wrapWidth = track.scrollWidth / 3;
    if (wrapWidth <= 0) return;

    const speed = hovered ? slowPxPerSec : speedPxPerSec;
    let next = x.get() - (speed * delta) / 1000;
    if (next <= -wrapWidth) next += wrapWidth;
    x.set(next);
  });

  return { trackRef, x, setHovered };
}
