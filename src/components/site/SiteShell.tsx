import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 -z-10 grid-bg pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] glow-orb -z-10 pointer-events-none" />
      <Navbar />
      <main className="pt-28">{children}</main>
      <Footer />
    </div>
  );
}
