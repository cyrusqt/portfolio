import React from "react";
import { motion } from "framer-motion";
import { SiCss, SiFlutter, SiHtml5, SiJavascript, SiPhp, SiReact } from "react-icons/si";
import "./DeveloperIllustration.css";

/* Isometric projection: t runs to the upper-right, s to the lower-right, h straight up */
const ORIGIN = { x: 150, y: 458 };
const iso = (t, s, h = 0) => [ORIGIN.x + 0.866 * (t + s), ORIGIN.y - 0.5 * t + 0.5 * s - h];
const pts = (...points) => points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
const line = (...points) =>
  points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

// Maps flat 2D drawing coords onto a vertical face (x → t, y → down) or a horizontal face (x → t, y → s)
const frontPlane = (t, s, h) => `matrix(0.866 -0.5 0 1 ${iso(t, s, h).join(" ")})`;
const topPlane = (t, s, h) => `matrix(0.866 -0.5 0.866 0.5 ${iso(t, s, h).join(" ")})`;

function IsoBox({ t, s, h, w, d, z, top, left, right }) {
  return (
    <g>
      <polygon points={pts(iso(t, s, h), iso(t, s + d, h), iso(t, s + d, h + z), iso(t, s, h + z))} fill={left} />
      <polygon points={pts(iso(t, s + d, h), iso(t + w, s + d, h), iso(t + w, s + d, h + z), iso(t, s + d, h + z))} fill={right} />
      <polygon points={pts(iso(t, s, h + z), iso(t + w, s, h + z), iso(t + w, s + d, h + z), iso(t, s + d, h + z))} fill={top} />
    </g>
  );
}

const DESK = { top: "#cfd8f6", left: "#b3c0ec", right: "#93a5dc" };
const CHAIR = { top: "#3b82f6", left: "#2563eb", right: "#1d4ed8" };

const CODE_LINES = [
  [10, 12, 30, "#f472b6"],
  [44, 12, 40, "#60a5fa"],
  [16, 21, 52, "#a78bfa"],
  [16, 30, 34, "#34d399"],
  [54, 30, 30, "#fbbf24"],
  [22, 39, 62, "#60a5fa"],
  [22, 48, 40, "#f472b6"],
  [16, 57, 54, "#94a3b8"],
  [10, 66, 24, "#a78bfa"],
];

const HUB = [267, 150];

const BUBBLES = [
  { Icon: SiCss, cx: 78, cy: 232, r: 30, fill: "#2965f1", shade: "#1d4ed8", icon: "#fff", float: 5.5 },
  { Icon: SiPhp, cx: 128, cy: 122, r: 38, fill: "#777bb4", shade: "#565a94", icon: "#fff", float: 6.5 },
  { Icon: SiHtml5, cx: 242, cy: 56, r: 30, fill: "#e34f26", shade: "#b33a18", icon: "#fff", float: 5 },
  { Icon: SiJavascript, cx: 362, cy: 82, r: 32, fill: "#f7df1e", shade: "#c8b40c", icon: "#1f2937", float: 6 },
  { Icon: SiReact, cx: 456, cy: 152, r: 30, fill: "#149eca", shade: "#0e7ba0", icon: "#fff", float: 7 },
  { Icon: SiFlutter, cx: 522, cy: 252, r: 26, fill: "#027dfd", shade: "#0256b0", icon: "#fff", float: 5.8 },
];

const SPARKS = [
  [40, 150, 2.5], [200, 120, 2], [310, 30, 2.2], [420, 60, 2.5],
  [560, 190, 2], [500, 330, 2.4], [60, 320, 2], [300, 110, 1.8],
];

function Bubble({ Icon, cx, cy, r, fill, shade, icon, float }, i) {
  return (
    <g key={i} className="di-bubble" style={{ animationDelay: `${0.5 + i * 0.12}s` }}>
      <g className="di-bubble__float" style={{ animationDuration: `${float}s`, animationDelay: `${i * -0.9}s` }}>
        <circle cx={cx} cy={cy + 5} r={r} fill={shade} />
        <circle cx={cx} cy={cy} r={r} fill={fill} filter="url(#di-bubbleGlow)" />
        <ellipse cx={cx - r * 0.3} cy={cy - r * 0.45} rx={r * 0.45} ry={r * 0.2} fill="#fff" opacity="0.22" />
        <Icon x={cx - r * 0.48} y={cy - r * 0.48} size={r * 0.96} color={icon} aria-hidden="true" />
      </g>
    </g>
  );
}

