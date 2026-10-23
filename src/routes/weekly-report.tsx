import { createFileRoute, redirect } from "@tanstack/react-router";

// Parent progress email is monthly. Keep this path so old links open /parent.
export const Route = createFileRoute("/weekly-report")({
  beforeLoad: () => {
    throw redirect({ to: "/parent" });
  },
});
