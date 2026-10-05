import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";
import { FiLayers, FiCode } from "react-icons/fi";
import {
  SiHtml5,
  SiCss as SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiFlutter,
  SiDart,
  SiPhp,
  SiLaravel,
  SiMysql,
  SiGit,
  SiGithub,
  SiTailwindcss,
  SiBootstrap,
  SiFirebase,
  SiBitbucket,
} from "react-icons/si";
import "./TechStack.css";

const ROW_1 = [
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", Icon: SiCss3, color: "#1572B6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Flutter", Icon: SiFlutter, color: "#02569B" },
  { name: "Dart", Icon: SiDart, color: "#0175C2" },
  { name: "PHP", Icon: SiPhp, color: "#777BB4" },
  { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
];

const ROW_2 = [
  { name: "REST API", Icon: FiCode, color: "#34D399" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub", Icon: SiGithub, color: "#FFFFFF" },
  { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFA000" },
  { name: "VS Code", Icon: FiCode, color: "#007ACC" },
  { name: "Bitbucket", Icon: SiBitbucket, color: "#205081" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "React Native", Icon: SiReact, color: "#61DAFB" },
];

function TechCard({ tech }) {
  const { name, Icon, color } = tech;
  return (
    <div className="stack-card" tabIndex={0} role="group" aria-label={name}>
      <Icon className="stack-card-icon" style={{ color }} aria-hidden="true" />
      <span className="stack-card-name">{name}</span>
    </div>
  );
}

function MarqueeRow({ items, duration, reverse, ariaLabel, mobileFactor }) {
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const paused = useRef(false);
  const halfWidth = useRef(0);
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 640
  );

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        halfWidth.current = trackRef.current.scrollWidth / 2;
      }
      setIsMobile(window.innerWidth <= 640);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items]);

  useAnimationFrame((_, delta) => {
    if (paused.current || prefersReduced) return;
    const hw = halfWidth.current;
    if (!hw) return;
    const effectiveDuration = duration * (isMobile ? mobileFactor : 1);
    const speed = hw / effectiveDuration; // px per second
    const dir = reverse ? 1 : -1;
    let next = x.get() + dir * speed * (delta / 1000);
    next = (((next % hw) + hw) % hw) - hw; // wrap into [-hw, 0)
    x.set(next);
  });

  return (
    <div
      className="stack-row"
      role="group"
      aria-label={ariaLabel}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      <motion.div
        className="stack-track"
        ref={trackRef}
        style={{ x }}
        drag={isMobile ? "x" : false}
        dragMomentum={false}
        onDragStart={() => (paused.current = true)}
        onDragEnd={() => (paused.current = false)}
      >
        {[...items, ...items].map((tech, i) => (
          <TechCard key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </motion.div>
    </div>
  );
}

function TechStack() {
  return (
    <section className="stack-section" id="skills">
      <div className="stack-bg" aria-hidden="true">
        <span className="stack-glow stack-glow-1" />
        <span className="stack-glow stack-glow-2" />
        <span className="stack-particle p1" />
        <span className="stack-particle p2" />
        <span className="stack-particle p3" />
      </div>

      <motion.div
        className="stack-container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="stack-header">
          <FiLayers className="stack-icon" aria-hidden="true" />
          <h2>
            Tech <span className="stack-accent">Stack</span>
          </h2>
        </div>
        <span className="stack-underline" />

        <div className="stack-rows">
          <MarqueeRow
            items={ROW_1}
            duration={30}
            reverse={false}
            mobileFactor={0.6}
            ariaLabel="Frontend technologies, scrolling left to right"
          />
          <div className="stack-row-bottom-wrap">
            <MarqueeRow
              items={ROW_2}
              duration={35}
              reverse
              mobileFactor={0.6}
              ariaLabel="Tools and backend technologies, scrolling right to left"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default TechStack;
