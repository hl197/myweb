export interface TimelineEntry {
  period: string;
  title: string;
  description: string;
}

export const timeline: TimelineEntry[] = [
  {
    period: "2024 — 至今",
    title: "个人项目",
    description:
      "全栈开发者 · 独立开发个人项目，使用 React/Next.js 构建前端应用，Node.js 开发后端服务",
  },
  {
    period: "2020 — 2024",
    title: "大学",
    description:
      "计算机科学与技术专业 · 系统学习计算机基础、数据结构与算法、数据库原理，积累项目实践经验",
  },
];
