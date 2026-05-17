import HeroCard from "@/components/HeroCard";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import TimelineSection from "@/components/TimelineSection";
import InterestsSection from "@/components/InterestsSection";

export default function Home() {
  return (
    <>
      <HeroCard />
      <SkillsSection />
      <ProjectsSection />
      <TimelineSection />
      <InterestsSection />
    </>
  );
}
