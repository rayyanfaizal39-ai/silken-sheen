import { createFileRoute } from "@tanstack/react-router";
import { RegistrationPage } from "@/components/auth/RegistrationPage";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/register")({
  head: () =>
    seoMeta({
      title: "Start Your Journey",
      description: "Choose your AcadeMY learning world and create your account.",
      path: "/register",
      noindex: true,
    }),
  component: RegistrationPage,
});
