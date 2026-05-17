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
