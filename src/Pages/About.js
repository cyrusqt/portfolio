import React from "react";
import { motion } from "framer-motion";
import { FiUser, FiDownload } from "react-icons/fi";
import avatar from "../assets/avatar.png";
import "./About.css";

const paragraphs = [
  "I'm Cyrus, a fresh graduate from Cebu Technological University - Danao Campus and an aspiring Web & Flutter Developer.",
  "I enjoy building clean, responsive, and user-friendly websites and mobile applications using modern technologies.",
  "I'm passionate about learning new tools, solving real-world problems, and continuously improving my development skills.",
  "I'm currently looking for opportunities where I can grow as a developer while contributing to meaningful projects.",
];

const paragraphContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const paragraphItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-bg" aria-hidden="true">
        <span className="about-glow about-glow-1" />
        <span className="about-glow about-glow-2" />
      </div>

      <motion.div
        className="about-container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="about-left">
          <motion.div
            className="about-heading-row"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <FiUser className="about-icon" aria-hidden="true" />
            <h2>About Me</h2>
          </motion.div>
          <span className="about-underline" />

          <motion.div
            className="about-description"
            variants={paragraphContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {paragraphs.map((text) => (
              <motion.p key={text} variants={paragraphItem}>
                {text}
              </motion.p>
            ))}
          </motion.div>

          <motion.a
            href="/resume/CYRUS VINCENT D. LAURON - RESUME.pdf"
            download
            className="resume-btn"
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <FiDownload aria-hidden="true" />
            Download Resume
          </motion.a>
        </div>

        <motion.div
          className="about-right"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="portrait-decorations" aria-hidden="true">
            <span className="dot-grid dot-grid-1">
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} />
              ))}
            </span>
            <span className="dot-grid dot-grid-2">
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} />
              ))}
            </span>
            <motion.span
              className="floating-ring ring-1"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="floating-ring ring-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="portrait-card">
            <img
              src={avatar}
              alt="Portrait of Cyrus wearing professional attire"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default About;
