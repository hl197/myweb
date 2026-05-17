"use client";

import { useState, useEffect } from "react";
import { profile } from "@/data/profile";

const NAV_ITEMS = [
  { id: "hero", label: "首页" },
  { id: "skills", label: "技能" },
  { id: "projects", label: "项目" },
  { id: "timeline", label: "时间线" },
  { id: "interests", label: "兴趣" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;

    const handleScroll = () => {
      const currentY = main.scrollTop;
      setVisible(currentY < lastScrollY || currentY < 80);
      setLastScrollY(currentY);

      const sections = NAV_ITEMS.map((item) =>
        document.getElementById(item.id),
      ).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= 300) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    main.addEventListener("scroll", handleScroll, { passive: true });
    return () => main.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 backdrop-blur-md bg-white/70 border-b border-orange-200/30 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="text-sm font-semibold bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          {profile.name}
        </button>
        <div className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-sm transition-colors ${
                activeSection === item.id
                  ? "text-orange-500 font-medium"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
