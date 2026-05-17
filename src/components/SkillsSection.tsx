"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";

const colorMap: Record<string, string> = {
  orange: "border-orange-300/50 bg-orange-50/50 text-orange-500",
  purple: "border-purple-300/50 bg-purple-50/50 text-purple-500",
  green: "border-green-300/50 bg-green-50/50 text-green-500",
  blue: "border-blue-300/50 bg-blue-50/50 text-blue-500",
  rose: "border-rose-300/50 bg-rose-50/50 text-rose-500",
};

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="min-h-screen w-full snap-start py-24 px-4 flex items-center"
    >
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-xl font-semibold text-[#1a1a2e] mb-8 flex items-center gap-2">
          <span className="text-orange-500 font-mono">&gt;</span> 技能
          <span className="text-[#6b7280]/50 text-sm font-mono">
            {"// 我的技术栈"}
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
                className={`font-mono text-sm mb-3 ${colorMap[category.color].split(" ").pop()}`}
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
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-default ${colorMap[skill.color]}`}
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
