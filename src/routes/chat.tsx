import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";

import {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  Send,
  Copy,
  Check,
  ShieldAlert,
  FileText,
  Sparkles,
  Volume2,
} from "lucide-react";

import { sendMessageToAI } from "@/services/api";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      {
        title: "AI Chat — Nyaya AI",
      },
      {
        name: "description",
        content:
          "Premium AI legal agent chat — understand your rights and draft complaints in real time.",
      },
    ],
  }),

  component: Chat,
});

type Msg = {
  role: "user" | "assistant";
  content: string;
  structured?: boolean;
};

type StructuredResponse = {
  summary: string;

  applicableLaw: string;

  lawExplanation: string;

  rights: string[];

  actions: string[];

  draft: string;

  emergency: boolean;
};

const SUGGESTIONS = [
  "Salary not paid",
  "UPI scam",
  "Tenant issue",
  "Cybercrime complaint",
  "Online harassment",
];

const AGENT_STEPS = [
  "Understanding issue",
  "Identifying legal category",
  "Searching applicable rights",
  "Generating legal actions",
  "Drafting complaint",
];

function Chat() {

  const getWelcomeMessage = (
  lang: string
) => {

  if (
    lang.includes("ಕ")
  ) {

    return `
ನಮಸ್ಕಾರ 🙏 ನಾನು Nyaya AI.

ನಿಮ್ಮ ಕಾನೂನು ಸಮಸ್ಯೆಯನ್ನು ಸರಳವಾಗಿ ವಿವರಿಸಿ.
ನಾನು ನಿಮ್ಮ ಹಕ್ಕುಗಳನ್ನು ವಿವರಿಸಿ,
ಅಗತ್ಯವಾದ ದೂರು ಪತ್ರವನ್ನು ತಯಾರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.
`;
  }

  if (
    lang.includes("ह")
  ) {

    return `
नमस्ते 🙏 मैं Nyaya AI हूँ।

अपनी कानूनी समस्या सरल शब्दों में बताइए।
मैं आपके अधिकार समझाऊँगा और शिकायत पत्र तैयार करने में मदद करूँगा।
`;
  }

  return `
Namaste 🙏 I'm Nyaya AI.

Describe your legal issue in your own words —
I'll explain your rights and draft complaints for you.
`;
};

const [messages, setMessages] =
  useState<Msg[]>([
    {
      role: "assistant",

      content:
        getWelcomeMessage(
          "English"
        ),
    },
  ]);
  const [input, setInput] =
    useState("");

  const [language, setLanguage] =
    useState("English");

  const [busy, setBusy] =
    useState(false);

  const [activeStep, setActiveStep] =
    useState(-1);

  const [structured, setStructured] =
    useState<StructuredResponse | null>(
      null
    );

  const [copied, setCopied] =
    useState(false);

  const scrollRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

  scrollRef.current?.scrollTo({
    top:
      scrollRef.current.scrollHeight,

    behavior: "smooth",
  });

}, [messages, busy]);

// ADD THIS BELOW 👇

