import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AcademyLogo } from "@/components/AcademyLogo";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — AcadeMY" },
      { name: "description", content: "Sign in or sign up to track your KSSM study progress." },
      { property: "og:title", content: "Sign In — AcadeMY" },
      {
        property: "og:description",
        content: "Create a free AcadeMY account to save your XP and streaks.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <section className="min-h-[calc(100svh-80px)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md glass-strong rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/30 blur-3xl rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/30 blur-3xl rounded-full" />

        <div className="relative">
          <AcademyLogo className="mb-2 h-auto w-[156px]" />

          <h1 className="font-display text-3xl font-bold mt-4">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "signin"
              ? "Sign in to keep your streak alive."
              : "Free forever. Built for KSSM students."}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Auth coming soon — enable Lovable Cloud to wire it up.");
            }}
            className="mt-6 space-y-4"
          >
            {mode === "signup" && <Field label="Full name" type="text" placeholder="Your name" />}
            <Field label="Email" type="email" placeholder="you@example.com" />
            <Field label="Password" type="password" placeholder="••••••••" />

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:scale-[1.02] transition-transform glow-blue"
            >
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-6">
            {mode === "signin" ? "New here? " : "Already have an account? "}
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-primary font-semibold hover:underline"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>

          <Link
            to="/"
            className="block text-center text-xs text-muted-foreground mt-4 hover:text-foreground"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}

function Field({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
    </label>
  );
}
