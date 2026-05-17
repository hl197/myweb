"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { profile } from "@/data/profile";

export default function HeroCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D tilt
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);

  // Iridescent conic rotation
  const conicAngle = useTransform(mouseX, [-0.5, 0.5], [-60, 60]);

  // Radial glow center follows mouse
  const glowX = useTransform(mouseX, [-0.5, 0.5], [20, 80]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], [20, 80]);

  // Edge chromatic shift (red moves opposite blue = prism effect)
  const redEdge = useTransform(mouseX, [-0.5, 0.5], [10, -10]);
  const blueEdge = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  // Sheen follows mouse
  const sheenOpacity = useTransform(
    mouseX,
    [-0.5, -0.1, 0.1, 0.5],
    [0.15, 0.6, 0.6, 0.15],
  );
  const sheenAngle = useTransform(mouseX, [-0.5, 0.5], [30, 70]);

  // Card shadow depth
  const cardShadow = useTransform(mouseX, (v) => {
    const i = Math.abs(v) * 0.8;
    return [
      `0 25px 50px -12px rgba(249,115,22,${0.08 + i * 0.35})`,
      `0 0 ${30 + i * 25}px rgba(217,70,239,${0.04 + i * 0.18})`,
    ].join(", ");
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set((e.clientX - cx) / rect.width);
    mouseY.set((e.clientY - cy) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero"
      className="min-h-screen w-full snap-start flex items-center justify-center px-4 pt-14"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-sm perspective-[1000px]"
      >
        <motion.div
          style={{ boxShadow: cardShadow }}
          className="relative overflow-hidden rounded-2xl p-8 text-center bg-white border border-gray-200/50"
        >
          {/* ===== LAYER 1: Wide iridescent wash (full-card color diffusion) ===== */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              filter: "blur(4px)",
              background: useTransform(conicAngle, (a) => {
                return `conic-gradient(
                  from ${a}deg at 50% 50%,
                  transparent 0deg,
                  rgba(255,80,120,0.07) 30deg,
                  rgba(255,160,60,0.06) 70deg,
                  rgba(255,220,80,0.05) 110deg,
                  rgba(160,255,100,0.04) 150deg,
                  rgba(60,255,180,0.05) 190deg,
                  rgba(60,200,255,0.06) 230deg,
                  rgba(100,100,255,0.08) 270deg,
                  rgba(180,60,255,0.08) 310deg,
                  rgba(255,60,200,0.07) 350deg,
                  transparent 360deg
                )`;
              }),
            }}
          />

          {/* ===== LAYER 2: Second harmonic iridescence (offset, slower) ===== */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              filter: "blur(8px)",
              background: useTransform(conicAngle, (a) => {
                const offset = (a + 180) % 360;
                return `conic-gradient(
                  from ${offset}deg at 50% 50%,
                  transparent 0deg,
                  rgba(100,200,255,0.05) 80deg,
                  rgba(255,100,200,0.04) 160deg,
                  rgba(200,255,100,0.05) 240deg,
                  rgba(255,200,100,0.04) 320deg,
                  transparent 360deg
                )`;
              }),
            }}
          />

          {/* ===== LAYER 3: Radial glow at mouse position ===== */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              filter: "blur(20px)",
              background: useTransform([glowX, glowY], ([x, y]) => {
                return `radial-gradient(
                  ellipse 250px 250px at ${x}% ${y}%,
                  rgba(255,255,255,0.25) 0%,
                  rgba(255,180,80,0.12) 20%,
                  rgba(255,80,180,0.08) 40%,
                  rgba(80,180,255,0.08) 60%,
                  transparent 80%
                )`;
              }),
            }}
          />

          {/* ===== LAYER 4: Red chromatic edge shift ===== */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              x: redEdge,
              background: useTransform(mouseX, (v) => {
                const i = Math.abs(v);
                return `radial-gradient(
                  ellipse 120% 100% at ${v > 0 ? "0%" : "100%"} 50%,
                  rgba(255,40,80,${i * 0.25}) 0%,
                  rgba(255,120,40,${i * 0.1}) 30%,
                  transparent 70%
                )`;
              }),
              filter: "blur(20px)",
            }}
          />

          {/* ===== LAYER 5: Green chromatic edge ===== */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              x: useTransform(mouseX, [-0.5, 0.5], [-3, 3]),
              background: useTransform(mouseX, (v) => {
                const i = Math.abs(v);
                return `radial-gradient(
                  ellipse 100% 100% at 50% 50%,
                  rgba(100,255,140,${i * 0.06}) 30%,
                  transparent 70%
                )`;
              }),
              filter: "blur(25px)",
            }}
          />

          {/* ===== LAYER 6: Blue chromatic edge shift ===== */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              x: blueEdge,
              background: useTransform(mouseX, (v) => {
                const i = Math.abs(v);
                return `radial-gradient(
                  ellipse 120% 100% at ${v < 0 ? "0%" : "100%"} 50%,
                  rgba(60,60,255,${i * 0.25}) 0%,
                  rgba(60,200,255,${i * 0.1}) 30%,
                  transparent 70%
                )`;
              }),
              filter: "blur(20px)",
            }}
          />

          {/* ===== LAYER 7: Specular sheen ===== */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: sheenOpacity,
              background: useTransform(sheenAngle, (a) => {
                return `linear-gradient(${a}deg,
                  transparent 35%,
                  rgba(255,255,255,0.20) 42%,
                  rgba(255,255,255,0.05) 45%,
                  transparent 52%
                )`;
              }),
            }}
          />

          {/* ===== CONTENT ===== */}
          <div
            className="relative z-10"
            style={{ transform: "translateZ(40px)" }}
          >
            {/* Avatar */}
            <div className="w-20 h-20 mx-auto mb-4 rounded-full p-[2px] bg-gradient-to-br from-orange-400 to-purple-500">
              <div className="w-full h-full rounded-full bg-[#faf5eb] flex items-center justify-center text-3xl">
                {profile.avatar}
              </div>
            </div>

            {/* Name */}
            <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
              {profile.name}
            </h1>

            {/* Tagline */}
            <p className="text-[#6b7280] text-sm mb-1">{profile.tagline}</p>

            {/* Subtitle */}
            <p className="text-[#6b7280]/60 text-xs font-mono">
              {profile.subtitle}
            </p>
          </div>

          {/* Glow dots */}
          <motion.div
            className="absolute bottom-3 right-4 flex gap-1.5 z-10"
            style={{
              opacity: useTransform(mouseX, [-0.5, 0, 0.5], [0.3, 1, 0.3]),
            }}
          >
            <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_#f97316]" />
            <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#d946ef]" />
          </motion.div>

          {/* Corner decorations */}
          <div className="absolute top-3 left-3 w-6 h-[1px] bg-gradient-to-r from-orange-400 to-transparent z-10" />
          <div className="absolute top-3 left-3 w-[1px] h-6 bg-gradient-to-b from-orange-400 to-transparent z-10" />
          <div className="absolute bottom-3 left-3 w-6 h-[1px] bg-gradient-to-r from-purple-400 to-transparent z-10" />
          <div className="absolute bottom-3 left-3 w-[1px] h-6 bg-gradient-to-t from-purple-400 to-transparent z-10" />
        </motion.div>
      </motion.div>
    </section>
  );
}
