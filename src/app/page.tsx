import Header from "@/components/Header";
import Hero from "@/components/Hero";
// import About from "@/components/About"; // Deprecated
import AboutIntro from "@/components/AboutIntro";
import AboutBody from "@/components/AboutBody";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import FAQ from "@/components/FAQ";
import Manifesto from "@/components/Manifesto";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import BrandTitle from "@/components/BrandTitle";
import AnimatedTitle from "@/components/AnimatedTitle";

export default function Home() {
  return (
    <main>
      <Header />
      <div id="hero">
        <Hero />
      </div>
      {/* About Intro */}
      <div id="sobre">
        <AboutIntro />
      </div>

      {/* Divider: KOE Digital */}
      <SectionDivider style={{ zIndex: 15 }}>
        <BrandTitle />
      </SectionDivider>

      {/* About Body (Card + Button) */}
      <AboutBody />

      <SectionDivider style={{ zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <AnimatedTitle
            text="4 PASOS TAN"
            style={{ fontSize: '6rem', fontWeight: '800', color: '#cc5a78', textTransform: 'uppercase' }}
            hoverColor="var(--cyan-medium)"
            shadowColor="#1D3557"
            enableReveal={true}
          />
          <AnimatedTitle
            text="Simples."
            style={{ fontFamily: 'var(--font-detail)', fontSize: '7rem', color: '#cc5a78', marginBottom: '-10px' }}
            hoverColor="var(--cyan-medium)"
            shadowColor="#1D3557"
            enableReveal={true}
          />
        </div>
      </SectionDivider>
      <div id="como-trabajamos">
        <Process />
      </div>

      <SectionDivider style={{ zIndex: 30 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <AnimatedTitle
            text="PLANES"
            style={{ fontSize: '6rem', fontWeight: '800', color: '#c1dcfd', textTransform: 'uppercase' }}
            hoverColor="var(--pink-light)"
            shadowColor="#7da1b9"
            enableReveal={true}
          />
          <AnimatedTitle
            text="Social Media"
            style={{ fontFamily: 'var(--font-detail)', fontSize: '7rem', color: '#c1dcfd', marginBottom: '-10px' }}
            hoverColor="var(--pink-light)"
            shadowColor="#7da1b9"
            enableReveal={true}
          />
        </div>
      </SectionDivider>
      <div id="servicios">
        <Services />
      </div>

      <SectionDivider>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <AnimatedTitle
            text="NUESTRO"
            style={{ fontSize: '6rem', fontWeight: '800', color: 'var(--orange-light)', textTransform: 'uppercase' }}
            hoverColor="var(--orange-dark)"
            shadowColor="#1D3557"
            enableReveal={true}
          />
          <AnimatedTitle
            text="Portfolio"
            style={{ fontFamily: 'var(--font-detail)', fontSize: '7rem', color: 'var(--orange-light)', marginBottom: '-10px' }}
            hoverColor="var(--orange-dark)"
            shadowColor="#1D3557"
            enableReveal={true}
          />
        </div>
      </SectionDivider>
      <div id="portfolio">
        <Portfolio />
      </div>
      <div id="faq">
        <FAQ />
      </div>

      <div id="manifesto">
        <Manifesto />
      </div>

      <div id="contacto">
        <Footer />
      </div>
    </main>
  );
}