useEffect(() => {

  setMessages([
    {
      role: "assistant",

      content:
        getWelcomeMessage(
          language
        ),
    },
  ]);

  setStructured(null);

}, [language]);

  // TEXT TO SPEECH

  function speakText() {

  if (!structured) return;

  const fullText = `

  ${structured.summary}.

  Applicable law:
  ${structured.applicableLaw}.

  ${structured.lawExplanation}.

  Your rights are:
  ${structured.rights.join(". ")}.

  Recommended actions are:
  ${structured.actions.join(". ")}.

  Complaint draft:
  ${structured.draft}.

  `;

  const speech =
    new SpeechSynthesisUtterance(
      fullText
    );

  if (
    language.includes("ಕ")
  ) {

    speech.lang = "kn-IN";

  } else if (
    language.includes("ह")
  ) {

    speech.lang = "hi-IN";

  } else {

    speech.lang = "en-IN";
  }

  speech.rate = 0.95;

  speech.pitch = 1;

  speech.volume = 1;

  window.speechSynthesis.cancel();

  window.speechSynthesis.speak(
    speech
  );
}
  async function send(text: string) {

    if (!text.trim() || busy)
      return;

    setMessages((m) => [
      ...m,
      {
        role: "user",
        content: text,
      },
    ]);

    setInput("");

    setBusy(true);

    setStructured(null);

    // AGENT WORKFLOW

    for (
      let i = 0;
      i < AGENT_STEPS.length;
      i++
    ) {

      setActiveStep(i);

      await new Promise((r) =>
        setTimeout(r, 550)
      );
    }

    try {

      const aiResponse =
        await sendMessageToAI(
          text,
          language
        );

      const parsed =
        aiResponse;

      const formattedData = {

        summary:
          parsed.summary ||
          "No summary available.",

        applicableLaw:
          parsed.applicableLaw ||
          "Law information unavailable.",

        lawExplanation:
          parsed.lawExplanation ||
          "Simple explanation unavailable.",

        rights: Array.isArray(
          parsed.rights
        )
          ? parsed.rights
          : [],

        actions: Array.isArray(
          parsed.actions
        )
          ? parsed.actions
          : [],

        draft:
          parsed.complaintDraft ||
          "No complaint draft generated.",

        emergency:
          parsed.importantNote
            ?.toLowerCase()
            .includes("urgent") ||
          false,
      };

      setStructured(
        formattedData
      );

      setMessages((m) => [
        ...m,
        {
          role: "assistant",

          content:
            formattedData.summary,

          structured: true,
        },
      ]);

    } catch (error) {

      console.log(error);

      setMessages((m) => [
        ...m,
        {
          role: "assistant",

          content:
            "Something went wrong while processing your request.",
        },
      ]);
    }

    setBusy(false);

    setActiveStep(-1);
  }

  function copyDraft() {

    if (!structured) return;

    navigator.clipboard.writeText(
      structured.draft
    );

    setCopied(true);

    setTimeout(
      () => setCopied(false),
      1500
    );
  }

  return (
    <SiteShell>

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-[1fr_360px] gap-4 pb-12">

        {/* LEFT PANEL */}

        <div className="glass-strong rounded-3xl flex flex-col h-[calc(100vh-10rem)] overflow-hidden">

          {/* HEADER */}

          <div className="px-6 py-4 border-b border-border flex items-center justify-between">

            <div className="flex items-center gap-2">

              <div className="size-8 rounded-lg bg-foreground text-background grid place-items-center">
                <Sparkles className="size-4" />
              </div>

              <div>

                <div className="text-sm font-medium">
                  Nyaya AI Agent
                </div>

                <div className="text-xs text-muted-foreground flex items-center gap-1.5">

                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />

                  Online · multilingual

                </div>

                {/* LANGUAGE SELECTOR */}

                <div className="mt-2">

                  <select
                    value={language}
                    onChange={(e) =>
                      setLanguage(
                        e.target.value
                      )
                    }
                    className="text-xs glass px-2 py-1 rounded-lg outline-none"
                  >

                    <option>
                      English
                    </option>

                    <option>
                      ಕನ್ನಡ
                    </option>

                    <option>
                      हिंदी
                    </option>

                  </select>

                </div>

              </div>
            </div>
          </div>

          {/* CHAT AREA */}

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-4"
          >

            {messages.map((m, i) => (

              <div
                key={i}
                className={`flex ${
                  m.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-foreground text-background"
                      : "bg-secondary"
                  }`}
                >
                  {m.content}
                </div>

              </div>
            ))}

            {/* STRUCTURED RESPONSE */}

            {structured && (

              <div className="space-y-3 animate-fade-up">

                {/* EMERGENCY */}

                {structured.emergency && (

                  <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4">

                    <ShieldAlert className="size-5 text-destructive mt-0.5" />

                    <div className="text-sm">

                      <div className="font-medium text-destructive">
                        Urgent — Immediate Attention Required
                      </div>

                      <div className="text-muted-foreground mt-0.5">
                        Contact emergency support or legal authorities immediately.
                      </div>

                    </div>
                  </div>
                )}

                {/* APPLICABLE LAW */}

                <div className="rounded-2xl border border-border bg-card p-5">

                  <div className="flex items-center justify-between mb-3">

                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      Applicable Law
                    </div>

                    <button
                      onClick={speakText}
                      className="flex items-center gap-2 text-xs px-3 py-2 rounded-xl border border-border hover:bg-secondary transition"
                    >

                      <Volume2 className="size-4" />

                      Listen

                    </button>

                  </div>

                  <div className="text-sm font-medium leading-relaxed">
                    {structured.applicableLaw}
                  </div>

                  <div className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {structured.lawExplanation}
                  </div>

                </div>

                {/* RIGHTS */}

                <div className="rounded-2xl border border-border bg-card p-5">

                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                    Your Rights
                  </div>

                  <ul className="space-y-2 text-sm">

                    {structured.rights.map(
                      (r) => (
                        <li
                          key={r}
                          className="flex gap-2"
                        >
                          <span className="text-muted-foreground">
                            ·
                          </span>

                          {r}
                        </li>
                      )
                    )}

                  </ul>
                </div>

                {/* ACTIONS */}

                <div className="rounded-2xl border border-border bg-card p-5">

                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                    Recommended Actions
                  </div>

                  <ol className="space-y-2 text-sm">

                    {structured.actions.map(
                      (a, i) => (
                        <li
                          key={a}
                          className="flex gap-3"
                        >

                          <span className="size-5 rounded-full bg-foreground text-background text-[10px] grid place-items-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>

                          {a}
                        </li>
                      )
                    )}

                  </ol>
                </div>

                {/* COMPLAINT DRAFT */}

                <div className="rounded-2xl border border-border bg-card p-5">

                  <div className="flex items-center justify-between mb-3">

                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">

                      <FileText className="size-3" />

                      Complaint Draft

                    </div>

                    <button
                      onClick={copyDraft}
                      className="text-xs flex items-center gap-1 px-2 py-1 rounded-md hover:bg-secondary transition"
                    >

                      {copied ? (
                        <>
                          <Check className="size-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="size-3" />
                          Copy
                        </>
                      )}

                    </button>
                  </div>

                  <pre className="text-xs whitespace-pre-wrap font-sans text-muted-foreground leading-relaxed">
                    {structured.draft}
                  </pre>

                </div>
              </div>
            )}

            {/* LOADING */}

            {busy && (

              <div className="flex items-center gap-2 text-sm text-muted-foreground">

                <div className="flex gap-1">

                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="size-1.5 rounded-full bg-muted-foreground animate-bounce"
                      style={{
                        animationDelay:
                          `${i * 0.15}s`,
                      }}
                    />
                  ))}

                </div>

                Reasoning...

              </div>
            )}
          </div>

          {/* INPUT */}

          <div className="border-t border-border p-4 space-y-3">

            <div className="flex flex-wrap gap-2">

              {SUGGESTIONS.map((s) => (

                <button
                  key={s}
                  onClick={() => send(s)}
                  disabled={busy}
                  className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-secondary transition disabled:opacity-50"
                >
                  {s}
                </button>

              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 glass rounded-2xl px-3 py-2"
            >

              <input
                value={input}
                onChange={(e) =>
                  setInput(
                    e.target.value
                  )
                }
                placeholder="Describe your legal issue..."
                className="flex-1 bg-transparent outline-none text-sm py-2"
              />

              <button
                type="submit"
                disabled={
                  busy || !input.trim()
                }
                className="size-9 rounded-xl bg-foreground text-background grid place-items-center disabled:opacity-40"
              >
                <Send className="size-4" />
              </button>

            </form>
          </div>
        </div>

        {/* RIGHT PANEL */}

        <aside className="glass-strong rounded-3xl p-6 h-fit lg:sticky lg:top-28">

          <div className="flex items-center justify-between mb-5">

            <div className="text-sm font-medium">
              Agent Activity
            </div>

            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                busy
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {busy ? "Running" : "Idle"}
            </span>

          </div>

          <div className="space-y-2">

            {AGENT_STEPS.map((s, i) => {

              const done =
                !busy &&
                structured
                  ? true
                  : i < activeStep;

              const active =
                busy &&
                i === activeStep;

              return (

                <div
                  key={s}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                    active
                      ? "bg-foreground text-background"
                      : "bg-secondary/60"
                  }`}
                >

                  <span
                    className={`size-5 rounded-full grid place-items-center text-[10px] ${
                      done
                        ? "bg-emerald-500 text-white"
                        : active
                        ? "bg-background text-foreground"
                        : "bg-background border border-border text-muted-foreground"
                    }`}
                  >

                    {done ? (
                      <Check className="size-3" />
                    ) : (
                      i + 1
                    )}

                  </span>

                  <span
                    className={
                      done && !active
                        ? "text-muted-foreground"
                        : ""
                    }
                  >
                    {s}
                  </span>

                  {active && (
                    <span className="ml-auto size-1.5 rounded-full bg-background animate-pulse" />
                  )}

                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </SiteShell>
  );
}

export default Chat;