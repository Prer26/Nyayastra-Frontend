import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Scale, FileText, Languages, Mic, Workflow, Zap, ShieldAlert, Brain } from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — Nyayastra" },
      { name: "description", content: "AI legal guidance, complaint generation, multilingual support, voice assistance and agentic workflows." },
    ],
  }),
  component: Features,
});

const features = [
  { icon: Scale, title: "AI Legal Guidance", desc: "Plain-language explanations of rights, laws and procedures tailored to your situation." },
  { icon: FileText, title: "Complaint Generator", desc: "Draft formal complaints, notices and FIR templates ready to send." },
  { icon: Languages, title: "Multi-Lingual Support", desc: "Converse fluently in English, Kannada and Hindi." },
  { icon: Workflow, title: "Agentic Workflows", desc: "Autonomous agents reason, retrieve and act on your behalf." },
  { icon: Zap, title: "Real-Time AI Responses", desc: "Streaming answers with live agent state visibility." },
  { icon: ShieldAlert, title: "Emergency Legal Guidance", desc: "Immediate guidance for urgent situations — harassment, scams, threats." },
  { icon: Brain, title: "Intelligent Reasoning", desc: "Transparent step-by-step reasoning you can audit and trust." },
];

function Features() {
  return (
    <SiteShell>
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Features</div>
        <h1 className="font-display text-5xl md:text-7xl text-balance">Everything you need to understand the law.</h1>
        <p className="mt-6 text-lg text-muted-foreground">A complete AI-native toolkit for legal awareness.</p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f) => (
          <div key={f.title} className="group relative glass rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-foreground/[0.03] to-transparent" />
            <div className="relative">
              <div className="size-10 rounded-xl bg-foreground text-background grid place-items-center mb-6 group-hover:scale-110 transition">
                <f.icon className="size-4" />
              </div>
              <div className="font-medium">{f.title}</div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>
    </SiteShell>
  );
}
