import { useCallback, useEffect, useRef, useState } from "react";
import "@/App.css";
import Lenis from "lenis";
import axios from "axios";
import { Toaster, toast } from "sonner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import EditorialMarquee from "@/components/EditorialMarquee";
import Offer from "@/components/Offer";
import WhyUs from "@/components/WhyUs";
import HowItWorks from "@/components/HowItWorks";
import Trust from "@/components/Trust";
import OurSites from "@/components/OurSites";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function App() {
  const lenisRef = useRef(null);
  const authProcessed = useRef(false);
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    if (window.location.hash?.includes("session_id=")) {
      if (authProcessed.current) return;
      authProcessed.current = true;
      const sessionId = window.location.hash.split("session_id=")[1].split("&")[0];
      axios
        .post(`${API}/auth/session`, { session_id: sessionId }, { withCredentials: true })
        .then((res) => {
          setUser(res.data);
          toast.success(`Signed in as ${res.data.name}`);
          window.history.replaceState(null, "", window.location.pathname);
          setTimeout(() => scrollTo("#contact"), 300);
        })
        .catch(() => toast.error("Google sign-in failed. Please try again."));
    } else {
      axios
        .get(`${API}/auth/me`, { withCredentials: true })
        .then((res) => setUser(res.data))
        .catch(() => {});
    }
  }, [scrollTo]);

  const signOut = useCallback(async () => {
    try {
      await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
    } catch (e) {}
    setUser(null);
  }, []);

  return (
    <div className="bg-white text-black font-sans antialiased overflow-x-clip">
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
        <OurSites />
        <Contact user={user} onSignOut={signOut} />
      </main>
      <Footer scrollTo={scrollTo} />
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}

export default App;
