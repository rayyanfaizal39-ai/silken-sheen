type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

function getServerEntry() {
  serverEntryPromise ??= import("@tanstack/react-start/server-entry").then(
    (module) => (module as { default?: ServerEntry }).default ?? (module as unknown as ServerEntry),
  );
  return serverEntryPromise;
}

function canonicalRedirect(request: Request) {
  const url = new URL(request.url);
  if (url.hostname !== "cards.myacademy.my" || url.protocol === "https:") return null;
  url.protocol = "https:";
  return Response.redirect(url, 301);
}

function secureResponse(request: Request, response: Response) {
  const headers = new Headers(response.headers);
  headers.set("x-content-type-options", "nosniff");
  headers.set("referrer-policy", "strict-origin-when-cross-origin");
  headers.set("permissions-policy", "camera=(), microphone=(), geolocation=()");
  const acceptsHtml = request.headers.get("accept")?.includes("text/html");
  if (acceptsHtml || new URL(request.url).pathname.startsWith("/_serverFn/")) {
    headers.set("cache-control", "private, no-store, max-age=0");
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const redirect = canonicalRedirect(request);
    if (redirect) return redirect;
    const handler = await getServerEntry();
    return secureResponse(request, await handler.fetch(request, env, ctx));
  },
};
