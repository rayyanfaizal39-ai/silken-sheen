import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CtaBand, Footer } from "@/components/CtaBand";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Features />
      <CtaBand />
      <Footer />
    </>
  );
}
