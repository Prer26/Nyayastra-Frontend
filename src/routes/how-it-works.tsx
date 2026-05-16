import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { MessageSquare, Brain, Scale, Search, FileText, ListChecks } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it works — Nyaya AI" },
      { name: "description", content: "From understanding problems to generating intelligent legal guidance — see how Nyaya AI's autonomous agents work." },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  { icon: MessageSquare, title: "User explains the issue", desc: "Type or speak in your own language. No legal jargon required." },
  { icon: Brain, title: "AI understands intent", desc: "The agent interprets your situation and clarifies missing context." },
  { icon: Scale, title: "Agent analyzes legal category", desc: "Maps your problem to relevant areas of law and jurisdiction." },
  { icon: Search, title: "Retrieves applicable rights", desc: "Pulls grounded references and your applicable protections." },
  { icon: FileText, title: "Generates legal guidance", desc: "Synthesizes a clear, plain-language explanation tailored to you." },
  { icon: ListChecks, title: "Creates actionable next steps", desc: "Drafts complaints, lists authorities, and outlines what to do next." },
];

function HowItWorks() {
  return (
    <SiteShell>
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Workflow</div>
        <h1 className="font-display text-5xl md:text-7xl text-balance">How Nyaya AI works</h1>
        <p className="mt-6 text-lg text-muted-foreground text-balance">
          From understanding problems to generating intelligent legal guidance.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-8">
            {steps.map((s, i) => (
              <div key={s.title} className={`relative grid md:grid-cols-2 gap-8 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className={`pl-20 md:pl-0 ${i % 2 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}`}>
                  <div className="text-xs text-muted-foreground">Step {String(i + 1).padStart(2, "0")}</div>
                  <h3 className="font-display text-3xl mt-1">{s.title}</h3>
                  <p className="text-muted-foreground mt-2 max-w-md md:inline-block">{s.desc}</p>
                </div>
                <div className={`absolute left-8 md:left-1/2 -translate-x-1/2 size-16 grid place-items-center`}>
                  <span className="absolute inset-0 rounded-full bg-foreground/10 animate-pulse-ring" />
                  <div className="relative size-12 rounded-full bg-foreground text-background grid place-items-center shadow-[var(--shadow-elevated)]">
                    <s.icon className="size-5" />
                  </div>
                </div>
                <div className={`hidden md:block ${i % 2 ? "md:order-1" : ""}`}>
                  <div className="glass rounded-2xl p-5 text-sm text-muted-foreground">
                    <div className="text-[10px] uppercase tracking-widest mb-2">Agent log</div>
                    <code className="text-xs">
                      {`> ${s.title.toLowerCase()}...\n> status: ok`}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="glass-strong rounded-3xl p-10">
          <h2 className="font-display text-3xl md:text-4xl">Built on autonomous agents.</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Each step is performed by a specialized agent that can reason, retrieve evidence
            and hand off to the next — together they form a transparent legal pipeline you can trust.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
