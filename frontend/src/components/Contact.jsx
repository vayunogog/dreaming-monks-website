import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, Check, Loader2 } from "lucide-react";
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
  "w-full bg-transparent border-b-2 border-white/15 focus:border-brand-red hover:border-white/35 outline-none py-3 text-white placeholder:text-white/25 transition-colors duration-200";

export default function Contact() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle");

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
    <section id="contact" data-testid="contact-section" className="py-24 md:py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20">
        <div>
          <Chapter number="04" label="Get a Quote" title="Let's Put Your Brand Where India Lives." />
          <div className="space-y-6">
            <a
              data-testid="contact-email-link"
              href="mailto:careers.dreamingmonks@gmail.com"
              className="group flex items-center gap-4 text-white/70 hover:text-white transition-colors duration-200"
            >
              <span className="w-11 h-11 border border-white/20 group-hover:border-brand-red flex items-center justify-center transition-colors duration-200">
                <Mail className="w-5 h-5 text-brand-red" strokeWidth={1.75} />
              </span>
              <span className="text-sm md:text-base font-semibold tracking-wide break-all">careers.dreamingmonks@gmail.com</span>
            </a>
            <a
              data-testid="contact-phone-link"
              href="tel:+919968175479"
              className="group flex items-center gap-4 text-white/70 hover:text-white transition-colors duration-200"
            >
              <span className="w-11 h-11 border border-white/20 group-hover:border-brand-red flex items-center justify-center transition-colors duration-200">
                <Phone className="w-5 h-5 text-brand-red" strokeWidth={1.75} />
              </span>
              <span className="text-sm md:text-base font-semibold tracking-wide">+91 99681 75479</span>
            </a>
            <div className="flex items-center gap-4 text-white/70">
              <span className="w-11 h-11 border border-white/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-brand-red" strokeWidth={1.75} />
              </span>
              <span className="text-sm md:text-base font-semibold tracking-wide">Delhi-NCR, India</span>
            </div>
          </div>
          <p className="mt-10 text-xs font-bold tracking-[0.25em] uppercase text-white/35">
            Average response time — under 24 hours
          </p>
        </div>

        <div className="clip-corner bg-[#0D0D0D] border border-white/10 p-7 md:p-10">
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
              <h3 className="mt-8 font-display uppercase text-5xl md:text-6xl text-white">Brief Received.</h3>
              <p className="mt-4 text-sm md:text-base text-white/55 max-w-sm leading-relaxed">
                Thank you, {form.name.split(" ")[0]}. Our media planning team will get back to you within 24 hours with inventory options and rates.
              </p>
              <button
                data-testid="contact-send-another-btn"
                onClick={() => {
                  setForm({ name: "", company: "", email: "", phone: "", message: "" });
                  setStatus("idle");
                }}
                className="mt-8 border-2 border-white text-white hover:bg-white hover:text-black font-bold text-xs tracking-[0.2em] uppercase px-6 py-3 transition-colors duration-200"
              >
                Send Another Brief
              </button>
            </motion.div>
          ) : (
            <form data-testid="contact-form" onSubmit={submit} className="space-y-7">
              <div className="grid sm:grid-cols-2 gap-7">
                {FIELDS.map((f) => (
                  <div key={f.name}>
                    <label htmlFor={`field-${f.name}`} className="block text-[10px] font-bold tracking-[0.25em] uppercase text-white/45 mb-1">
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
                <label htmlFor="field-message" className="block text-[10px] font-bold tracking-[0.25em] uppercase text-white/45 mb-1">
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
