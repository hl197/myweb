"use client";

import { motion } from "framer-motion";
import { timeline } from "@/data/timeline";

export default function TimelineSection() {
  return (
    <section
      id="timeline"
      className="min-h-screen w-full snap-start py-24 px-4 flex items-center"
    >
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-xl font-semibold text-[#1a1a2e] mb-8 flex items-center gap-2">
          <span className="text-orange-500 font-mono">&gt;</span> 经历
          <span className="text-[#6b7280]/50 text-sm font-mono">
            {"// 时间线"}
          </span>
        </h2>

        <div className="relative pl-8">
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
              <div
                className={`absolute -left-8 top-1 w-[22px] h-[22px] -translate-x-1/2 rounded-full border-4 border-white bg-[#faf5eb] shadow-sm ${
                  i % 2 === 0 ? "shadow-orange-200" : "shadow-purple-200"
                }`}
              >
                <div
                  className={`w-full h-full rounded-full ${
                    i % 2 === 0 ? "bg-orange-400" : "bg-purple-500"
                  }`}
                />
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <p
                  className={`font-mono text-xs mb-1 ${i % 2 === 0 ? "text-orange-500" : "text-purple-500"}`}
                >
                  {entry.period}
                </p>
                <h3 className="font-semibold text-[#1a1a2e]">{entry.title}</h3>
                <p className="text-[#6b7280] text-sm">{entry.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
