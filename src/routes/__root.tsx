import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="inline-flex items-center justify-center mb-8">
          <div className="glass rounded-full px-4 py-2 text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium border border-white/10">
            Page not found
          </div>
        </div>
        <h1 className="font-display text-8xl md:text-9xl font-bold text-foreground leading-none">404</h1>
        <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-8 py-3 text-sm font-medium hover:opacity-90 transition-all duration-300 shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)]"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-lg text-center">
        <div className="inline-flex items-center justify-center mb-8">
          <div className="glass rounded-full px-4 py-2 text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium border border-white/10">
            Something went wrong
          </div>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
          This page encountered an error
        </h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          We encountered an unexpected issue while loading this page. You can try refreshing or return to the home page.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-8 py-3 text-sm font-medium hover:opacity-90 transition-all duration-300 shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)]"
          >
            Retry
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border text-foreground px-8 py-3 text-sm font-medium hover:bg-secondary/50 transition-all duration-300 glass"
          >
            Return home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nyayastra — Justice for everyone" },
      { name: "description", content: "AI-powered legal literacy platform. Nyayastra helps you understand legal rights, complaints, scams, tenant issues and cybercrime through intelligent AI conversations in English, Kannada and Hindi. ನ್ಯಾಯ ಎಲ್ಲರಿಗೂ." },
      { name: "keywords", content: "legal awareness, legal assistance, AI legal, rights, complaints, Indian law, Kannada, Hindi, English" },
      { name: "author", content: "Nyayastra" },
      { name: "theme-color", content: "#000000" },
      { property: "og:title", content: "Nyayastra — Justice for everyone" },
      { property: "og:description", content: "AI-powered legal literacy platform for legal awareness, rights, and complaint assistance in multiple languages." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://nyayaai.com" },
      { property: "og:image", content: "https://nyayaai.com/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Nyayastra — Justice for everyone" },
      { name: "twitter:description", content: "AI-powered legal literacy platform. Understand your rights instantly." },
      { name: "twitter:image", content: "https://nyayaai.com/og-image.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#000000" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
