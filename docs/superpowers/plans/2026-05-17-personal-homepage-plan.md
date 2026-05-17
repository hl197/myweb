# 个人主页 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page personal homepage with warm/light particle-photon style, featuring personal card with 3D tilt + dispersion effect, skills, projects, timeline, and interests sections.

**Architecture:** Next.js 15 App Router with static export, TypeScript, Tailwind CSS v4 for styling (warm color palette), Framer Motion for advanced animations. Data separated into typed data files. Components are self-contained section modules assembled on the main page.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion 12

---

### Task 1: Initialize Next.js Project

**Files:**

- Create: `D:/个人网页/` (project root)

- [ ] **Step 1: Scaffold Next.js project**

```bash
cd "D:/个人网页"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-npm
```

Answer prompts: "Yes" for all defaults.

- [ ] **Step 2: Install framer-motion**

```bash
npm install framer-motion
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Visit http://localhost:3000 — should see the default Next.js page. Stop the server with Ctrl+C.

- [ ] **Step 4: Clean up default files**

Delete these auto-generated files:

- `src/app/favicon.ico`
- `src/app/page.tsx` (will rewrite)
- `src/app/globals.css` (will rewrite)

```bash
rm -f "src/app/favicon.ico"
```

---

### Task 2: Configure Tailwind Theme + Global Styles

**Files:**

- Create: `src/app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Set up Tailwind config**

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          bg: "#faf5eb",
          card: "#ffffff",
          orange: "#f97316",
          purple: "#d946ef",
          green: "#10b981",
        },
        text: {
          primary: "#1a1a2e",
          secondary: "#6b7280",
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans SC"',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          "system-ui",
          "sans-serif",
        ],
        mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      },
      animation: {
        "particle-drift": "particle-drift 20s linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "slide-in-left": "slide-in-left 0.6s ease-out forwards",
      },
      keyframes: {
        "particle-drift": {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": {
            transform: "translateY(-100vh) translateX(100px)",
            opacity: "0",
          },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
```

- [ ] **Step 2: Write global CSS**

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: #faf5eb;
  color: #1a1a2e;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Selection */
::selection {
  background: rgba(249, 115, 22, 0.2);
  color: #1a1a2e;
}
```

---

### Task 3: Create Data Files

**Files:**

- Create: `src/data/profile.ts`
- Create: `src/data/skills.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/timeline.ts`
- Create: `src/data/interests.ts`

- [ ] **Step 1: Create profile data**

```ts
// src/data/profile.ts
export interface Profile {
  name: string;
  avatar: string; // emoji placeholder, replace with actual image later
  tagline: string;
  subtitle: string;
}

export const profile: Profile = {
  name: "你的名字",
  avatar: "👤",
  tagline: "全栈开发者 · 创造者 · 终身学习者",
  subtitle: "<code /> & chill",
};
```

- [ ] **Step 2: Create skills data**

```ts
// src/data/skills.ts
export interface Skill {
  name: string;
  color: "orange" | "purple" | "green";
}

export interface SkillCategory {
  label: string;
  color: "orange" | "purple" | "green";
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: "前端",
    color: "orange",
    skills: [
      { name: "React", color: "orange" },
      { name: "TypeScript", color: "orange" },
      { name: "Next.js", color: "orange" },
      { name: "Tailwind CSS", color: "orange" },
      { name: "Vue", color: "orange" },
    ],
  },
  {
    label: "后端",
    color: "purple",
    skills: [
      { name: "Node.js", color: "purple" },
      { name: "Python", color: "purple" },
      { name: "PostgreSQL", color: "purple" },
    ],
  },
  {
    label: "工具",
    color: "green",
    skills: [
      { name: "Git", color: "green" },
      { name: "Docker", color: "green" },
    ],
  },
];
```

- [ ] **Step 3: Create projects data**

```ts
// src/data/projects.ts
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "项目名称",
    description: "简短的项目描述，说明做了什么、用了什么技术",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "另一个项目",
    description: "简短的项目描述",
    tags: ["Python", "FastAPI"],
  },
];
```

- [ ] **Step 4: Create timeline data**

```ts
// src/data/timeline.ts
export interface TimelineEntry {
  period: string;
  title: string;
  description: string;
}

export const timeline: TimelineEntry[] = [
  {
    period: "2024 — 至今",
    title: "公司/学校名称",
    description: "职位/专业 · 简短描述做了什么",
  },
  {
    period: "2022 — 2024",
    title: "之前的经历",
    description: "职位/专业 · 简短描述",
  },
];
```

- [ ] **Step 5: Create interests data**

```ts
// src/data/interests.ts
export interface Interest {
  emoji: string;
  label: string;
}

export const interests: Interest[] = [
  { emoji: "🎸", label: "吉他" },
  { emoji: "📷", label: "摄影" },
  { emoji: "🎮", label: "游戏" },
  { emoji: "🏃", label: "跑步" },
];
```

---

### Task 4: ParticleBackground Component

**Files:**

- Create: `src/components/ParticleBackground.tsx`

- [ ] **Step 1: Create ParticleBackground component**

```tsx
// src/components/ParticleBackground.tsx
"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 60;
    const colors = ["#f97316", "#d946ef", "#fbbf24"];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticle(): Particle {
      return {
        x: Math.random() * (canvas?.width ?? window.innerWidth),
        y: Math.random() * (canvas?.height ?? window.innerHeight),
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5 - 0.2,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    }

    function connectParticles() {
      if (!ctx || !canvas) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = 0.08 * (1 - dist / 150);
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas!.width;
        if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        if (p.y > canvas!.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      connectParticles();
      animationId = requestAnimationFrame(animate);
    }

    resize();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }
    animate();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
```

---

### Task 5: Navbar Component

**Files:**

- Create: `src/components/Navbar.tsx`

- [ ] **Step 1: Create Navbar component**

```tsx
// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { profile } from "@/data/profile";

const NAV_ITEMS = [
  { id: "hero", label: "首页" },
  { id: "skills", label: "技能" },
  { id: "projects", label: "项目" },
  { id: "timeline", label: "时间线" },
  { id: "interests", label: "兴趣" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < lastScrollY || currentY < 80);
      setLastScrollY(currentY);

      // Determine active section
      const sections = NAV_ITEMS.map((item) =>
        document.getElementById(item.id),
      ).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 backdrop-blur-md bg-white/70 border-b border-orange-200/30 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="text-sm font-semibold bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          {profile.name}
        </button>
        <div className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-sm transition-colors ${
                activeSection === item.id
                  ? "text-orange-500 font-medium"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

---

### Task 6: HeroCard Component (3D Tilt + Dispersion)

**Files:**

- Create: `src/components/HeroCard.tsx`

- [ ] **Step 1: Create HeroCard with 3D tilt and light dispersion**

```tsx
// src/components/HeroCard.tsx
"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { profile } from "@/data/profile";

export default function HeroCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normX = (e.clientX - centerX) / rect.width;
    const normY = (e.clientY - centerY) / rect.height;
    x.set(normX);
    y.set(normY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 pt-14"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-sm perspective-[1000px]"
      >
        {/* Card body */}
        <div
          className={`
            relative overflow-hidden rounded-2xl p-8 text-center
            bg-white border transition-shadow duration-500
            ${isHovered ? "shadow-xl shadow-orange-200/50 border-orange-300/50" : "shadow-md border-gray-200/50"}
          `}
        >
          {/* Rainbow dispersion sweep */}
          <motion.div
            initial={{ left: "-100%", opacity: 0 }}
            animate={{
              left: isHovered ? "200%" : "-100%",
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,0,0,0.06), rgba(255,255,0,0.06), rgba(0,255,0,0.06), rgba(0,255,255,0.06), rgba(0,0,255,0.06), rgba(255,0,255,0.06), transparent)",
            }}
          />

          {/* Reflection shine */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0,
              rotate: isHovered ? 0 : 25,
            }}
            transition={{ duration: 0.4 }}
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none"
            style={{
              background:
                "linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(249,115,22,0.1) 48%, rgba(217,70,239,0.08) 50%, rgba(255,255,255,0.1) 52%, transparent 55%)",
            }}
          />

          {/* Content */}
          <div
            className="relative z-10"
            style={{ transform: "translateZ(30px)" }}
          >
            {/* Avatar */}
            <div className="w-20 h-20 mx-auto mb-4 rounded-full p-[2px] bg-gradient-to-br from-orange-400 to-purple-500">
              <div className="w-full h-full rounded-full bg-warm-bg flex items-center justify-center text-3xl">
                {profile.avatar}
              </div>
            </div>

            {/* Name */}
            <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
              {profile.name}
            </h1>

            {/* Tagline */}
            <p className="text-text-secondary text-sm mb-1">
              {profile.tagline}
            </p>

            {/* Subtitle */}
            <p className="text-text-secondary/60 text-xs font-mono">
              {profile.subtitle}
            </p>
          </div>

          {/* Glow dots */}
          <div className="absolute bottom-3 right-4 flex gap-1.5 z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_6px_#f97316]" />
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_#d946ef]" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
```

---

### Task 7: SkillsSection Component

**Files:**

- Create: `src/components/SkillsSection.tsx`

- [ ] **Step 1: Create SkillsSection**

```tsx
// src/components/SkillsSection.tsx
"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";

