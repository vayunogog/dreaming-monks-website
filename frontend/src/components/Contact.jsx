import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, Check, Loader2, Chrome, LogOut } from "lucide-react";
import { toast } from "sonner";
import Chapter from "./Chapter";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const FIELDS = [
  { name: "name", label: "Name", type: "text", placeholder: "Aarav Sharma", required: true },
  { name: "company", label: "Company", type: "text", placeholder: "Brand / Agency", required: false },
  { name: "email", label: "Email", type: "email", placeholder: "you@brand.com", required: true },
  { name: "phone", label: "Phone", type: "tel", placeholder: "+91 98XXX XXXXX", required: true },
];

const inputClass =
  "w-full bg-transparent border-b-2 border-black/15 focus:border-brand-red hover:border-black/35 outline-none py-3 text-black placeholder:text-black/30 transition-colors duration-200";

export default function Contact({ user, onSignOut }) {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "", user_id: "" });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        name: f.name || user.name || "",
        email: f.email || user.email || "",
        user_id: user.user_id || "",
      }));
    }
  }, [user]);

  const googleSignIn = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin;
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.post(`${API}/leads`, form);
      setStatus("success");
      toast.success("Brief received — our team will reach out within 24 hours.");
    } catch (err) {
      setStatus("idle");
      toast.error("Something went wrong. Please try again or email us directly.");
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="py-24 md:py-32 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20">
        <div>
          <Chapter number="05" label="Get a Quote" title="Let's Put Your Brand Where India Lives." />
          <div className="space-y-6">
            <a
              data-testid="contact-email-link"
              href="mailto:careers.dreamingmonks@gmail.com"
              className="group flex items-center gap-4 text-black/70 hover:text-black transition-colors duration-200"
            >
              <span className="w-11 h-11 border border-black/20 group-hover:border-brand-red flex items-center justify-center transition-colors duration-200">
                <Mail className="w-5 h-5 text-brand-red" strokeWidth={1.75} />
              </span>
              <span className="text-sm md:text-base font-semibold tracking-wide break-all">careers.dreamingmonks@gmail.com</span>
            </a>
            <a
              data-testid="contact-phone-link"
              href="tel:+919968175479"
              className="group flex items-center gap-4 text-black/70 hover:text-black transition-colors duration-200"
            >
              <span className="w-11 h-11 border border-black/20 group-hover:border-brand-red flex items-center justify-center transition-colors duration-200">
                <Phone className="w-5 h-5 text-brand-red" strokeWidth={1.75} />
              </span>
              <span className="text-sm md:text-base font-semibold tracking-wide">+91 99681 75479</span>
            </a>
            <div className="flex items-center gap-4 text-black/70">
              <span className="w-11 h-11 border border-black/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-brand-red" strokeWidth={1.75} />
              </span>
              <span className="text-sm md:text-base font-semibold tracking-wide">Delhi-NCR, India</span>
            </div>
          </div>
          <p className="mt-10 text-xs font-bold tracking-[0.25em] uppercase text-black/35">
            Average response time — under 24 hours
          </p>
        </div>

        <div className="clip-corner bg-[#F7F7F7] border border-black/10 p-7 md:p-10">
          {user ? (
            <div data-testid="google-signed-in-banner" className="mb-8 flex items-center justify-between gap-4 border border-black/15 bg-white px-4 py-3">
              <div className="flex items-center gap-3 min-w-0">
                {user.picture ? (
                  <img src={user.picture} alt="" className="w-9 h-9 rounded-full shrink-0" />
                ) : (
                  <span className="w-9 h-9 bg-brand-red text-white font-display text-lg flex items-center justify-center shrink-0">
                    {user.name?.[0] || "U"}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-bold text-black truncate">{user.name}</p>
                  <p className="text-xs text-black/50 truncate">{user.email}</p>
                </div>
              </div>
              <button
                data-testid="google-sign-out-btn"
                type="button"
                onClick={onSignOut}
                className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/50 hover:text-brand-red transition-colors duration-200 flex items-center gap-1.5 shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign out
              </button>
            </div>
          ) : (
            <div className="mb-8">
              <button
                data-testid="google-sign-in-btn"
                type="button"
                onClick={googleSignIn}
                className="w-full inline-flex items-center justify-center gap-3 bg-black text-white hover:bg-brand-red font-bold text-sm tracking-[0.15em] uppercase px-6 py-4 transition-colors duration-200"
              >
                <Chrome className="w-5 h-5" />
                Sign in with Google
              </button>
              <p className="mt-3 text-xs text-black/45 text-center">Autofill your name and email instantly — no typing needed.</p>
              <div className="mt-6 flex items-center gap-4">
                <span className="h-px flex-1 bg-black/15" />
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-black/40">or fill the form manually</span>
                <span className="h-px flex-1 bg-black/15" />
              </div>
            </div>
          )}
          {status === "success" ? (
            <motion.div
              data-testid="contact-success-message"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full min-h-[24rem] flex flex-col items-start justify-center"
            >
              <span className="w-16 h-16 bg-brand-red clip-corner flex items-center justify-center">
                <Check className="w-8 h-8 text-white" strokeWidth={2.5} />
              </span>
              <h3 className="mt-8 font-display uppercase text-5xl md:text-6xl text-black">Brief Received.</h3>
              <p className="mt-4 text-sm md:text-base text-black/55 max-w-sm leading-relaxed">
                Thank you, {form.name.split(" ")[0]}. Our media planning team will get back to you within 24 hours with inventory options and rates.
              </p>
              <button
                data-testid="contact-send-another-btn"
                onClick={() => {
                  setForm({ name: "", company: "", email: "", phone: "", message: "" });
                  setStatus("idle");
                }}
                className="mt-8 border-2 border-black text-black hover:bg-black hover:text-white font-bold text-xs tracking-[0.2em] uppercase px-6 py-3 transition-colors duration-200"
              >
                Send Another Brief
              </button>
            </motion.div>
          ) : (
            <form data-testid="contact-form" onSubmit={submit} className="space-y-7">
              <div className="grid sm:grid-cols-2 gap-7">
                {FIELDS.map((f) => (
                  <div key={f.name}>
                    <label htmlFor={`field-${f.name}`} className="block text-[10px] font-bold tracking-[0.25em] uppercase text-black/45 mb-1">
                      {f.label} {f.required && <span className="text-brand-red">*</span>}
                    </label>
                    <input
                      id={`field-${f.name}`}
                      data-testid={`contact-${f.name}-input`}
                      name={f.name}
                      type={f.type}
                      required={f.required}
                      value={form[f.name]}
                      onChange={update}
                      placeholder={f.placeholder}
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label htmlFor="field-message" className="block text-[10px] font-bold tracking-[0.25em] uppercase text-black/45 mb-1">
                  Message
                </label>
                <textarea
                  id="field-message"
                  data-testid="contact-message-input"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={update}
                  placeholder="Campaign goals, target areas, timeline…"
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button
                data-testid="contact-submit-btn"
                type="submit"
                disabled={status === "loading"}
                className="group w-full inline-flex items-center justify-center gap-3 bg-brand-red hover:bg-brand-red-dark disabled:opacity-70 text-white font-bold text-sm tracking-[0.2em] uppercase px-8 py-4 transition-colors duration-200"
              >
                {status === "loading" ? (
                  <>
                    Sending
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </>
                ) : (
                  <>
                    Request a Quote
                    <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
