import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import ExperienceSection from "../components/ExperienceSection";
import ContactSection from "../components/ContactSection";
import WelcomeGeneratorSection from "../components/WelcomeGeneratorSection";
import EducationSection from "../components/EducationSection"; 
import InteractivePlaygroundSection from "../components/InteractivePlaygroundSection"; // Import the new InteractivePlaygroundSection component

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection /> 
      <WelcomeGeneratorSection />
      <ContactSection />
    </>
  );
}
