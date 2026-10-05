import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiBriefcase, FiChevronLeft, FiChevronRight, FiEye, FiX } from "react-icons/fi";
import portfolioScreenshot from "../assets/image.png";
import sinkingFundScreenshot from "../assets/sinkingfund.jpg";
import procrewMobileScreenshot from "../assets/procrewmobile.png";
import serbisyoMobileScreenshot from "../assets/serbisyosanremigio.png";
import "./Project.css";

function PortfolioScreenshot() {
  return (
    <img
      src={portfolioScreenshot}
      alt="Portfolio Website screenshot"
      className="project-mockup"
    />
  );
}

function SinkingFundScreenshot() {
  return (
    <img
      src={sinkingFundScreenshot}
      alt="Sinking Fund Management System screenshot"
      className="project-mockup"
    />
  );
}

function ProCrewMobileScreenshot() {
  return (
    <img
      src={procrewMobileScreenshot}
      alt="Pro Crew Schedule Mobile Application screenshot"
      className="project-mockup"
    />
  );
}

function SerbisyoMobileScreenshot() {
  return (
    <img
      src={serbisyoMobileScreenshot}
      alt="Serbisyo San Remigio Mobile Application screenshot"
      className="project-mockup"
    />
  );
}

const PROJECTS = [
  {
    title: "Portfolio Website",
    description:
      "A modern personal portfolio showcasing my projects, skills, and experience built using Next.js and Tailwind CSS.",
    stack: ["HTML", "CSS", "JavaScript", "React", "Framer Motion"],
    Visual: PortfolioScreenshot,
  },
  {
    title: "Sinking Fund Management System",
    description:
      "A web-based healthcare management system for barangay clinics with appointment scheduling, patient records, and reporting.",
    stack: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    Visual: SinkingFundScreenshot,
  },
  {
    title: "Pro Crew Schedule Mobile Application",
    description:
      "A cross-platform Flutter application with modern UI, REST API integration, authentication, and responsive mobile experience.",
    stack: ["Flutter", "Dart", "REST API", "Dio", "Riverpod", "Postman", "Firebase"],
    Visual: ProCrewMobileScreenshot,
  },
  {
    title: "Serbisyo San Remigio",
    description:
      "A public service platform for the Municipality of San Remigio that lets residents access local government services and request assistance online.",
    stack: ["Flutter", "Dart", "REST API","Clean Architecture", "Firebase", "Dio"],
    Visual: SerbisyoMobileScreenshot,
  },
];

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function ProjectCard({ project, onOpen }) {
  const { title, description, stack, Visual } = project;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <motion.article
      className="project-card"
      variants={cardItem}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      role="button"
      tabIndex={0}
      aria-label={`View project: ${title}`}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
    >
      <div className="project-image">
        <Visual />
        <span className="project-view-hint" aria-hidden="true">
          <FiEye />
          View Project
        </span>
      </div>

      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>

        <motion.div
          className="project-badges"
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          {stack.map((tech) => (
            <motion.span
              key={tech}
              className="project-badge"
              variants={cardItem}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ index, onClose, onNavigate }) {
  const closeRef = useRef(null);
  const project = PROJECTS[index];

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onNavigate]);

  const { title, description, stack, Visual } = project;

  return (
    <motion.div
      className="project-modal-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <button
          ref={closeRef}
          type="button"
          className="project-modal-close"
          onClick={onClose}
          aria-label="Close project preview"
        >
          <FiX aria-hidden="true" />
        </button>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={title}
            className="project-modal-body"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="project-modal-image">
              <Visual />
            </div>

            <div className="project-modal-content">
              <span className="project-modal-count">
                {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
              </span>
              <h3 id="project-modal-title">{title}</h3>
              <p>{description}</p>
              <div className="project-badges">
                {stack.map((tech) => (
                  <span key={tech} className="project-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="project-modal-nav">
          <button type="button" onClick={() => onNavigate(-1)} aria-label="Previous project">
            <FiChevronLeft aria-hidden="true" />
            Prev
          </button>
          <button type="button" onClick={() => onNavigate(1)} aria-label="Next project">
            Next
            <FiChevronRight aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Project() {
  const [activeIndex, setActiveIndex] = useState(null);

  const closeModal = useCallback(() => setActiveIndex(null), []);
  const navigate = useCallback(
    (step) => setActiveIndex((i) => (i + step + PROJECTS.length) % PROJECTS.length),
    []
  );

  return (
    <section className="projects-section" id="projects">
      <div className="projects-bg" aria-hidden="true">
        <span className="projects-glow projects-glow-1" />
        <span className="projects-glow projects-glow-2" />
      </div>

      <motion.div
        className="projects-container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="projects-header">
          <div className="projects-heading-row">
            <FiBriefcase className="projects-icon" aria-hidden="true" />
            <h2>
              Featured <span className="projects-accent">Projects</span>
            </h2>
          </div>

          <span className="projects-dots" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i} />
            ))}
          </span>
        </div>
        <span className="projects-underline" />

        <motion.div
          className="projects-grid"
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} onOpen={() => setActiveIndex(i)} />
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {activeIndex !== null && (
          <ProjectModal index={activeIndex} onClose={closeModal} onNavigate={navigate} />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Project;
