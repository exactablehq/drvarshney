"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Masonry.css";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface MasonryItem {
  id: string;
  img: string;
  url?: string;
  height: number;
  [key: string]: any;
}

export interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "top" | "bottom" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  onItemClick?: (item: MasonryItem, index: number) => void;
  renderOverlay?: (item: MasonryItem) => React.ReactNode;
}

const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  const get = () => {
    if (typeof window === "undefined") return defaultValue;
    const idx = queries.findIndex(q => matchMedia(q).matches);
    return idx !== -1 ? values[idx] : defaultValue;
  };

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get());
    const matchers = queries.map(q => matchMedia(q));
    matchers.forEach(m => m.addEventListener("change", handler));
    return () => matchers.forEach(m => m.removeEventListener("change", handler));
  }, [queries]);

  return value;
};

const useMeasure = (): [React.RefObject<HTMLDivElement | null>, { width: number; height: number }] => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    let rafId: number;
    const ro = new ResizeObserver(([entry]) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { width, height } = entry.contentRect;
        setSize(prev => (prev.width === width && prev.height === height ? prev : { width, height }));
      });
    });
    ro.observe(ref.current);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return [ref, size];
};

const Masonry = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.04,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.97,
  blurToFocus = true,
  colorShiftOnHover = false,
  onItemClick,
  renderOverlay
}: MasonryProps) => {
  const mediaQueries = useMemo(
    () => ["(min-width:1500px)", "(min-width:1000px)", "(min-width:600px)", "(min-width:400px)"],
    []
  );
  const mediaValues = useMemo(() => [4, 3, 2, 2], []);

  const columns = useMedia(mediaQueries, mediaValues, 1);
  const [containerRef, { width }] = useMeasure();

  // Compute layout grid without layout thrashing
  const [grid, containerHeight] = useMemo(() => {
    if (!width) return [[], 0];

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    const gridItems = items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });

    const maxH = Math.max(...colHeights, 0);
    return [gridItems, maxH];
  }, [columns, items, width]);

  const getInitialPosition = (item: { x: number; y: number; w: number; h: number }) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === "random") {
      const directions: Array<"top" | "bottom" | "left" | "right"> = ["top", "bottom", "left", "right"];
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  const hasMounted = useRef(false);

  // Hardware-accelerated GPU animation with GSAP Context
  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current || grid.length === 0) return;

    const ctx = gsap.context(() => {
      grid.forEach((item: any, index: number) => {
        const selector = `[data-key="${item.id}"]`;

        // GPU-only transforms: x, y mapped to translate3d
        if (!hasMounted.current) {
          const initialPos = getInitialPosition(item);
          gsap.fromTo(
            selector,
            {
              opacity: 0,
              x: initialPos.x,
              y: initialPos.y,
              ...(blurToFocus && { filter: "blur(8px)" })
            },
            {
              opacity: 1,
              x: item.x,
              y: item.y,
              ...(blurToFocus && { filter: "blur(0px)" }),
              duration: duration,
              ease: ease,
              delay: index * stagger,
              force3D: true
            }
          );
        } else {
          gsap.to(selector, {
            x: item.x,
            y: item.y,
            opacity: 1,
            duration: duration,
            ease: ease,
            force3D: true,
            overwrite: "auto"
          });
        }
      });
      hasMounted.current = true;
    }, containerRef);

    return () => ctx.revert();
  }, [grid, stagger, animateFrom, blurToFocus, duration, ease]);

  return (
    <div
      ref={containerRef}
      className="list"
      style={{ height: `${containerHeight}px` }}
    >
      {grid.map((item: any, idx: number) => {
        return (
          <div
            key={item.id}
            data-key={item.id}
            className="item-wrapper"
            style={{
              width: `${item.w}px`,
              height: `${item.h}px`,
              // Initial GPU inline position for zero flicker before GSAP hydration
              transform: `translate3d(${item.x}px, ${item.y}px, 0px)`
            }}
            onClick={() => {
              if (onItemClick) {
                onItemClick(item, idx);
              } else if (item.url) {
                window.open(item.url, "_blank", "noopener");
              }
            }}
          >
            <div
              className="item-img"
              style={{
                backgroundImage: `url(${item.img})`,
                transform: scaleOnHover ? undefined : "none"
              }}
            >
              {colorShiftOnHover && <div className="color-overlay" />}
              {renderOverlay && renderOverlay(item)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Masonry);
