import { useCallback, useEffect, useRef } from "react";
import "@/App.css";
import Lenis from "lenis";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import EditorialMarquee from "@/components/EditorialMarquee";
import Offer from "@/components/Offer";
import WhyUs from "@/components/WhyUs";
import HowItWorks from "@/components/HowItWorks";
import Trust from "@/components/Trust";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisRef.current = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const scrollTo = useCallback((target) => {
    lenisRef.current?.scrollTo(target, { offset: -64, duration: 1.3 });
  }, []);

  return (
    <div className="bg-brand-black text-white font-sans antialiased overflow-x-clip">
      <div className="grain-overlay" aria-hidden="true" />
      <Navbar scrollTo={scrollTo} />
      <main>
        <Hero scrollTo={scrollTo} />
        <StatsBar />
        <EditorialMarquee />
        <Offer />
        <WhyUs />
        <HowItWorks />
        <Trust />
        <Contact />
      </main>
      <Footer scrollTo={scrollTo} />
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}

export default App;
