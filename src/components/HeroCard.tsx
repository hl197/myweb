"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";
import Image from "next/image";
import { profile } from "@/data/profile";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export default function HeroCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const sparkleId = useRef(0);
  const [idleAngle, setIdleAngle] = useState(0);
  const idleTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const glowPulse = useAnimation();

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

  // Edge chromatic shift
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

  // Avatar magnet offset (subtle, 1/5 of main movement)
  const avatarX = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);
  const avatarY = useTransform(mouseY, [-0.5, 0.5], [-6, 6]);

  // Inner content Z-depth follows mouse for parallax
  const contentZ = useTransform(mouseX, [-0.5, 0.5], [30, 55]);
  const contentRotateX = useTransform(mouseY, [-0.5, 0.5], [3, -3]);
  const contentRotateY = useTransform(mouseX, [-0.5, 0.5], [-3, 3]);

  // Idle auto-rotation
  useEffect(() => {
    if (isHovering) {
      if (idleTimer.current) {
        clearInterval(idleTimer.current);
        idleTimer.current = null;
      }
    } else {
      idleTimer.current = setInterval(() => {
        setIdleAngle((prev) => (prev + 0.15) % 360);
      }, 50);
    }
    return () => {
      if (idleTimer.current) clearInterval(idleTimer.current);
    };
  }, [isHovering]);

  // Pulsing glow animation
  useEffect(() => {
    glowPulse.start({
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.03, 1],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    });
  }, [glowPulse]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX.set((e.clientX - cx) / rect.width);
      mouseY.set((e.clientY - cy) / rect.height);

      // Sparkle trail
      const sparkX = ((e.clientX - rect.left) / rect.width) * 100;
      const sparkY = ((e.clientY - rect.top) / rect.height) * 100;
      const id = sparkleId.current++;
      setSparkles((prev) => [
        ...prev.slice(-19),
        {
          id,
          x: sparkX,
          y: sparkY,
          size: 2 + Math.random() * 4,
          delay: Math.random() * 0.1,
        },
      ]);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== id));
      }, 700);
    },
    [mouseX, mouseY],
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    setIdleAngle(0);
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovering(false);
  }, [mouseX, mouseY]);

  const isImageAvatar =
    profile.avatar.startsWith("/") || profile.avatar.startsWith("http");

  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="min-h-screen w-full snap-start flex items-center justify-center px-4 pt-14"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-sm perspective-[1000px]"
      >
        {/* Flowing gradient border (behind card) */}
        <motion.div
          className="absolute -inset-[2px] rounded-2xl z-[-1]"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{
            background: `conic-gradient(
              from ${idleAngle}deg at 50% 50%,
              #f97316,
              #d946ef,
              #06b6d4,
              #10b981,
              #f97316,
              #d946ef,
              #06b6d4,
              #10b981,
              #f97316
            )`,
            filter: "blur(3px)",
          }}
        />

        <motion.div
          style={{ boxShadow: cardShadow }}
          className="relative overflow-hidden rounded-2xl p-8 text-center bg-white/60 backdrop-blur-xl border border-gray-200/40"
        >
          {/* ===== LAYER 1: Wide iridescent wash ===== */}
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

          {/* ===== LAYER 2: Second harmonic iridescence ===== */}
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

          {/* ===== LAYER 8: Pulsing edge glow ===== */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={glowPulse}
            style={{
              boxShadow:
                "inset 0 0 30px rgba(249,115,22,0.15), inset 0 0 60px rgba(217,70,239,0.08)",
            }}
          />

          {/* ===== CONTENT ===== */}
          <motion.div
            className="relative z-10"
            style={{
              transform: useTransform(
                [contentZ, contentRotateX, contentRotateY],
                ([z, rx, ry]) =>
                  `translateZ(${z}px) rotateX(${rx}deg) rotateY(${ry}deg)`,
              ),
            }}
          >
            {/* Avatar with magnet effect */}
            <motion.div
              className="w-20 h-20 mx-auto mb-4 rounded-full p-[2px] bg-gradient-to-br from-orange-400 to-purple-500"
              style={{ x: avatarX, y: avatarY }}
            >
              <div className="w-full h-full rounded-full bg-[#faf5eb] overflow-hidden flex items-center justify-center">
                {isImageAvatar ? (
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-3xl">{profile.avatar}</span>
                )}
              </div>
            </motion.div>

            {/* Name with shimmer flow */}
            <motion.h1
              className="text-2xl font-bold mb-1 bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent"
              style={{
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "200% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {profile.name}
            </motion.h1>

            {/* Tagline */}
            <p className="text-[#6b7280] text-sm mb-1">{profile.tagline}</p>

            {/* Subtitle */}
            <p className="text-[#6b7280]/60 text-xs font-mono">
              {profile.subtitle}
            </p>
          </motion.div>

          {/* Sparkle trail */}
          {sparkles.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: s.delay }}
              className="absolute pointer-events-none rounded-full bg-white z-20"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                boxShadow:
                  "0 0 6px rgba(255,255,255,0.8), 0 0 12px rgba(249,115,22,0.4)",
              }}
            />
          ))}

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
    </motion.section>
  );
}
