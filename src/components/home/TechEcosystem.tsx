"use client";
import React, { useState, useRef } from "react";
import styles from "./TechEcosystem.module.css";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ThreeDSection from "@/components/ThreeDSection";

interface TechItem {
  name: string;
  categories: string[];
}

export default function TechEcosystem() {
  const categories = [
    { id: "all", label: "All Tech" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "cloud", label: "Cloud" },
    { id: "ai", label: "AI & Data" },
    { id: "database", label: "Database" },
    { id: "devops", label: "DevOps" },
    { id: "security", label: "Security" }
  ];

  const technologies: TechItem[] = [
    { name: "React", categories: ["frontend"] },
    { name: "Next.js", categories: ["frontend"] },
    { name: "TypeScript", categories: ["frontend", "backend"] },
    { name: "CSS Modules", categories: ["frontend"] },
    { name: "Framer Motion", categories: ["frontend"] },
    { name: "Node.js", categories: ["backend"] },
    { name: "Go", categories: ["backend"] },
    { name: "Python", categories: ["backend", "ai"] },
    { name: "Apache Kafka", categories: ["backend", "devops"] },
    { name: "gRPC", categories: ["backend"] },
    { name: "AWS", categories: ["cloud"] },
    { name: "Google Cloud", categories: ["cloud"] },
    { name: "Terraform", categories: ["cloud", "devops"] },
    { name: "Serverless", categories: ["cloud"] },
    { name: "PyTorch", categories: ["ai"] },
    { name: "OpenAI API", categories: ["ai"] },
    { name: "LangChain", categories: ["ai"] },
    { name: "Vector Databases", categories: ["ai", "database"] },
    { name: "PostgreSQL", categories: ["database"] },
    { name: "Redis", categories: ["database"] },
    { name: "Pinecone", categories: ["database", "ai"] },
    { name: "Docker", categories: ["devops"] },
    { name: "Kubernetes", categories: ["devops", "cloud"] },
    { name: "GitHub Actions", categories: ["devops"] },
    { name: "Prometheus", categories: ["devops"] },
    { name: "OAuth 2.1", categories: ["security"] },
    { name: "Zero Trust Tunnels", categories: ["security", "cloud"] },
    { name: "Cloudflare WAF", categories: ["security", "cloud"] },
    { name: "Vault", categories: ["security", "devops"] },
    { name: "Access Controls", categories: ["security"] }
  ];

  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRef = useRef<HTMLDivElement>(null);
  const cloudContainerRef = useRef<HTMLDivElement>(null);

  // Hover tracking for category buttons and tag displacement
  const [hoveredCategoryBtn, setHoveredCategoryBtn] = useState<string | null>(null);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [tagCenters, setTagCenters] = useState<Record<string, { x: number; y: number }>>({});

  const categoryColors: Record<string, string> = {
    frontend: "#06B6D4", // Cyan
    backend: "#7C3AED",  // Purple
    cloud: "#3B82F6",    // Blue
    ai: "#D946EF",       // Magenta
    database: "#10B981", // Emerald
    devops: "#F97316",   // Orange
    security: "#EF4444"  // Red
  };

  const getTagColor = (categoriesList: string[]) => {
    if (activeCategory !== "all" && categoriesList.includes(activeCategory)) {
      return categoryColors[activeCategory] || "#7C3AED";
    }
    const mainCat = categoriesList[0];
    return categoryColors[mainCat] || "#7C3AED";
  };

  const handleTagHoverStart = (name: string) => {
    setHoveredTag(name);
    if (!cloudContainerRef.current) return;

    const newCenters: Record<string, { x: number; y: number }> = {};
    const parentRect = cloudContainerRef.current.getBoundingClientRect();
    const tagElements = cloudContainerRef.current.querySelectorAll("[data-tagname]");

    tagElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const tagname = el.getAttribute("data-tagname");
      if (tagname) {
        newCenters[tagname] = {
          x: rect.left + rect.width / 2 - parentRect.left,
          y: rect.top + rect.height / 2 - parentRect.top
        };
      }
    });
    setTagCenters(newCenters);
  };

  const handleTagHoverEnd = () => {
    setHoveredTag(null);
  };

  // Mouse coordinate motion values relative to center (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };

  // Map mouse positions to rotations in degrees
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const filteredTech = technologies.filter((tech) => {
    if (activeCategory === "all") return true;
    return tech.categories.includes(activeCategory);
  });

  return (
    <ThreeDSection className={`${styles.section} section-padding`} id="technology">
      <div 
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="container"
        style={{ perspective: "1000px" }}
      >
        
        <div className={styles.titleBlock} style={{ transform: "translateZ(30px)" }}>
          <h2 className={styles.title}>Technology Ecosystem</h2>
          <p className={styles.desc}>
            We build with cutting-edge, enterprise-grade tooling to ensure durability and scalability.
          </p>
        </div>

        {/* 3D Parallax Tilt container wrapper */}
        <motion.div
          className={styles.interactiveWrapper}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
        >
          {/* Tab Filters */}
          <ul className={styles.tabsList}>
            {categories.map((cat) => {
              const catColor = cat.id === "all" ? "#7C3AED" : (categoryColors[cat.id] || "#7C3AED");
              const isActive = activeCategory === cat.id;
              const isHovered = hoveredCategoryBtn === cat.id;

              return (
                <li key={cat.id}>
                  <button
                    className={`${styles.tabBtn} ${isActive ? styles.activeTabBtn : ""}`}
                    onClick={() => setActiveCategory(cat.id)}
                    onMouseEnter={() => setHoveredCategoryBtn(cat.id)}
                    onMouseLeave={() => setHoveredCategoryBtn(null)}
                    style={{
                      borderColor: isHovered ? catColor : undefined,
                      boxShadow: isHovered 
                        ? (isActive 
                          ? `0 0 15px ${catColor}50, 0 4px 10px rgba(17, 24, 37, 0.15)` 
                          : `0 0 15px ${catColor}40, inset 0 0 8px ${catColor}20`)
                        : undefined,
                      color: isHovered && !isActive ? catColor : undefined,
                    }}
                  >
                    {cat.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Cloud Tags */}
          <div ref={cloudContainerRef} className={styles.cloudContainer}>
            {filteredTech.map((tech) => {
              const isHighlighted = tech.categories.includes(activeCategory);
              
              // Calculate dynamic magnetic displacement
              let scale = 1;
              let xOffset = 0;
              let yOffset = 0;
              const isHovered = hoveredTag === tech.name;

              if (hoveredTag && !isHovered) {
                const centerHovered = tagCenters[hoveredTag];
                const centerCurrent = tagCenters[tech.name];

                if (centerHovered && centerCurrent) {
                  const dx = centerCurrent.x - centerHovered.x;
                  const dy = centerCurrent.y - centerHovered.y;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  const maxDistance = 160; // area of ripple influence

                  if (distance < maxDistance && distance > 0) {
                    const factor = 1 - distance / maxDistance; // 1 at center, 0 at outer boundary
                    scale = 1 - factor * 0.08; // scale down neighbor slightly
                    
                    const nudgeStrength = 12; // displacement nudge force
                    xOffset = (dx / distance) * nudgeStrength * factor;
                    yOffset = (dy / distance) * nudgeStrength * factor;
                  }
                }
              } else if (isHovered) {
                scale = 1.15;
              }

              const neonColor = getTagColor(tech.categories);

              return (
                <motion.div
                  key={tech.name}
                  data-tagname={tech.name}
                  className={`${styles.techTag} ${isHighlighted && activeCategory !== "all" ? styles.highlightedTag : ""}`}
                  style={{
                    borderColor: isHovered ? neonColor : undefined,
                    boxShadow: isHovered ? `0 0 15px ${neonColor}40, inset 0 0 8px ${neonColor}20` : undefined,
                    color: isHovered ? neonColor : undefined,
                    zIndex: isHovered ? 50 : 10,
                  }}
                  animate={{
                    x: xOffset,
                    y: yOffset,
                    scale: scale,
                    z: isHovered ? 35 : 20, // smooth 3D translateZ animation
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 24,
                  }}
                  onMouseEnter={() => handleTagHoverStart(tech.name)}
                  onMouseLeave={handleTagHoverEnd}
                >
                  {tech.name}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </ThreeDSection>
  );
}

