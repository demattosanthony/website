import HeroSection from "@/components/hero-section";
import ProjectsSection from "@/components/projects-section";
import Timeline from "@/components/timeline";
import ResumeButton from "@/components/resume-button";
import ContactSection from "@/components/contact-section";

export default function HomePage() {
  return (
    <div className="flex flex-col overflow-hidden">
      <HeroSection />
      <ProjectsSection />
      <Timeline />
      <ResumeButton />
      <ContactSection />
    </div>
  );
}
