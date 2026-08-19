import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Play } from "lucide-react";
import Chapter from "./Chapter";

const EASE = [0.16, 1, 0.3, 1];

// Each site has a `media` array. Add more items any time — no other code
// changes needed. Two item shapes:
//   { type: "photo", src: "/photos/your-file.jpg" }
//   { type: "video", webm: "/videos/your-file.webm", mp4: "/videos/your-file.mp4" }
// (webm is optional — mp4 alone works fine, webm just loads a bit faster where supported)
const SITES = [
  {
    name: "Prateek Edifice",
    location: "Sector 107, Noida",
    testId: "site-prateek-edifice",
    media: [{ type: "photo", src: "/photos/prateekedifice.jpg" }],
  },
  {
    name: "Gaur Saundaryam",
    location: "Greater Noida",
    testId: "site-gaur-saundaryam",
    media: [{ type: "photo", src: "/photos/gaursaundaryam.jpg" }],
  },
];

function MediaDisplay({ item, alt }) {
  if (item.type === "video") {
    return (
      <video
        className="w-full h-full object-cover"
        muted
        loop
        autoPlay
        playsInline
        disablePictureInPicture
      >
        {item.webm && <source src={item.webm} type="video/webm" />}
        <source src={item.mp4} type="video/mp4" />
      </video>
    );
  }
  return <img src={item.src} alt={alt} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105" />;
}

function Thumb({ item }) {
  if (item.type === "video") {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <Play className="w-4 h-4 text-white" strokeWidth={2} fill="currentColor" />
      </div>
    );
  }
  return <img src={item.src} alt="" className="w-full h-full object-cover" />;
}

function SiteCard({ site, index, onQuote }) {
  const [active, setActive] = useState(0);
  const current = site.media[active];

  return (
    <motion.div
      data-testid={site.testId}
      custom={index}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.12 }}
      className="clip-corner bg-[#F7F7F7] border border-black/10"
    >
      <button
        data-testid={`site-image-link-${site.testId}`}
        onClick={onQuote}
        aria-label="Get a quote"
        className="group/img relative block w-full aspect-[4/3] overflow-hidden cursor-pointer"
      >
        <MediaDisplay item={current} alt={site.name} />
        <span className="pointer-events-none absolute inset-0 bg-black/0 group-hover/img:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 text-white text-[10px] font-bold tracking-[0.25em] uppercase border-2 border-white px-4 py-2">
            Get a Quote
          </span>
        </span>
      </button>

      {site.media.length > 1 && (
        <div className="flex gap-2 p-3 pb-0 flex-wrap">
          {site.media.map((item, i) => (
            <button
              key={item.src || item.mp4}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${item.type} ${i + 1} of ${site.name}`}
              className={`w-14 h-14 overflow-hidden border-2 transition-colors duration-200 ${
                active === i ? "border-brand-red" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Thumb item={item} />
            </button>
          ))}
        </div>
      )}

      <div className="p-6 md:p-8">
        <h3 className="font-display uppercase tracking-wide text-2xl md:text-3xl text-black">{site.name}</h3>
        <div className="mt-2 flex items-center gap-2 text-black/50">
          <MapPin className="w-4 h-4 text-brand-red shrink-0" strokeWidth={1.75} />
          <span className="text-xs font-semibold tracking-wide">{site.location}</span>
        </div>
        <div className="mt-4 pt-4 border-t border-black/10 text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red">
          Live Installation
        </div>
      </div>
    </motion.div>
  );
}

export default function Sites({ scrollTo }) {
  const onQuote = () => scrollTo?.("#contact");

  return (
    <section id="sites" data-testid="sites-section" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Chapter number="04" label="Our Live Sites" title="See Where We're Already Installed" />
        <div className="grid md:grid-cols-2 gap-6">
          {SITES.map((site, i) => (
            <SiteCard key={site.testId} site={site} index={i} onQuote={onQuote} />
          ))}
        </div>
      </div>
    </section>
  );
}
