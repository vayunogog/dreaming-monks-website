import { motion } from "framer-motion";
import { ImagePlus, MapPin } from "lucide-react";
import Chapter from "./Chapter";
import VideoPlaylist from "./VideoPlaylist";

const EASE = [0.16, 1, 0.3, 1];

const SITE_VIDEOS = [
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

const SITES = [
  { label: "Outdoor LED Screen", location: "Sector 50, Noida" },
  { label: "Lobby Display", location: "DLF Phase 2, Gurgaon" },
  { label: "Entry Gate Unipole", location: "Dwarka, New Delhi" },
  { label: "Outdoor LED Screen", location: "Indirapuram, Ghaziabad" },
  { label: "Lobby Display", location: "Greater Kailash, South Delhi" },
  { label: "Entry Gate Unipole", location: "Sector 21, Faridabad" },
];

export default function OurSites({ scrollTo }) {
  const onQuote = () => scrollTo?.("#contact");

  return (
    <section id="sites" data-testid="our-sites-section" className="py-24 md:py-32 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Chapter number="04" label="Our Sites" title="On Ground, Across Delhi-NCR" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <motion.figure
            data-testid="site-video-frame"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="group"
          >
            <button
              data-testid="site-image-link-video"
              onClick={onQuote}
              aria-label="Get a quote"
              className="group/img relative block w-full clip-corner aspect-[4/3] border border-black/10 overflow-hidden cursor-pointer"
            >
              <VideoPlaylist sources={SITE_VIDEOS} testIdPrefix="sites-video" />
              <QuoteCue />
            </button>
            <figcaption className="mt-4 flex items-start justify-between gap-3">
              <span className="font-display uppercase tracking-wide text-2xl text-black">Install Footage</span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-black/50 mt-1.5 shrink-0">
                <MapPin className="w-3.5 h-3.5 text-brand-red" />
                Live loop — Delhi-NCR
              </span>
            </figcaption>
          </motion.figure>
          {SITES.slice(1).map((site, i) => (
            <motion.figure
              key={site.location}
              data-testid={`site-photo-${i + 2}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.1 }}
              className="group"
            >
              <button
                data-testid={`site-image-link-${i + 2}`}
                onClick={onQuote}
                aria-label="Get a quote"
                className="group/img relative w-full clip-corner aspect-[4/3] bg-[#F7F7F7] border-2 border-dashed border-brand-red/40 hover:border-brand-red flex flex-col items-center justify-center gap-3 transition-colors duration-300 cursor-pointer"
              >
                <ImagePlus className="w-8 h-8 text-brand-red/60" strokeWidth={1.5} />
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-red/70">
                  Site photo — upload pending
                </span>
                <QuoteCue />
              </button>
              <figcaption className="mt-4 flex items-start justify-between gap-3">
                <span className="font-display uppercase tracking-wide text-2xl text-black">{site.label}</span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-black/50 mt-1.5 shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-brand-red" />
                  {site.location}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
        <p className="mt-6 text-xs text-black/40 tracking-wide">
          Real installation photography being uploaded — placeholders mark live inventory locations.
        </p>
      </div>
    </section>
  );
}
