import { AboutSection, HeroSection, ProjectsSection, WritingSection } from '@/components/landing';

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl pb-12">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <WritingSection />
    </div>
  );
}
