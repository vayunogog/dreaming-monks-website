import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Services", target: "#services" },
  { label: "Why Us", target: "#why-us" },
  { label: "How It Works", target: "#how-it-works" },
  { label: "Contact", target: "#contact" },
];

const testId = (label) => label.toLowerCase().replace(/\s+/g, "-");

export default function Navbar({ scrollTo }) {
  const [open, setOpen] = useState(false);
  const go = (target) => {
    setOpen(false);
    scrollTo(target);
  };

  return (
    <header data-testid="main-nav" className="fixed top-0 inset-x-0 z-50 bg-brand-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between gap-6">
        <button data-testid="nav-logo-btn" onClick={() => go("#top")} className="flex items-center gap-3 shrink-0">
          <span className="bg-white px-2 py-1 clip-corner" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)" }}>
            <img src="/logo.png" alt="Dreaming Monks" className="h-8 md:h-9 w-auto" />
          </span>
          <span className="hidden lg:block leading-tight text-left">
            <span className="block font-display text-lg tracking-wider text-white">DREAMING MONKS</span>
            <span className="block text-[10px] font-bold tracking-[0.22em] text-brand-red uppercase">Advertising That Comes Home</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <button
              key={l.target}
              data-testid={`nav-link-${testId(l.label)}`}
              onClick={() => go(l.target)}
              className="text-xs font-bold tracking-[0.2em] uppercase text-white/70 hover:text-brand-red transition-colors duration-200"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            data-testid="nav-quote-btn"
            onClick={() => go("#contact")}
            className="group hidden sm:inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white text-xs font-bold tracking-[0.15em] uppercase px-5 py-3 transition-colors duration-200"
          >
            Get a Quote
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <button
            data-testid="nav-mobile-menu-btn"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-1"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            data-testid="nav-mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-brand-black"
          >
            <div className="px-5 py-6 flex flex-col gap-5">
              {LINKS.map((l) => (
                <button
                  key={l.target}
                  data-testid={`nav-mobile-link-${testId(l.label)}`}
                  onClick={() => go(l.target)}
                  className="text-left font-display text-3xl uppercase tracking-wide text-white hover:text-brand-red transition-colors duration-200"
                >
                  {l.label}
                </button>
              ))}
              <button
                data-testid="nav-mobile-quote-btn"
                onClick={() => go("#contact")}
                className="mt-2 bg-brand-red text-white font-bold uppercase tracking-[0.2em] text-sm px-5 py-4"
              >
                Get a Quote
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
