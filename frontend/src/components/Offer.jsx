import { motion } from "framer-motion";
import { Monitor, LayoutDashboard, Signpost, Projector } from "lucide-react";
import Chapter from "./Chapter";
import VideoPlaylist from "./VideoPlaylist";

const EASE = [0.16, 1, 0.3, 1];

const OFFER_VIDEOS = [
  { webm: "/videos/sites-1.webm", mp4: "/videos/sites-1.mp4" },
  { webm: "/videos/sites-2.webm", mp4: "/videos/sites-2.mp4" },
];

const QuoteCue = () => (
  <span className="pointer-events-none absolute inset-0 bg-black/0 group-hover/img:bg-black/40 transition-colors duration-300 flex items-center justify-center">
    <span className="opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 text-white text-[10px] font-bold tracking-[0.25em] uppercase border-2 border-white px-4 py-2">
      Get a Quote
    </span>
  </span>
);

const VISION = {
  icon: Monitor,
  title: "Our Vision",
  desc: "Large-format, high-brightness LED screens at society perimeters and high-traffic junctions — impossible to miss, day or night.",
  spec: "High-Brightness / 24×7",
  testId: "offer-card-outdoor-led",
};

const CARDS = [
  {
    icon: LayoutDashboard,
    title: "Indoor Lobby Displays",
    desc: "Premium digital displays inside residential lobbies and clubhouses — a captive, high-dwell-time audience of affluent households.",
    spec: "Captive Audience / Full HD",
    testId: "offer-card-lobby",
    photo: "/photos/hero-1.jpg",
  },
  {
    icon: Signpost,
    title: "Entry Gate Unipoles",
    desc: "Dominant unipole placements at society entry gates — the first and last thing every resident and visitor sees, every single day.",
    spec: "Entry-Point Dominance",
    testId: "offer-card-unipole",
    photo: "/photos/unipole.jpg",
  },
  {
    icon: Projector,
    title: "Big Outdoor Displays",
    desc: "Large-format outdoor displays that dominate skylines and high-traffic corridors — maximum scale, maximum impact.",
    spec: "Maximum Scale / High Impact",
    testId: "offer-card-big-outdoor",
    photo: "/photos/big-outdoor.jpg",
  },
];

export default function Offer({ scrollTo }) {
  const onQuote = () => scrollTo?.("#contact");

  return (
    <section id="services" data-testid="services-section" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Chapter number="01" label="What We Offer" title="Spaces That Command Attention" />

        {/* Featured Vision panel — large, full-bleed video, not boxed in with the product cards */}
        <motion.div
          data-testid={VISION.testId}
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="group/img relative w-full h-[56vh] min-h-[380px] max-h-[680px] overflow-hidden mb-6 md:mb-8 cursor-pointer"
        >
          <VideoPlaylist sources={OFFER_VIDEOS} testIdPrefix="offer-video" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/0" />
          <button
            data-testid={`offer-image-link-${VISION.testId}`}
            onClick={onQuote}
            aria-label="Get a quote"
            className="absolute inset-0 w-full h-full flex flex-col justify-end items-start text-left p-8 md:p-14"
          >
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red mb-3">{VISION.spec}</span>
            <h3 className="font-display uppercase tracking-wide text-4xl sm:text-5xl md:text-7xl text-white leading-[0.95]">
              {VISION.title}
            </h3>
            <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-white/80">{VISION.desc}</p>
            <span className="mt-6 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 text-white text-[10px] font-bold tracking-[0.25em] uppercase border-2 border-white px-4 py-2">
              Get a Quote
            </span>
          </button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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
              {card.photo ? (
                <button
                  data-testid={`offer-image-link-${card.testId}`}
                  onClick={onQuote}
                  aria-label="Get a quote"
                  className="group/img relative block w-full aspect-[16/9] border border-black/10 overflow-hidden cursor-pointer"
                >
                  <img
                    src={card.photo}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                  />
                  <QuoteCue />
                </button>
              ) : (
                <button
                  data-testid={`offer-image-link-${card.testId}`}
                  onClick={onQuote}
                  aria-label="Get a quote"
                  className="group/img relative w-full aspect-[16/9] bg-white border-2 border-dashed border-brand-red/40 hover:border-brand-red flex flex-col items-center justify-center gap-2 transition-colors duration-300 cursor-pointer"
                >
                  <card.icon className="w-7 h-7 text-brand-red" strokeWidth={1.5} />
                  <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-brand-red/60">Site photo — upload pending</span>
                  <QuoteCue />
                </button>
              )}
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
