import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Heart, Globe2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Nyayastra" },
      { name: "description", content: "Nyayastra makes legal awareness accessible through AI conversations, multilingual support and intelligent workflows." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteShell>
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8 font-medium">About</div>
        <h1 className="font-display text-5xl md:text-7xl text-balance leading-[1.1]">About Nyayastra</h1>
        <p className="mt-10 text-lg text-muted-foreground text-balance leading-relaxed">
          Nyayastra was created to make legal awareness more accessible using modern AI systems.
          Many people struggle to understand legal procedures, rights, and complaint processes.
          Nyayastra simplifies legal information through AI-powered conversations, multilingual
          support, and intelligent workflows.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-6">
        {[
          { icon: Heart, title: "Our Mission", body: "Bridge the gap between citizens and the law — empowering everyone to understand their rights without intimidation." },
          { icon: Sparkles, title: "Our Approach", body: "Combine reasoning AI agents, retrieval and conversational interfaces to deliver guidance that's clear, fast and grounded." },
          { icon: Globe2, title: "Our Reach", body: "Built multilingual-first for India — English, Kannada and Hindi today, more languages soon." },
        ].map((c) => (
          <div key={c.title} className="group relative overflow-hidden glass-strong rounded-3xl p-7 border border-white/5 hover:border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/[0.06] to-transparent pointer-events-none" />
            <c.icon className="size-6 mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <div className="font-medium text-lg relative z-10">{c.title}</div>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed relative z-10">{c.body}</p>
          </div>
        ))}
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="glass-strong rounded-3xl p-10 md:p-16 border border-white/5 shadow-[0_12px_32px_rgba(0,0,0,0.1)]">
          <h2 className="font-display text-3xl md:text-5xl text-balance leading-[1.1]">A small team. A large idea.</h2>
          <p className="mt-8 text-muted-foreground max-w-2xl leading-relaxed">
            Legal literacy shouldn't depend on your background, language or income. Nyayastra is our
            attempt to put a thoughtful, well-spoken legal companion in every pocket — one that
            listens patiently and explains clearly.
          </p>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              ["12k+", "Conversations"],
              ["3", "Languages"],
              ["40+", "Legal categories"],
              ["100%", "Free to start"],
            ].map(([n, l]) => (
              <div key={l} className="group">
                <div className="font-display text-5xl group-hover:text-foreground transition-colors duration-300">{n}</div>
                <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-3 font-medium">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
