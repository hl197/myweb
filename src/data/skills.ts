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
