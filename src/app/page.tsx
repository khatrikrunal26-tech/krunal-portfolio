import Navbar from '../components/Navbar';
import HeroShowreel from '../components/HeroShowreel';
import ProjectGrid from '../components/ProjectGrid';
import WorkflowOrbits from '../components/WorkflowOrbits';
import SpecsBento from '../components/SpecsBento';
import ContactSection from '../components/ContactSection';

export default function Home() {
  return (
    <main style={{ backgroundColor: '#04070B' }}>
      <Navbar />
      <HeroShowreel />
      <ProjectGrid />
      <WorkflowOrbits />
      <SpecsBento />
      <ContactSection />
    </main>
  );
}

