import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <div id="sobre">
        <About />
      </div>
      <div id="como-trabajamos">
        <Process />
      </div>
      <div id="servicios">
        <Services />
      </div>
      <div id="portfolio">
        <Portfolio />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <div id="contacto">
        <Footer />
      </div>
    </main>
  );
}
