"use client";

import { useEffect, useId, useRef } from "react";
import "./DotField.css";

const TWO_PI = Math.PI * 2;
// Below this viewport width, cut dot density roughly in half — mobile GPUs/CPUs pay per-dot,
// and touch devices have no cursor to interact with the grid anyway.
const MOBILE_BREAKPOINT = 640;

interface Dot {
  ax: number;
  ay: number;
  sx: number;
  sy: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
}

interface DotFieldProps {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
  className?: string;
  /** Caps the animation loop's frame rate — a background effect doesn't need 60fps. */
  targetFPS?: number;
}

const DotField = ({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = "rgba(168, 85, 247, 0.35)",
  gradientTo = "rgba(180, 151, 207, 0.25)",
  glowColor = "#120F17",
  className = "",
  targetFPS = 30,
}: DotFieldProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const propsRef = useRef({
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    sparkle,
    waveAmplitude,
    gradientFrom,
    gradientTo,
  });
  useEffect(() => {
    propsRef.current = {
      dotRadius,
      dotSpacing,
      cursorRadius,
      cursorForce,
      bulgeOnly,
      bulgeStrength,
      sparkle,
      waveAmplitude,
      gradientFrom,
      gradientTo,
    };
  }, [
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    sparkle,
    waveAmplitude,
    gradientFrom,
    gradientTo,
  ]);
  const glowId = `dot-field-glow-${useId()}`;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Cap DPR at 1.5 — the visual gain from a full 2x canvas on a dense background layer
    // is not worth doubling the fill-rate cost on every frame.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let dots: Dot[] = [];
    let w = 0;
    let h = 0;
    let offsetX = 0;
    let offsetY = 0;

    function buildDots() {
      const p = propsRef.current;
      // Thin out the grid on narrow viewports — fewer dots, same visual density feel.
      const spacing = w < MOBILE_BREAKPOINT ? p.dotSpacing * 1.8 : p.dotSpacing;
      const step = p.dotRadius + spacing;
      const cols = Math.max(1, Math.floor(w / step));
      const rows = Math.max(1, Math.floor(h / step));
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const next: Dot[] = new Array(rows * cols);
      let idx = 0;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          next[idx++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
        }
      }
      dots = next;
    }

    function setSize() {
      const rect = container!.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      offsetX = rect.left + window.scrollX;
      offsetY = rect.top + window.scrollY;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildDots();
    }

    const ro = new ResizeObserver(setSize);
    ro.observe(container);
    setSize();

    const mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.pageX - offsetX;
      mouse.y = e.pageY - offsetY;
    };
    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    const speedInterval = prefersReducedMotion
      ? null
      : window.setInterval(() => {
          const dx = mouse.prevX - mouse.x;
          const dy = mouse.prevY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          mouse.speed += (dist - mouse.speed) * 0.5;
          if (mouse.speed < 0.001) mouse.speed = 0;
          mouse.prevX = mouse.x;
          mouse.prevY = mouse.y;
        }, 20);

    let engagement = 0;
    let glowOpacity = 0;
    let frameCount = 0;

    const frameInterval = 1000 / Math.max(targetFPS, 1);
    let lastFrameTime = 0;
    let raf = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;

    function draw() {
      frameCount++;
      const p = propsRef.current;
      const len = dots.length;
      const t = frameCount * 0.02;

      const targetEngagement = Math.min(mouse.speed / 5, 1);
      engagement += (targetEngagement - engagement) * 0.06;
      if (engagement < 0.001) engagement = 0;

      glowOpacity += (engagement - glowOpacity) * 0.08;

      const glowEl = glowRef.current;
      if (glowEl) {
        glowEl.setAttribute("cx", String(mouse.x));
        glowEl.setAttribute("cy", String(mouse.y));
        glowEl.style.opacity = String(glowOpacity);
      }

      ctx!.clearRect(0, 0, w, h);

      const grad = ctx!.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, p.gradientFrom);
      grad.addColorStop(1, p.gradientTo);
      ctx!.fillStyle = grad;

      const cr = p.cursorRadius;
      const crSq = cr * cr;
      const rad = p.dotRadius / 2;
      const isBulge = p.bulgeOnly;

      ctx!.beginPath();

      for (let i = 0; i < len; i++) {
        const d = dots[i];
        const dx = mouse.x - d.ax;
        const dy = mouse.y - d.ay;
        const distSq = dx * dx + dy * dy;

        if (distSq < crSq && engagement > 0.01) {
          const dist = Math.sqrt(distSq);
          if (isBulge) {
            const tt = 1 - dist / cr;
            const push = tt * tt * p.bulgeStrength * engagement;
            const angle = Math.atan2(dy, dx);
            d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
            d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
          } else {
            const angle = Math.atan2(dy, dx);
            const move = (500 / dist) * (mouse.speed * p.cursorForce);
            d.vx += Math.cos(angle) * -move;
            d.vy += Math.sin(angle) * -move;
          }
        } else if (isBulge) {
          d.sx += (d.ax - d.sx) * 0.1;
          d.sy += (d.ay - d.sy) * 0.1;
        }

        if (!isBulge) {
          d.vx *= 0.9;
          d.vy *= 0.9;
          d.x = d.ax + d.vx;
          d.y = d.ay + d.vy;
          d.sx += (d.x - d.sx) * 0.1;
          d.sy += (d.y - d.sy) * 0.1;
        }

        let drawX = d.sx;
        let drawY = d.sy;
        if (p.waveAmplitude > 0) {
          drawY += Math.sin(d.ax * 0.03 + t) * p.waveAmplitude;
          drawX += Math.cos(d.ay * 0.03 + t * 0.7) * p.waveAmplitude * 0.5;
        }

        if (p.sparkle) {
          const hash = (i * 2654435761) ^ (frameCount >> 3);
          if ((hash >>> 0) % 100 < 3) {
            ctx!.moveTo(drawX + rad * 1.8, drawY);
            ctx!.arc(drawX, drawY, rad * 1.8, 0, TWO_PI);
          } else {
            ctx!.moveTo(drawX + rad, drawY);
            ctx!.arc(drawX, drawY, rad, 0, TWO_PI);
          }
        } else {
          ctx!.moveTo(drawX + rad, drawY);
          ctx!.arc(drawX, drawY, rad, 0, TWO_PI);
        }
      }

      ctx!.fill();
    }

    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);

      // Throttle to targetFPS — a decorative background layer doesn't need 60fps,
      // and skipping draws is the biggest CPU saver here.
      if (time - lastFrameTime < frameInterval) return;
      lastFrameTime = time;

      draw();
    };

    const tryStart = () => {
      if (prefersReducedMotion) return;
      if (isVisible && isPageVisible && raf === 0) raf = requestAnimationFrame(loop);
    };
    const tryStop = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) tryStart();
        else tryStop();
      },
      { threshold: 0 },
    );
    io.observe(container);

    const onVisibility = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) tryStart();
      else tryStop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (prefersReducedMotion) {
      // Paint one static frame so the grid still reads as a background, then stay idle.
      draw();
    } else {
      tryStart();
    }

    return () => {
      tryStop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (speedInterval) clearInterval(speedInterval);
      window.removeEventListener("mousemove", onMouseMove);
      try {
        container!.removeChild(canvas);
      } catch {
        // already detached
      }
    };
    // targetFPS is read once at setup time, same as the rest of this mount-only effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className={`dot-field-container ${className}`.trim()}>
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <defs>
          <radialGradient id={glowId}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${glowId})`}
          style={{ opacity: 0, willChange: "opacity" }}
        />
      </svg>
    </div>
  );
};

export default DotField;
