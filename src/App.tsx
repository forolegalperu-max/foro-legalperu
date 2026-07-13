import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/layout/WhatsAppButton';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { CustomCursor } from './components/layout/CustomCursor';
import { Hero } from './components/sections/Hero';
import { CoursesSection } from './components/sections/CoursesSection';
import { Benefits } from './components/sections/Benefits';
import { Stats } from './components/sections/Stats';
import { FAQ } from './components/sections/FAQ';
import { CTA } from './components/sections/CTA';

function App() {
  return (
    <div className="min-h-screen bg-cream">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:text-cream focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold"
      >
        Saltar al contenido principal
      </a>
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <main id="main-content">
        <Hero />
        <CoursesSection />
        <Benefits />
        <Stats />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
