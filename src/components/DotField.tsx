import { useEffect, useRef } from "react";

const GAP = 24;
const RADIUS = 160;
const PUSH = 7;

/** Dot grid that swells, tints, and parts around the pointer. Listens on its parent element. */
const DotField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dotColor = "";
    let accentColor = "";
    const target = { x: -9999, y: -9999 };
    const pos = { x: -9999, y: -9999 };
    let strength = 0;
    let active = false;
    let frame = 0;

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      dotColor = styles.getPropertyValue("--dot").trim();
      accentColor = styles.getPropertyValue("--accent").trim();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.42;
      const rx = width * 0.62;
      const ry = height * 0.62;

      for (let y = GAP / 2; y < height; y += GAP) {
        for (let x = GAP / 2; x < width; x += GAP) {
          const ex = (x - cx) / rx;
          const ey = (y - cy) / ry;
          const fade = Math.max(0, 1 - Math.sqrt(ex * ex + ey * ey));
          if (fade <= 0) continue;

          const dx = x - pos.x;
          const dy = y - pos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const t = dist < RADIUS ? (1 - dist / RADIUS) ** 2 * strength : 0;

          let px = x;
          let py = y;
          if (t > 0 && dist > 0) {
            px += (dx / dist) * PUSH * t;
            py += (dy / dist) * PUSH * t;
          }

          ctx.globalAlpha = Math.min(1, fade * 1.6);
          ctx.fillStyle = dotColor;
          ctx.beginPath();
          ctx.arc(px, py, 1 + t * 1.2, 0, Math.PI * 2);
          ctx.fill();

          if (t > 0.02) {
            ctx.globalAlpha = Math.min(1, t * 1.4) * Math.min(1, fade * 2);
            ctx.fillStyle = accentColor;
            ctx.beginPath();
            ctx.arc(px, py, 1 + t * 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.14;
      pos.y += (target.y - pos.y) * 0.14;
      strength += ((active ? 1 : 0) - strength) * 0.08;
      draw();
      const settled =
        Math.abs(target.x - pos.x) < 0.3 &&
        Math.abs(target.y - pos.y) < 0.3 &&
        Math.abs((active ? 1 : 0) - strength) < 0.01;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = host.clientWidth;
      height = host.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const rect = host.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      if (!active) {
        active = true;
        if (strength < 0.01) {
          pos.x = target.x;
          pos.y = target.y;
        }
      }
      wake();
    };

    const onLeave = () => {
      active = false;
      wake();
    };

    readColors();
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const themeObserver = new MutationObserver(() => {
      readColors();
      draw();
    });
    themeObserver.observe(document.documentElement, { attributeFilter: ["data-theme"] });

    if (!reduceMotion) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />;
};

export default DotField;
