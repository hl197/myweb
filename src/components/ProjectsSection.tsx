"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="min-h-screen w-full snap-start py-24 px-4 bg-white/40 flex items-center"
    >
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-xl font-semibold text-[#1a1a2e] mb-8 flex items-center gap-2">
          <span className="text-orange-500 font-mono">&gt;</span> 项目
          <span className="text-[#6b7280]/50 text-sm font-mono">
            {"// 我做过的项目"}
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
              <h3 className="font-semibold text-[#1a1a2e] mb-1">
                {project.title}
              </h3>
              <p className="text-[#6b7280] text-sm mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs font-mono text-[#6b7280]/60 bg-gray-50 rounded"
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
