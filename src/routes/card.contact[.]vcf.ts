import { createFileRoute } from "@tanstack/react-router";
import { createBusinessCardVCardResponse } from "@/features/business-card/contact";

export const Route = createFileRoute("/card/contact.vcf")({
  server: {
    handlers: {
      GET: () => createBusinessCardVCardResponse(),
    },
  },
});
