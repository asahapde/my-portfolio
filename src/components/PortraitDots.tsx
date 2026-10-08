import { useEffect, useRef } from "react";
import { portraitRows } from "../portrait";

const COLS = portraitRows[0].length;
const ROWS = portraitRows.length;
const INTRO_MS = 1400;
const FADE_FROM = 0.72;
const SPRING = 0.075;
const DAMPING = 0.84;
const BURST_COOLDOWN_MS = 1300;

interface Dot {
  col: number;
  row: number;
  level: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
}

const baseDots: Omit<Dot, "ox" | "oy" | "vx" | "vy">[] = [];
for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    const level = parseInt(portraitRows[row][col], 16);
    if (level) baseDots.push({ col, row, level });
  }
}

/**
 * Halftone self-portrait. Dots part around the pointer; entering (or tapping) the portrait
 * bursts the dots apart and springs them back.
 */
const PortraitDots = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const wrapper = canvas?.parentElement;
    const host = canvas?.closest("section");
    if (!canvas || !ctx || !wrapper || !host) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dots: Dot[] = baseDots.map((d) => ({ ...d, ox: 0, oy: 0, vx: 0, vy: 0 }));

    let gap = 3.5;
    let width = 0;
    let height = 0;
    let isDark = false;
    let inkColor = "";
    let accentColor = "";
    const target = { x: -9999, y: -9999 };
    const pos = { x: -9999, y: -9999 };
    let strength = 0;
    let active = false;
    let intro = reduceMotion ? 1 : 0;
    const introStart = performance.now();
    let lastBurst = -Infinity;
    let frame = 0;

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      isDark = document.documentElement.getAttribute("data-theme") === "dark";
      inkColor = styles.getPropertyValue("--text").trim();
      accentColor = styles.getPropertyValue("--accent").trim();
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      width = wrapper.clientWidth;
      gap = width / COLS;
      height = gap * ROWS;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const reach = gap * 16;
      const push = gap * 1.5;

      for (const dot of dots) {
        const v = dot.row / ROWS;
        const fade = v > FADE_FROM ? 1 - (v - FADE_FROM) / (1 - FADE_FROM) : 1;
        const shown = Math.min(1, Math.max(0, (intro * 1.25 - v) * 6));
        if (fade <= 0 || shown <= 0) continue;

        const darkness = (dot.level - 1) / 14;
        const tone = isDark ? 1 - darkness : darkness;
        const x = (dot.col + 0.5) * gap;
        const y = (dot.row + 0.5) * gap;

        const dx = x - pos.x;
        const dy = y - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const t = dist < reach ? (1 - dist / reach) ** 2 * strength : 0;
        const rx = t > 0 && dist > 0 ? (dx / dist) * push * t : 0;
        const ry = t > 0 && dist > 0 ? (dy / dist) * push * t : 0;
        const scatter = Math.sqrt(dot.ox * dot.ox + dot.oy * dot.oy);

        ctx.globalAlpha = fade * 0.9;
        ctx.fillStyle = t > 0.15 || scatter > gap * 0.6 ? accentColor : inkColor;
        ctx.beginPath();
        ctx.arc(
          x + dot.ox + rx,
          y + dot.oy + ry,
          (0.12 + tone * 0.8) * gap * 0.5 * shown,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      let moving = false;
      for (const dot of dots) {
        dot.vx = (dot.vx - dot.ox * SPRING) * DAMPING;
        dot.vy = (dot.vy - dot.oy * SPRING) * DAMPING;
        dot.ox += dot.vx;
        dot.oy += dot.vy;
        if (Math.abs(dot.ox) + Math.abs(dot.oy) + Math.abs(dot.vx) + Math.abs(dot.vy) > 0.02) {
          moving = true;
        } else {
          dot.ox = dot.oy = dot.vx = dot.vy = 0;
        }
      }
      return moving;
    };

    const tick = (now: number) => {
      intro = reduceMotion ? 1 : Math.min(1, (now - introStart) / INTRO_MS);
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      strength += ((active ? 1 : 0) - strength) * 0.1;
      const moving = step();
      draw();
      const settled =
        !moving &&
        intro >= 1 &&
        Math.abs(target.x - pos.x) < 0.3 &&
        Math.abs(target.y - pos.y) < 0.3 &&
        Math.abs((active ? 1 : 0) - strength) < 0.01;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const burst = (originX: number, originY: number) => {
      const now = performance.now();
      if (reduceMotion || now - lastBurst < BURST_COOLDOWN_MS || intro < 1) return;
      lastBurst = now;
      for (const dot of dots) {
        const x = (dot.col + 0.5) * gap;
        const y = (dot.row + 0.5) * gap;
        const angle = Math.atan2(y - originY, x - originX) + (Math.random() - 0.5) * 1.2;
        const force = gap * (1.2 + Math.random() * 2.8);
        dot.vx += Math.cos(angle) * force;
        dot.vy += Math.sin(angle) * force;
      }
      wake();
    };

    const localPoint = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onHostMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const p = localPoint(e);
      target.x = p.x;
      target.y = p.y;
      if (!active) {
        active = true;
        if (strength < 0.01) {
          pos.x = p.x;
          pos.y = p.y;
        }
      }
      wake();
    };

    const onHostLeave = () => {
      active = false;
      wake();
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const p = localPoint(e);
      burst(p.x, p.y);
    };

    const onDown = (e: PointerEvent) => {
      const p = localPoint(e);
      burst(p.x, p.y);
    };

    readColors();
    resize();
    wake();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(wrapper);
    const themeObserver = new MutationObserver(() => {
      readColors();
      draw();
    });
    themeObserver.observe(document.documentElement, { attributeFilter: ["data-theme"] });

    canvas.addEventListener("pointerenter", onEnter);
    canvas.addEventListener("pointerdown", onDown);
    if (!reduceMotion) {
      host.addEventListener("pointermove", onHostMove);
      host.addEventListener("pointerleave", onHostLeave);
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener("pointerenter", onEnter);
      canvas.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointermove", onHostMove);
      host.removeEventListener("pointerleave", onHostLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block cursor-pointer touch-manipulation"
      role="img"
      aria-label="Dot portrait of Abdullah"
    />
  );
};

export default PortraitDots;
