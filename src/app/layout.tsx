import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profile.name} - 个人主页`,
  description: profile.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className="antialiased">
        <Navbar />
        <ParticleBackground />
        <main className="fixed inset-0 z-10 overflow-y-scroll snap-y snap-mandatory">
          {children}
        </main>
      </body>
    </html>
  );
}
