import { motion } from "framer-motion";

const CATEGORIES = ["Real Estate", "Automobile", "FMCG", "BFSI", "D2C Brands", "Retail"];

export default function Trust() {
  return (
    <section data-testid="trust-section" className="py-24 md:py-28 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="w-3 h-3 bg-brand-red" />
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-black/60">
            Trusted by leading brands
          </span>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-black/10 border border-black/10">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat}
              data-testid={`trust-logo-${i + 1}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-[#0A0A0A] hover:bg-brand-surface aspect-[2/1] flex items-center justify-center transition-colors duration-300 group"
            >
              <span className="font-display uppercase tracking-widest text-xl md:text-2xl text-white/30 group-hover:text-brand-red transition-colors duration-300">
                {cat}
              </span>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-xs text-black/30 tracking-wide">
          Categories winning on our network — brand logo wall launching soon.
        </p>
      </div>
    </section>
  );
}
