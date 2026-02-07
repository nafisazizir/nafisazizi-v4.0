import { HeroSection, AboutSection, ProjectsSection, WritingSection } from '@/components/landing';

export default function Home() {
  return (
    <div className="pb-12 max-w-4xl mx-auto">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <WritingSection />
    </div>
  );
}
