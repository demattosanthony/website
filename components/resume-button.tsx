const RESUME_URL =
  "https://docs.google.com/document/d/1FmVeuLu7rgfSA8bV_OPdTiy2d2z9DY8i/edit";

const borderGradientStyle = {
  background:
    "conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0) 250deg, rgba(209,213,219,0.75) 290deg, rgba(249,250,251,0.95) 310deg, rgba(209,213,219,0.4) 330deg, rgba(255,255,255,0) 360deg)",
  WebkitMask:
    "radial-gradient(circle, transparent calc(100% - 3px), white calc(100% - 1px))",
  mask: "radial-gradient(circle, transparent calc(100% - 3px), white calc(100% - 1px))",
  filter: "blur(6px)",
};

const ambientGlowStyle = {
  background:
    "radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,0.3), rgba(255,255,255,0) 55%)",
  mixBlendMode: "screen" as const,
};

export default function ResumeButton() {
  return (
    <div className="w-full flex items-center justify-center py-16 px-4">
      <a
        href={RESUME_URL}
        target="_blank"
        className="relative inline-flex items-center justify-center px-12 py-6 rounded-full bg-foreground text-background text-xl font-medium shadow-[0_20px_45px_rgba(0,0,0,0.35)] dark:shadow-[0_18px_45px_rgba(0,0,0,0.6)] overflow-hidden transition-transform duration-200 ease-out hover:scale-105 active:scale-95"
      >
        {/* Rotating highlight hugging the border */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full animate-spinSlow"
          style={borderGradientStyle}
        />

        {/* Soft ambient glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-60 animate-floatY"
          style={ambientGlowStyle}
        />

        <span className="relative z-10">Download Resume</span>
      </a>
    </div>
  );
}
