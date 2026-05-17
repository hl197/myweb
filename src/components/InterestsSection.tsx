"use client";

import { motion } from "framer-motion";
import { interests } from "@/data/interests";

export default function InterestsSection() {
  return (
    <section
      id="interests"
      className="min-h-screen w-full snap-start py-24 px-4 bg-white/40 flex items-center"
    >
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-xl font-semibold text-[#1a1a2e] mb-8 flex items-center gap-2">
          <span className="text-orange-500 font-mono">&gt;</span> 兴趣
          <span className="text-[#6b7280]/50 text-sm font-mono">
            {"// 代码之外"}
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
              <span className="text-sm text-[#6b7280]">{interest.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
