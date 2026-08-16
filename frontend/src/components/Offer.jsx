import { motion } from "framer-motion";
import { Monitor, LayoutDashboard, Signpost } from "lucide-react";
import Chapter from "./Chapter";

const EASE = [0.16, 1, 0.3, 1];

const CARDS = [
  {
    icon: Monitor,
    title: "Outdoor LED Screens",
    desc: "Large-format, high-brightness LED screens at society perimeters and high-traffic junctions — impossible to miss, day or night.",
    spec: "High-Brightness / 24×7",
    testId: "offer-card-outdoor-led",
  },
  {
    icon: LayoutDashboard,
    title: "Indoor Lobby Displays",
    desc: "Premium digital displays inside residential lobbies and clubhouses — a captive, high-dwell-time audience of affluent households.",
    spec: "Captive Audience / Full HD",
    testId: "offer-card-lobby",
  },
  {
    icon: Signpost,
    title: "Entry Gate Unipoles",
    desc: "Dominant unipole placements at society entry gates — the first and last thing every resident and visitor sees, every single day.",
    spec: "Entry-Point Dominance",
    testId: "offer-card-unipole",
  },
];

export default function Offer() {
  return (
    <section id="services" data-testid="services-section" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Chapter number="01" label="What We Offer" title="Spaces That Command Attention" />
        <div className="grid md:grid-cols-3 gap-5">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.testId}
              data-testid={card.testId}
              custom={i}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="group clip-corner bg-[#F7F7F7] border border-black/10 hover:border-brand-red p-8 md:p-10 transition-colors duration-300"
            >
              <div className="aspect-[16/9] bg-white border-2 border-dashed border-brand-red/40 group-hover:border-brand-red flex flex-col items-center justify-center gap-2 transition-colors duration-300">
                <card.icon className="w-7 h-7 text-brand-red" strokeWidth={1.5} />
                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-brand-red/60">Site photo — upload pending</span>
              </div>
              <h3 className="mt-8 font-display uppercase tracking-wide text-3xl md:text-4xl text-black">
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-black/55">{card.desc}</p>
              <div className="mt-8 pt-4 border-t border-black/10 text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red">
                {card.spec}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
