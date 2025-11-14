import ContactForm from "../../src/components/contact_form";
import Footer from "../../src/components/footer";
import Navbar from "../../src/components/navbar";
import HeroSection from "../../src/components/about/about";
import BioSection from "../../src/components/about/bio";
import ExperienceSection from "../../src/components/about/experiences";
import StatsSection from "../../src/components/about/stats";
import SkillsSection from "../../src/components/skills-section";
import CTASection from "../../src/components/realisations/cta_section";

export default function ContactPage() {
  return (
    <main className="">
      <Navbar />
      <br />
      <br />
    <HeroSection />
    <BioSection />
    <ExperienceSection />
    <StatsSection />
    <SkillsSection />
    <CTASection />
    <Footer />
    </main>
  );
}       