const colorMap = {
  orange: {
    border: "border-orange-300/50",
    text: "text-orange-500",
    bg: "bg-orange-50/50",
    label: "text-orange-500",
  },
  purple: {
    border: "border-purple-300/50",
    text: "text-purple-500",
    bg: "bg-purple-50/50",
    label: "text-purple-500",
  },
  green: {
    border: "border-green-300/50",
    text: "text-green-500",
    bg: "bg-green-50/50",
    label: "text-green-500",
  },
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-text-primary mb-8 flex items-center gap-2">
          <span className="text-orange-500 font-mono">&gt;</span> 技能
          <span className="text-text-secondary/50 text-sm font-mono">
            // Technologies I work with
          </span>
        </h2>

        <div className="space-y-8">
          {skillCategories.map((category, ci) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: ci * 0.1 }}
            >
              <p
                className={`font-mono text-sm mb-3 ${colorMap[category.color].label}`}
              >
                [ {category.label} ]
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, si) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.1 + si * 0.05 }}
                    className={`
                      px-3 py-1.5 rounded-full text-sm font-medium
                      border ${colorMap[skill.color].border} ${colorMap[skill.color].bg} ${colorMap[skill.color].text}
                      transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-default
                    `}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 8: ProjectsSection Component

**Files:**

