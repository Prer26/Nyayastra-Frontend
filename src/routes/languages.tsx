import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/languages")({
  head: () => ({
    meta: [
      { title: "Languages — Nyaya AI" },
      { name: "description", content: "Justice should be understandable in every language. English, Kannada and Hindi supported." },
    ],
  }),
  component: LanguagesPage,
});

const langs = [
  { code: "en", name: "English", native: "English", sample: "My salary has not been paid for two months. What are my rights?", reply: "Under the Payment of Wages Act, your employer must pay within 7 days of the wage period." },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ", sample: "ನನ್ನ ಸಂಬಳ ಎರಡು ತಿಂಗಳಿಂದ ಪಾವತಿಯಾಗಿಲ್ಲ. ನನ್ನ ಹಕ್ಕುಗಳೇನು?", reply: "ವೇತನ ಪಾವತಿ ಕಾಯ್ದೆಯ ಪ್ರಕಾರ, ನಿಮ್ಮ ಉದ್ಯೋಗದಾತರು ವೇತನಾವಧಿಯ 7 ದಿನಗಳೊಳಗೆ ಪಾವತಿಸಬೇಕು." },
  { code: "hi", name: "Hindi", native: "हिंदी", sample: "मेरा वेतन दो महीने से नहीं मिला है। मेरे क्या अधिकार हैं?", reply: "वेतन भुगतान अधिनियम के अनुसार, आपके नियोक्ता को वेतन अवधि के 7 दिनों के भीतर भुगतान करना होगा।" },
];

function LanguagesPage() {
  const [active, setActive] = useState(langs[0]);
  return (
    <SiteShell>
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Languages</div>
        <h1 className="font-display text-5xl md:text-7xl text-balance italic">Justice should be understandable in every language.</h1>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-4">
        {langs.map((l) => (
          <button
            key={l.code}
            onClick={() => setActive(l)}
            className={`text-left rounded-2xl p-6 transition border ${active.code === l.code ? "bg-foreground text-background border-foreground" : "glass border-border hover:-translate-y-1"}`}
          >
            <div className="flex items-center justify-between">
              <div className="font-display text-3xl">{l.native}</div>
              {active.code === l.code && <Check className="size-4" />}
            </div>
            <div className={`text-xs mt-2 ${active.code === l.code ? "text-background/70" : "text-muted-foreground"}`}>{l.name}</div>
          </button>
        ))}
      </section>

      <section className="max-w-3xl mx-auto px-6 py-8">
        <div className="glass-strong rounded-3xl p-8 space-y-3">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Live conversation in {active.native}</div>
          <div className="rounded-2xl bg-secondary p-4 text-sm">{active.sample}</div>
          <div className="rounded-2xl bg-foreground text-background p-4 text-sm">{active.reply}</div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="font-display text-3xl md:text-5xl text-balance">Built for inclusion.</h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          More languages coming — Tamil, Telugu, Marathi and Bengali next.
        </p>
      </section>
    </SiteShell>
  );
}
