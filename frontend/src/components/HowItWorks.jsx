import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Chapter from "./Chapter";

const EASE = [0.16, 1, 0.3, 1];

const STEPS = [
  {
    num: "01",
    title: "Choose Your Locations",
    desc: "Browse our network of 30+ premium societies across Delhi-NCR. We match inventory to your audience, budget and campaign goals.",
  },
  {
    num: "02",
    title: "Submit Your Creative",
    desc: "Send your artwork — our studio adapts and optimises it for every screen format, resolution and aspect ratio in the network.",
  },
  {
    num: "03",
    title: "Go Live",
    desc: "Your campaign launches across the network within 48 hours, with live monitoring and proof-of-play reporting throughout.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" data-testid="how-it-works-section" className="py-24 md:py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Chapter number="03" label="How It Works" title="Brief To Broadcast In Three Moves" />
        <div className="relative grid md:grid-cols-3 gap-10 md:gap-8">
          <div aria-hidden="true" className="hidden md:block absolute top-8 left-[18%] right-[18%] h-0.5 bg-brand-red/40" />
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              data-testid={`how-step-${i + 1}`}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.15 }}
              className="relative"
            >
              <div className="relative z-10 w-16 h-16 bg-brand-red clip-corner flex items-center justify-center font-display text-3xl text-white">
                {step.num}
              </div>
              <h3 className="mt-7 font-display uppercase tracking-wide text-3xl md:text-4xl text-white flex items-center gap-3">
                {step.title}
                {i < STEPS.length - 1 && <ArrowRight className="hidden md:block w-6 h-6 text-brand-red shrink-0" strokeWidth={2.5} />}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/55 max-w-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
