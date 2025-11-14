
import Navbar from '../../src/components/navbar';
import Hero from '../../src/components/hero';
import Service from '../../src/components/services_section';
import SkillsSection from '../../src/components/skills-section';
import Footer from '../../src/components/footer';
import RealisationsPage from '../../src/components/realisations/realisations';


export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      
      <Navbar />
      <RealisationsPage />
      
    <Footer />
    </main>
  );
}