- Create: `src/components/ProjectsSection.tsx`

- [ ] **Step 1: Create ProjectsSection**

```tsx
// src/components/ProjectsSection.tsx
"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 bg-white/40">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-text-primary mb-8 flex items-center gap-2">
          <span className="text-orange-500 font-mono">&gt;</span> 项目
          <span className="text-text-secondary/50 text-sm font-mono">
            // Things I&apos;ve built
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.link || "#"}
              target={project.link ? "_blank" : undefined}
              rel={project.link ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className={`
                block p-5 rounded-xl border bg-white
                transition-all duration-300 hover:shadow-lg hover:-translate-y-1
                ${i % 2 === 0 ? "border-orange-200/50 hover:shadow-orange-100/50" : "border-purple-200/50 hover:shadow-purple-100/50"}
              `}
            >
              <p
                className={`font-mono text-xs mb-2 ${i % 2 === 0 ? "text-orange-400" : "text-purple-400"}`}
              >
                {String(project.id).padStart(2, "0")}.
              </p>
              <h3 className="font-semibold text-text-primary mb-1">
                {project.title}
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs font-mono text-text-secondary/60 bg-gray-50 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 9: TimelineSection Component

**Files:**

- Create: `src/components/TimelineSection.tsx`

- [ ] **Step 1: Create TimelineSection**

```tsx
// src/components/TimelineSection.tsx
"use client";

