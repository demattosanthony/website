import HeroSection from "@/components/hero-section";
import BlogGrid from "@/components/blog-grid";
import Timeline from "@/components/timeline";
import ResumeButton from "@/components/resume-button";
import ContactSection from "@/components/contact-section";

export default function HomePage() {
  return (
    <div className="flex flex-col overflow-hidden">
      <HeroSection />
      <BlogGrid />
      <Timeline />
      <ResumeButton />
      <ContactSection />
    </div>
  );
}
