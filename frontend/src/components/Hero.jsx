import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowRight, ArrowDown, FileDown } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const MaskLine = ({ children, delay }) => (
  <span className="block overflow-hidden pb-[0.09em] -mb-[0.09em]">
    <motion.span
      className="block"
      initial={{ y: "115%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.span>
  </span>
);

export default function Hero({ scrollTo }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 });
  const sy = useSpring(my, { stiffness: 50, damping: 18 });
  const shape1X = useTransform(sx, [-0.5, 0.5], [-30, 30]);
  const shape1Y = useTransform(sy, [-0.5, 0.5], [-20, 20]);
  const shape2X = useTransform(sx, [-0.5, 0.5], [22, -22]);
  const shape2Y = useTransform(sy, [-0.5, 0.5], [16, -16]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMouseMove}
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-black"
    >
      <motion.div
        className="absolute inset-0 z-30 bg-brand-red origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
        aria-hidden="true"
      />

      <motion.div
        aria-hidden="true"
        style={{ x: shape1X, y: shape1Y, clipPath: "polygon(28% 0, 100% 0, 72% 100%, 0% 100%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.7 }}
        className="absolute -right-28 -top-20 w-56 h-72 md:-right-16 md:top-[12%] md:w-[30rem] md:h-[38rem] bg-brand-red"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: shape2X, y: shape2Y, clipPath: "polygon(28% 0, 100% 0, 72% 100%, 0% 100%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.85 }}
        className="hidden md:block absolute -right-32 top-[22%] w-[30rem] h-[38rem] border-2 border-white/25"
      />
      <div aria-hidden="true" className="absolute left-0 bottom-0 w-2/3 h-px bg-white/10" />
      <div aria-hidden="true" className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 rotate-90 origin-right text-[10px] font-bold tracking-[0.5em] uppercase text-white/25 whitespace-nowrap">
        Delhi — NCR • DOOH Network
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 pt-32 pb-24"
      >
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-3 h-3 bg-brand-red" />
          <span className="text-[11px] md:text-xs font-bold tracking-[0.35em] uppercase text-white/70">
            Premium DOOH Network — Delhi-NCR
          </span>
        </motion.div>

        <h1
          data-testid="hero-headline"
          className="font-display uppercase leading-[0.88] tracking-tight text-[clamp(3.6rem,11.5vw,10.5rem)] text-white"
        >
          <MaskLine delay={0.55}>Advertising</MaskLine>
          <MaskLine delay={0.67}>That Comes</MaskLine>
          <MaskLine delay={0.79}>
            <span className="text-brand-red">Home.</span>
          </MaskLine>
        </h1>

        <motion.p
          data-testid="hero-subheadline"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="mt-8 max-w-xl text-base md:text-lg text-white/70 leading-relaxed"
        >
          Reach millions where they actually live. Premium digital out-of-home
          inventory across Delhi-NCR's most exclusive residential societies —
          not just crowded public spots.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            data-testid="hero-quote-btn"
            onClick={() => scrollTo("#contact")}
            className="group inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red-dark text-white font-bold text-sm tracking-[0.15em] uppercase px-8 py-4 transition-colors duration-200"
          >
            Get a Quote
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
          <button
            data-testid="hero-inventory-btn"
            onClick={() => scrollTo("#services")}
            className="group inline-flex items-center gap-3 border-2 border-white text-white hover:bg-white hover:text-black font-bold text-sm tracking-[0.15em] uppercase px-8 py-[0.85rem] transition-colors duration-200"
          >
            View Inventory
            <ArrowDown className="w-5 h-5 transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>
          <a
            data-testid="hero-media-kit-link"
            href="/media-kit.pdf"
            download="Dreaming-Monks-Media-Kit.pdf"
            className="inline-flex items-center gap-2 text-white/60 hover:text-brand-red text-xs font-bold tracking-[0.2em] uppercase underline underline-offset-8 decoration-white/30 hover:decoration-brand-red transition-colors duration-200"
          >
            <FileDown className="w-4 h-4" />
            Media Kit
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-5 md:left-8 z-10 flex items-center gap-3"
      >
        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40">Scroll</span>
        <motion.span
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block w-px h-10 bg-brand-red origin-top"
        />
      </motion.div>
    </section>
  );
}
