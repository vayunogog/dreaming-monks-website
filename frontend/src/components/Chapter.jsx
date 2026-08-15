import { motion } from "framer-motion";

export default function Chapter({ number, label, title, dark = true }) {
  return (
    <div className="mb-14 md:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-6"
      >
        <span className="bg-brand-red text-white font-display text-xl leading-none px-3 py-2">{number}</span>
        <span className="h-px w-14 bg-brand-red" />
        <span className={`text-[11px] font-bold tracking-[0.3em] uppercase ${dark ? "text-white/60" : "text-black/60"}`}>
          {label}
        </span>
      </motion.div>
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`font-display uppercase leading-[0.95] tracking-tight text-5xl md:text-7xl max-w-4xl ${dark ? "text-white" : "text-black"}`}
        >
          {title}
        </motion.h2>
      )}
    </div>
  );
}