import { motion } from "framer-motion";
import { timeline } from "@/data/timeline";

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-text-primary mb-8 flex items-center gap-2">
          <span className="text-orange-500 font-mono">&gt;</span> 经历
          <span className="text-text-secondary/50 text-sm font-mono">
            // Timeline
          </span>
        </h2>

        <div className="relative pl-8">
          {/* Vertical gradient line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-orange-400 via-purple-500 to-transparent" />

          {timeline.map((entry, i) => (
            <motion.div
              key={entry.period}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15 }}
              className="relative pb-8 last:pb-0"
            >
              {/* Node dot */}
              <div
                className={`absolute -left-8 top-1 w-[22px] h-[22px] -translate-x-1/2 rounded-full border-4 border-white bg-warm-bg shadow-sm ${
                  i % 2 === 0 ? "shadow-orange-200" : "shadow-purple-200"
                }`}
              >
                <div
                  className={`w-full h-full rounded-full ${
                    i % 2 === 0 ? "bg-orange-400" : "bg-purple-500"
                  }`}
                />
              </div>

              {/* Content */}
              <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <p
                  className={`font-mono text-xs mb-1 ${i % 2 === 0 ? "text-orange-500" : "text-purple-500"}`}
                >
                  {entry.period}
                </p>
                <h3 className="font-semibold text-text-primary">
                  {entry.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {entry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 10: InterestsSection Component

**Files:**

- Create: `src/components/InterestsSection.tsx`

- [ ] **Step 1: Create InterestsSection**

```tsx
// src/components/InterestsSection.tsx
"use client";

import { motion } from "framer-motion";
import { interests } from "@/data/interests";

export default function InterestsSection() {
  return (
    <section id="interests" className="py-24 px-4 bg-white/40">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-text-primary mb-8 flex items-center gap-2">
          <span className="text-orange-500 font-mono">&gt;</span> 兴趣
          <span className="text-text-secondary/50 text-sm font-mono">
            // Beyond code
          </span>
        </h2>

        <div className="flex flex-wrap gap-4">
          {interests.map((interest, i) => (
            <motion.div
              key={interest.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center gap-1.5 px-5 py-4 rounded-xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-default"
            >
              <span className="text-2xl">{interest.emoji}</span>
              <span className="text-sm text-text-secondary">
                {interest.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 11: Assemble Main Page

**Files:**

- Modify: `src/app/page.tsx`
- Create: `src/app/layout.tsx`

- [ ] **Step 1: Create root layout**

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profile.name} - 个人主页`,
  description: profile.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className="antialiased">
        <Navbar />
        <ParticleBackground />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Create main page assembling all sections**

```tsx
// src/app/page.tsx
import HeroCard from "@/components/HeroCard";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import TimelineSection from "@/components/TimelineSection";
import InterestsSection from "@/components/InterestsSection";

export default function Home() {
  return (
    <>
      <HeroCard />
      <SkillsSection />
      <ProjectsSection />
      <TimelineSection />
      <InterestsSection />
    </>
  );
}
```

- [ ] **Step 3: Verify everything compiles and runs**

```bash
cd "D:/个人网页"
npm run dev
```

Visit http://localhost:3000 — verify:

1. Particle background renders
2. Navbar shows, click items scroll smoothly
3. Hero card tilts on mouse move, shows light sweep on hover
4. All sections render with staggered entrance animations
5. Color scheme is warm/light (not dark)
