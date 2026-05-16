import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/features", label: "Features" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/languages", label: "Languages" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
      <nav className="glass w-full max-w-6xl rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-[0_8px_32px_-12px_rgba(0,0,0,0.12)]">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="size-9 rounded-xl bg-foreground text-background grid place-items-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] group-hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] transition-all duration-300">
            <Sparkles className="size-5" />
          </div>
          <span className="font-display text-xl font-semibold">Nyayastra</span>
        </Link>
        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md transition-colors"
              activeProps={{ className: "px-3 py-1.5 text-sm rounded-md text-foreground bg-secondary" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/chat"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-foreground text-background text-sm px-4 py-2 hover:opacity-90 transition"
          >
            Open Chat
            <span className="size-1.5 rounded-full bg-background/80 animate-pulse" />
          </Link>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="lg:hidden absolute top-20 inset-x-4 glass-strong rounded-2xl p-4 flex flex-col gap-1 animate-fade-in">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-secondary text-sm"
            >
              {l.label}
            </Link>
          ))}
          <Link to="/chat" onClick={() => setOpen(false)} className="mt-2 px-3 py-2.5 rounded-lg bg-foreground text-background text-sm text-center">
            Open Chat
          </Link>
        </div>
      )}
    </header>
  );
}
