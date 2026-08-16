import { motion } from "framer-motion";
import { Target, Crown, Hourglass, CalendarCheck2 } from "lucide-react";
import Chapter from "./Chapter";

const EASE = [0.16, 1, 0.3, 1];

const PROPS = [
  {
    icon: Target,
    title: "Hyper-Local Targeting",
    desc: "Pinpoint exact societies, sectors and neighbourhoods. Your budget reaches the pincodes that matter — nothing wasted on the wrong crowd.",
  },
  {
    icon: Crown,
    title: "Premium Residential Audience",
    desc: "Affluent, decision-making households in Delhi-NCR's most desirable addresses. The audience brands fight for — at home and attentive.",
  },
  {
    icon: Hourglass,
    title: "High Dwell-Time Visibility",
    desc: "Lobbies, gates and lifts mean repeated, unskippable exposure. Your brand isn't glanced at in traffic — it lives with the viewer.",
  },
  {
    icon: CalendarCheck2,
    title: "Effortless Booking",
    desc: "One brief, one team, end-to-end execution. From location planning to go-live and proof-of-play reporting in days, not weeks.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" data-testid="why-us-section" className="bg-[#F4F4F4] text-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Chapter number="02" label="Why Dreaming Monks" title="Seen Where Life Actually Happens" dark={false} />
        <div>
          {PROPS.map((prop, i) => (
            <motion.div
              key={prop.title}
              data-testid={`why-us-prop-${i + 1}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.08 }}
              whileHover={{ x: 10 }}
              className={`group grid md:grid-cols-12 items-center gap-5 md:gap-6 py-8 md:py-10 border-t border-black/10 ${i === PROPS.length - 1 ? "border-b" : ""}`}
            >
              <div className="md:col-span-2 font-display leading-none text-6xl md:text-7xl text-brand-red">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="hidden md:flex md:col-span-1 w-12 h-12 border-2 border-black/15 group-hover:border-brand-red items-center justify-center transition-colors duration-300">
                <prop.icon className="w-6 h-6 text-black group-hover:text-brand-red transition-colors duration-300" strokeWidth={1.75} />
              </div>
              <h3 className="md:col-span-4 font-display uppercase tracking-wide text-3xl md:text-4xl text-black group-hover:text-brand-red transition-colors duration-300">
                {prop.title}
              </h3>
              <p className="md:col-span-5 text-sm md:text-base leading-relaxed text-neutral-600">
                {prop.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
