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
    title: "五谷杂粮",
    description:
      "综合粮油电商平台，用户可在线选购各类杂粮、干货调味品。支持购物车管理、订单追踪、库存管理、用户评价等完整电商功能。前端采用 React + TypeScript，后端基于 Node.js 构建 RESTful API，数据存储使用 PostgreSQL。",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    id: 2,
    title: "蓝航图书馆",
    description:
      "图书管理系统，涵盖图书分类检索、借阅/归还管理、读者信息管理、借阅历史追踪等功能。采用前后端分离架构，实现了条形码扫码借还、逾期提醒、热门图书排行等特色功能，有效提升了图书馆运营效率。",
    tags: ["React", "Next.js", "Tailwind CSS", "PostgreSQL"],
  },
];
