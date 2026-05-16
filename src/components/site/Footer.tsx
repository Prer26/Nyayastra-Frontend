import { Link } from "@tanstack/react-router";
import { Sparkles, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-9 rounded-xl bg-foreground text-background grid place-items-center shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
              <Sparkles className="size-5" />
            </div>
            <span className="font-display text-xl font-semibold">Nyayastra</span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            AI-generated legal awareness assistance — making justice understandable for everyone, in every language.
          </p>
          <div className="flex items-center gap-2 mt-6">
            {[Twitter, Github, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="size-9 grid place-items-center rounded-lg border border-border hover:bg-secondary transition">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Product</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/features" className="hover:text-foreground text-muted-foreground">Features</Link></li>
            <li><Link to="/how-it-works" className="hover:text-foreground text-muted-foreground">How it works</Link></li>
            <li><Link to="/languages" className="hover:text-foreground text-muted-foreground">Languages</Link></li>
          </ul>
        </div>
        <div id="contact">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Contact</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>preranaiyengar26@gmail.com</li>
            <li>Bengaluru, India</li>
            <li><Link to="/chat" className="hover:text-foreground">Start a conversation →</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between text-xs text-muted-foreground gap-2">
          <span>© {new Date().getFullYear()} Nyayastra. AI-generated legal awareness — not a substitute for professional legal advice.</span>
          <span>ನ್ಯಾಯ ಎಲ್ಲರಿಗೂ · न्याय सबके लिए · Justice for all</span>
        </div>
      </div>
    </footer>
  );
}
