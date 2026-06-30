# Enable Figma via Lovable Desktop MCP

Figma is not a cloud connector in Lovable — it only works through the desktop-local MCP path. No code changes in this project are needed; setup happens on your machine.

## Steps for you

1. **Install Lovable Desktop**: https://lovable.dev/download — then sign in with the same account.
2. **Open this project in Lovable Desktop** (so the desktop app drives the agent session that can see local MCP servers).
3. **Open Figma Desktop** and load the file you want to sync.
4. **Enable Figma's MCP server**:
   - Press `Shift+D` to enter Dev Mode.
   - In the inspect panel, click **Enable desktop MCP server**.
   - Reference: https://developers.figma.com/docs/figma-mcp-server/local-server-installation/
5. **Connect it in Lovable Desktop**: Settings → Connectors → **Local MCP servers** → add/enable Figma.
6. **Verify**: back in chat, paste a Figma frame link or selection link. I'll be able to read frames, styles, and tokens directly.

## What I'll do once it's connected

- Read the AcadeMy landing page frame you shared earlier and extract layout, colors, typography, and spacing.
- Map Figma styles to existing design tokens in `src/styles/theme.css` / `src/styles/fonts.css`.
- Propose a separate build plan to update the landing components to match.

## Notes / limits

- The Figma desktop connector is **read-only** — I can pull design data but cannot write back to Figma.
- The connector lives in your desktop session, not in this cloud project — other collaborators won't share it automatically.
- If you'd rather skip desktop install, export the frame(s) as PNG and drop them in chat; I can redesign from screenshots as a fallback.

Reply once Figma shows as connected (or if you'd prefer the screenshot route) and I'll move into a build plan.