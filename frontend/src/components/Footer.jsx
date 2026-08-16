import { Linkedin, Instagram, Facebook, Twitter } from "lucide-react";

const LINKS = [
  { label: "Services", target: "#services" },
  { label: "Why Us", target: "#why-us" },
  { label: "How It Works", target: "#how-it-works" },
  { label: "Contact", target: "#contact" },
];

const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn", testId: "footer-social-linkedin" },
  { icon: Instagram, label: "Instagram", testId: "footer-social-instagram" },
  { icon: Facebook, label: "Facebook", testId: "footer-social-facebook" },
  { icon: Twitter, label: "Twitter", testId: "footer-social-twitter" },
];

export default function Footer({ scrollTo }) {
  return (
    <footer data-testid="site-footer" className="border-t-2 border-brand-red bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <img data-testid="footer-logo" src="/logo-transparent.png" alt="Dreaming Monks" className="h-14 w-auto" />
          <p className="mt-5 font-display uppercase tracking-wider text-2xl text-brand-red">
            Advertising That Comes Home
          </p>
          <p className="mt-3 text-sm text-black/45 leading-relaxed max-w-sm">
            Premium digital out-of-home advertising across Delhi-NCR's most exclusive residential societies.
          </p>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-[11px] font-bold tracking-[0.3em] uppercase text-black/40 mb-5">Quick Links</h4>
          <ul className="space-y-3">
            {LINKS.map((l) => (
              <li key={l.target}>
                <button
                  data-testid={`footer-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => scrollTo(l.target)}
                  className="text-sm font-semibold text-black/65 hover:text-brand-red transition-colors duration-200"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-[11px] font-bold tracking-[0.3em] uppercase text-black/40 mb-5">Contact</h4>
          <div className="space-y-3 text-sm font-semibold">
            <a data-testid="footer-email-link" href="mailto:careers.dreamingmonks@gmail.com" className="block text-black/65 hover:text-brand-red transition-colors duration-200 break-all">
              careers.dreamingmonks@gmail.com
            </a>
            <a data-testid="footer-phone-link" href="tel:+919968175479" className="block text-black/65 hover:text-brand-red transition-colors duration-200">
              +91 99681 75479
            </a>
            <p className="text-black/65">Delhi-NCR, India</p>
          </div>
          <div className="mt-6 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.testId}
                data-testid={s.testId}
                href="#top"
                onClick={(e) => e.preventDefault()}
                aria-label={s.label}
                className="w-10 h-10 border border-black/20 hover:border-brand-red hover:bg-brand-red flex items-center justify-center text-black/70 hover:text-white transition-colors duration-200"
              >
                <s.icon className="w-4 h-4" strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-black/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs text-black/35 tracking-wide">
          <span data-testid="footer-copyright">© 2026 Dreaming Monks. All rights reserved.</span>
          <span>dreamingmonks.com — Advertising That Comes Home</span>
        </div>
      </div>
    </footer>
  );
}
