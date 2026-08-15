import Marquee from "react-fast-marquee";
import { Asterisk } from "lucide-react";

const ITEMS = [
  "Advertising That Comes Home",
  "Premium DOOH Inventory",
  "Delhi-NCR",
  "30+ Societies",
  "720 Screens",
  "55,000+ Daily Impressions",
];

export default function EditorialMarquee() {
  return (
    <section data-testid="editorial-marquee" aria-hidden="true" className="py-10 md:py-14 border-b border-white/10 overflow-hidden">
      <Marquee speed={35} gradient={false}>
        {ITEMS.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className={`font-display uppercase leading-none text-5xl md:text-7xl mx-6 md:mx-8 ${i % 2 === 0 ? "text-stroke" : "text-brand-red"}`}>
              {item}
            </span>
            <Asterisk className="w-8 h-8 md:w-10 md:h-10 text-brand-red" strokeWidth={2.5} />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
