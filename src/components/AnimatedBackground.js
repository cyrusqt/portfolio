import { useEffect, useRef } from "react";
import "./AnimatedBackground.css";

// Palette pulled from the site's :root tokens (--blue, --blue-accent) plus a soft indigo/cyan accent
const NODE_COLORS = ["96, 165, 250", "59, 130, 246", "129, 140, 248", "103, 232, 249"];
const LINK_DISTANCE = 140;

function AnimatedBackground() {
  const canvasRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    const ctx = canvas.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let nodes = [];
    let frameId = null;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const createNodes = () => {
      // Scale density with viewport area, capped so phones stay light
      const count = Math.min(70, Math.max(24, Math.floor((width * height) / 22000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.6,
        color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createNodes();
    };

    const draw = (time = 0) => {
      ctx.clearRect(0, 0, width, height);

      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];

        if (!reducedMotion) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < -20) a.x = width + 20;
          if (a.x > width + 20) a.x = -20;
          if (a.y < -20) a.y = height + 20;
          if (a.y > height + 20) a.y = -20;
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.14;
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Nodes brighten gently near the cursor
        const pd = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        const boost = pd < 180 ? (1 - pd / 180) * 0.5 : 0;
        const twinkle = reducedMotion ? 0.6 : 0.45 + Math.sin(time * 0.0012 + a.phase) * 0.2;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${a.color}, ${Math.min(1, twinkle + boost)})`;
        ctx.shadowColor = `rgba(${a.color}, 0.8)`;
        ctx.shadowBlur = 6 + boost * 10;
        ctx.arc(a.x, a.y, a.r + boost, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      if (!reducedMotion) frameId = requestAnimationFrame(draw);
    };

    const start = () => {
      if (frameId == null) frameId = requestAnimationFrame(draw);
    };
    const stop = () => {
      if (frameId != null) cancelAnimationFrame(frameId);
      frameId = null;
    };

    const onPointerMove = (e) => {
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
      // Drives the CSS spotlight + aurora parallax
      root.style.setProperty("--mx", `${e.clientX}px`);
      root.style.setProperty("--my", `${e.clientY}px`);
      root.style.setProperty("--px", ((e.clientX / width) - 0.5).toFixed(3));
      root.style.setProperty("--py", ((e.clientY / height) - 0.5).toFixed(3));
    };
    const onPointerLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };
    const onVisibility = () => (document.hidden ? stop() : !reducedMotion && start());

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        if (reducedMotion) draw();
      }, 150);
    };

    resize();
    if (reducedMotion) draw();
    else start();

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="animated-bg" ref={rootRef} aria-hidden="true">
      <div className="animated-bg__aurora">
        <span className="animated-bg__blob animated-bg__blob--1" />
        <span className="animated-bg__blob animated-bg__blob--2" />
        <span className="animated-bg__blob animated-bg__blob--3" />
        <span className="animated-bg__blob animated-bg__blob--4" />
      </div>
      <div className="animated-bg__grid" />
      <canvas className="animated-bg__canvas" ref={canvasRef} />
      <div className="animated-bg__spotlight" />
      <div className="animated-bg__vignette" />
    </div>
  );
}

export default AnimatedBackground;
