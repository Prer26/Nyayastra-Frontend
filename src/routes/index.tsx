import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { ArrowRight, Mic, MessageSquare, Sparkles, Languages, Workflow, ShieldAlert, Scale } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nyayastra — Justice for everyone" },
      { name: "description", content: "AI-powered legal awareness assistant for rights, complaints, scams and disputes — in English, Kannada and Hindi." },
    ],
  }),
  component: Home,
});

const prompts = ["Salary not paid", "UPI scam", "Tenant issue", "Online harassment"];

function Home() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-6 pt-12 pb-32 text-center">
        <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs text-muted-foreground mb-8 animate-fade-in">
          <span className="size-1.5 rounded-full bg-foreground animate-pulse" />
          AI-powered legal literacy platform
        </div>
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl text-balance leading-[0.95] animate-fade-up">
          Welcome to <span className="italic">Nyayastra</span>
        </h1>
        <p className="mt-6 font-display text-2xl sm:text-3xl text-muted-foreground italic animate-fade-up" style={{ animationDelay: "0.1s" }}>
          ನ್ಯಾಯ ಎಲ್ಲರಿಗೂ
        </p>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground text-balance animate-fade-up" style={{ animationDelay: "0.2s" }}>
          An AI-powered legal awareness assistant helping people understand rights,
          complaints, and legal actions — instantly, in their own language.
        </p>
        
        {/* Premium Feature Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 animate-fade-up" style={{ animationDelay: "0.25s" }}>
          {["Multilingual AI", "Indian Legal Awareness", "Complaint Drafting", "Voice Accessibility"].map((pill) => (
            <div key={pill} className="glass rounded-full px-4 py-2 text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium border border-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300">
              {pill}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Link to="/chat" className="group inline-flex items-center gap-2 bg-foreground text-background rounded-full px-6 py-3 text-sm font-medium hover:opacity-90 transition">
            Start Chat
            <ArrowRight className="size-4 group-hover:translate-x-0.5 transition" />
          </Link>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-2 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <span className="text-xs text-muted-foreground mr-2">Try:</span>
          {prompts.map((p) => (
            <Link key={p} to="/chat" className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-secondary transition">
              {p}
            </Link>
          ))}
        </div>

        {/* Floating UI cards */}
        <div className="relative mt-24 mx-auto max-w-4xl">
          <div className="glass-strong rounded-3xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.15)] text-left border border-white/5 hover:shadow-[0_30px_60px_rgba(0,0,0,0.2)] transition-all duration-500">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              Nyayastra Agent · Live reasoning
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="rounded-2xl bg-secondary p-4 text-sm">
                  My landlord refuses to return my security deposit.
                </div>
                <div className="rounded-2xl bg-foreground text-background p-4 text-sm">
                  Under the Karnataka Rent Control Act, your deposit must be refunded within 1 month of vacating. I can draft a formal notice for you.
                </div>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  "Understanding issue",
                  "Identifying legal category: Tenant rights",
                  "Searching applicable rights",
                  "Drafting complaint",
                ].map((s, i) => (
                  <div key={s} className="flex items-center gap-2 glass rounded-xl px-3 py-2">
                    <span className="size-1.5 rounded-full bg-foreground" style={{ animationDelay: `${i * 0.2}s` }} />
                    <span className="text-muted-foreground">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -top-6 -left-6 glass rounded-2xl p-3 hidden md:flex items-center gap-2 animate-float-slow">
            <Languages className="size-4" />
            <span className="text-xs">EN · ಕನ್ನಡ · हिंदी</span>
          </div>
          <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-3 hidden md:flex items-center gap-2 animate-float-slow" style={{ animationDelay: "1s" }}>
            <ShieldAlert className="size-4" />
            <span className="text-xs">Emergency guidance ready</span>
          </div>
        </div>
      </section>

      {/* Preview sections */}
      {/* Preview sections */}

<section className="max-w-6xl mx-auto px-6 py-24">

  <div className="text-center mb-14">

    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
      Platform Capabilities
    </div>

    <h2 className="font-display text-4xl md:text-5xl text-balance">
      Built for accessible legal intelligence.
    </h2>

    <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-balance">
      Nyayastra combines multilingual AI reasoning, legal literacy,
      complaint drafting and accessibility tools into one intelligent platform.
    </p>

  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

    {[
      {
        icon: Sparkles,

        title: "AI Guidance",

        desc:
          "Get simplified legal explanations, rights and complaint drafts instantly.",

        to: "/features",
      },

      {
        icon: Workflow,

        title: "AI Workflows",

        desc:
          "Autonomous AI agents analyze problems and generate legal actions step-by-step.",

        to: "/how-it-works",
      },

      {
        icon: Languages,

        title: "Multilingual",

        desc:
          "Justice support in English, Kannada and Hindi for broader accessibility.",

        to: "/languages",
      },

      {
        icon: ShieldAlert,

        title: "Accessibility",

        desc:
          "Listen to multilingual legal explanations with built-in voice assistance.",

        to: "/chat",
      },
    ].map((c, i) => (

      <Link
        key={c.title}
        to={c.to}
        className="group relative overflow-hidden glass-strong rounded-3xl p-7 min-h-[280px] flex flex-col justify-between hover:-translate-y-2 transition-all duration-500 border border-white/5 hover:border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
      >

        {/* GLOW */}

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent pointer-events-none" />

        {/* ICON */}

        <div>

          <div className="size-12 rounded-2xl bg-foreground text-background grid place-items-center shadow-[0_8px_16px_rgba(0,0,0,0.15)] group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition-all duration-300">

            <c.icon className="size-5 group-hover:scale-110 transition-transform duration-300" />

          </div>

          {/* NUMBER */}

          <div className="mt-6 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">

            0{i + 1}

          </div>

          {/* TITLE */}

          <div className="mt-3 text-xl font-medium tracking-tight">

            {c.title}

          </div>

          {/* DESC */}

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">

            {c.desc}

          </p>

        </div>

        {/* FOOTER */}

        <div className="mt-10 flex items-center justify-between">

          <span className="text-xs uppercase tracking-wider text-muted-foreground">

            Explore

          </span>

          <div className="size-9 rounded-full border border-border grid place-items-center group-hover:bg-foreground group-hover:text-background transition-all duration-300 group-hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)]">

            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />

          </div>

        </div>

      </Link>
    ))}

  </div>

</section>
    </SiteShell>
  );
}
