import CountUp from "react-countup";

const STATS = [
  { value: 30, suffix: "+", label: "Residential Societies", testId: "stat-societies" },
  { value: 720, suffix: "", label: "Digital Screens", testId: "stat-screens" },
  { text: "DELHI-NCR", label: "Footprint", testId: "stat-region" },
  { value: 55000, suffix: "+", separator: ",", label: "Daily Impressions", testId: "stat-impressions" },
];

export default function StatsBar() {
  return (
    <section data-testid="stats-bar" className="bg-brand-red">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-black/30">
        {STATS.map((s) => (
          <div key={s.testId} data-testid={s.testId} className="bg-brand-red px-6 py-10 md:py-14 lg:pl-10 text-center lg:text-left">
            <div className="font-display text-5xl md:text-7xl leading-none text-white">
              {s.value != null ? (
                <CountUp
                  end={s.value}
                  suffix={s.suffix}
                  separator={s.separator || ""}
                  duration={2.2}
                  enableScrollSpy
                  scrollSpyOnce
                />
              ) : (
                s.text
              )}
            </div>
            <div className="mt-3 text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-white/85">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