function DeveloperIllustration() {
  const [px, py] = iso(120, 90, 0);
  const [mugX, mugY] = iso(28, 84, 88);

  return (
    <motion.div
      className="dev-illustration"
      role="img"
      aria-label="Isometric illustration of a developer coding at a desk, surrounded by floating HTML, CSS, JavaScript, PHP, React and Flutter logos"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { duration: 0.7, ease: "easeOut" },
        scale: { duration: 0.7, ease: "easeOut" },
        y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <div className="dev-glow" aria-hidden="true" />
      <svg viewBox="0 0 620 590" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="di-platform" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a2b55" />
            <stop offset="100%" stopColor="#0c1532" />
          </linearGradient>
          <radialGradient id="di-platformLight" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="di-deskLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="di-screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#13234a" />
            <stop offset="100%" stopColor="#0b1224" />
          </linearGradient>
          <filter id="di-bubbleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
            <feOffset dy="4" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.35" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Platform */}
        <ellipse cx={px} cy={py + 14} rx="202" ry="117" fill="#081026" />
        <ellipse cx={px} cy={py} rx="202" ry="117" fill="url(#di-platform)" stroke="#3b82f6" strokeOpacity="0.55" strokeWidth="1.5" />
        <ellipse cx={px} cy={py} rx="202" ry="117" fill="url(#di-platformLight)" className="di-pulse" />
        <ellipse cx={px} cy={py} rx="168" ry="97" fill="none" stroke="#60a5fa" strokeOpacity="0.25" />
        <ellipse cx={px} cy={py + 4} rx="224" ry="130" fill="none" stroke="#60a5fa" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="6 14" className="di-orbit" />

        {/* Tech links */}
        <path d={line([267, 205], HUB)} className="di-link" />
        {BUBBLES.map(({ cx, cy }, i) => {
          const d = `M${HUB[0]} ${HUB[1]} Q${(HUB[0] + cx) / 2} ${Math.min(HUB[1], cy) - 20} ${cx} ${cy}`;
          return (
            <g key={i}>
              <path d={d} className="di-link" />
              <path d={d} className="di-link-flow" style={{ animationDelay: `${i * -0.4}s` }} />
            </g>
          );
        })}
        <circle cx={HUB[0]} cy={HUB[1]} r="5" fill="#60a5fa" className="di-hub" />

        {/* Desk */}
        <IsoBox t={228} s={4} h={0} w={8} d={8} z={80} {...DESK} />
        <IsoBox t={4} s={4} h={0} w={8} d={8} z={80} {...DESK} />
        <IsoBox t={228} s={88} h={0} w={8} d={8} z={80} {...DESK} />
        <IsoBox t={4} s={88} h={0} w={8} d={8} z={80} {...DESK} />
        <IsoBox t={0} s={0} h={80} w={240} d={100} z={8} {...DESK} />
        <g transform={topPlane(0, 0, 88)}>
          <ellipse cx="112" cy="50" rx="80" ry="38" fill="url(#di-deskLight)" className="di-pulse" />
        </g>

        {/* Books */}
        <IsoBox t={8} s={28} h={88} w={34} d={24} z={6} top="#fbbf24" left="#f59e0b" right="#d97706" />
        <IsoBox t={11} s={31} h={94} w={28} d={19} z={5} top="#67e8f9" left="#22d3ee" right="#0891b2" />

        {/* Monitor */}
        <IsoBox t={90} s={8} h={88} w={40} d={24} z={3} top="#e2e8f0" left="#cbd5e1" right="#94a3b8" />
        <IsoBox t={105} s={12} h={91} w={10} d={6} z={30} top="#cbd5e1" left="#94a3b8" right="#64748b" />
        <IsoBox t={50} s={20} h={110} w={120} d={5} z={95} top="#f1f5f9" left="#cbd5e1" right="#e2e8f0" />
        <g transform={frontPlane(50, 25, 205)}>
          <rect x="4" y="4" width="112" height="80" rx="2" fill="url(#di-screen)" />
          <rect x="4" y="4" width="112" height="80" rx="2" fill="#3b82f6" opacity="0.08" className="di-pulse" />
          {CODE_LINES.map(([x, y, w, color], i) => (
            <rect
              key={i}
              x={x}
              y={y}
              width={w}
              height="4"
              rx="2"
              fill={color}
              className="di-code"
              style={{ animationDelay: `${i * 0.35}s` }}
            />
          ))}
          <rect x="38" y="65.5" width="2.5" height="5" fill="#e2e8f0" className="di-cursor" />
          <circle cx="60" cy="89.5" r="1.8" fill="#94a3b8" />
        </g>

        {/* Keyboard + mouse */}
        <IsoBox t={75} s={62} h={88} w={80} d={24} z={3} top="#f1f5f9" left="#cbd5e1" right="#94a3b8" />
        <g transform={topPlane(75, 62, 91)}>
          {Array.from({ length: 30 }, (_, k) => (
            <rect key={k} x={5 + (k % 10) * 7.2} y={4 + Math.floor(k / 10) * 6} width="5.6" height="4.4" rx="1" fill="#cbd5e1" />
          ))}
        </g>
        <IsoBox t={166} s={70} h={88} w={9} d={13} z={3} top="#f1f5f9" left="#cbd5e1" right="#94a3b8" />

        {/* Coffee mug */}
        <g>
          <path d={`M${mugX - 8} ${mugY - 14} c-8 0 -8 10 0 10`} fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
          <rect x={mugX - 8} y={mugY - 18} width="16" height="18" fill="#f1f5f9" />
          <ellipse cx={mugX} cy={mugY} rx="8" ry="3.5" fill="#f1f5f9" />
          <ellipse cx={mugX} cy={mugY - 18} rx="8" ry="3.5" fill="#e2e8f0" />
          <ellipse cx={mugX} cy={mugY - 18} rx="6" ry="2.4" fill="#7c4a2d" />
          <path d={`M${mugX - 2} ${mugY - 24} q-4 -6 0 -12 q4 -6 0 -12`} className="di-steam" />
          <path d={`M${mugX + 3} ${mugY - 24} q-4 -6 0 -12 q4 -6 0 -12`} className="di-steam" style={{ animationDelay: "1.2s" }} />
        </g>

        {/* Chair base + seat */}
        {[[26, 0], [-26, 0], [0, 26], [0, -26]].map(([dt, ds], i) => (
          <g key={i}>
            <path d={line(iso(110, 155, 10), iso(110 + dt, 155 + ds, 5))} stroke="#475569" strokeWidth="4" strokeLinecap="round" />
            <circle cx={iso(110 + dt, 155 + ds, 2)[0]} cy={iso(110 + dt, 155 + ds, 2)[1]} r="3.5" fill="#1e293b" />
          </g>
        ))}
        <IsoBox t={107} s={152} h={10} w={6} d={6} z={36} top="#94a3b8" left="#64748b" right="#475569" />
        <IsoBox t={88} s={133} h={46} w={44} d={44} z={6} {...CHAIR} />

        {/* Developer */}
        <g className="di-dev">
          {/* far arm */}
          <path d={line(iso(125, 141, 130), iso(127, 124, 100), iso(122, 82, 94))} className="di-limb" stroke="#e05563" strokeWidth="12" />
          <circle cx={iso(122, 80, 94)[0]} cy={iso(122, 80, 94)[1]} r="5" fill="#eab092" className="di-hand di-hand--far" />

          {/* legs */}
          {[119, 101].map((t, i) => (
            <g key={t}>
              <path d={line(iso(t, 150, 62), iso(t, 102, 62), iso(t, 102, 8))} className="di-limb" stroke={i ? "#6366f1" : "#4f46e5"} strokeWidth="15" />
              <path d={line(iso(t, 104, 4), iso(t, 90, 4))} className="di-limb" stroke="#f97316" strokeWidth="9" />
            </g>
          ))}

          {/* torso */}
          <path d={line(iso(110, 150, 70), iso(110, 141, 124))} className="di-limb" stroke="#fb7185" strokeWidth="34" />
          <path d={line(iso(96, 141, 128), iso(124, 141, 128))} className="di-limb" stroke="#fb7185" strokeWidth="18" />

          {/* head */}
          <g className="di-head">
            <path d={line(iso(110, 139, 132), iso(110, 138, 150))} className="di-limb" stroke="#eab092" strokeWidth="9" />
            <circle cx={iso(110, 137, 164)[0]} cy={iso(110, 137, 164)[1]} r="15" fill="#f5c6a5" />
            <circle cx={iso(112, 140, 167)[0]} cy={iso(112, 140, 167)[1]} r="15" fill="#6b4228" />
            <circle cx={iso(104, 139, 161)[0]} cy={iso(104, 139, 161)[1]} r="3" fill="#eab092" />
          </g>

          {/* near arm */}
          <path d={line(iso(95, 141, 130), iso(93, 124, 100), iso(98, 82, 94))} className="di-limb" stroke="#fb7185" strokeWidth="12" />
          <circle cx={iso(98, 80, 94)[0]} cy={iso(98, 80, 94)[1]} r="5" fill="#f5c6a5" className="di-hand" />
        </g>

        {/* Chair backrest (in front of the developer's back) */}
        <IsoBox t={107} s={176} h={52} w={6} d={4} z={22} top="#94a3b8" left="#64748b" right="#475569" />
        <g transform={frontPlane(86, 174, 152)}>
          <rect x="0" y="0" width="48" height="72" rx="13" fill={CHAIR.right} />
        </g>
        <g transform={frontPlane(86, 178, 150)}>
          <rect x="0" y="0" width="48" height="72" rx="13" fill={CHAIR.top} />
          <rect x="8" y="8" width="32" height="56" rx="9" fill={CHAIR.left} opacity="0.55" />
        </g>

        {/* Sparkles */}
        {SPARKS.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#93c5fd" className="di-spark" style={{ animationDelay: `${i * 0.6}s` }} />
        ))}

        {/* Tech bubbles */}
        {BUBBLES.map(Bubble)}
      </svg>
    </motion.div>
  );
}

export default DeveloperIllustration;
