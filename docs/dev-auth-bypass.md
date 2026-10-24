# Local dev sign-in

`npm run dev` can sign in as a demo student with no Supabase project. The bypass is off unless all of these are true:

- the Vite dev server is running (`import.meta.env.DEV`)
- `.env.local` contains `VITE_DEV_AUTH_BYPASS=true`
- the site is opened on `localhost`, `127.0.0.1`, or `::1`
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are not configured

Production builds drop the bypass. A production call that still asks for it fails closed.

## Turn it on

In the repo root, create `.env.local` (this file is gitignored):

```
VITE_DEV_AUTH_BYPASS=true
```

Do not put a Supabase URL or key in that file. Restart `npm run dev`, then open:

`http://localhost:8080/login?next=/companion`

Choose **Aisha · Form 1**, **Haziq · Form 2**, or **Staff**. On the sign-in screen, and again on the Cosmic Companion page, the demo plan switch is **Premium** or **Free**. Premium is the paid plan that includes Cosmic Companion. Free does not.

**Free.** Open `http://localhost:8080/companion` and choose **Enter My Cosmic Portal** (or **Discover My Companion** before a journey exists). The button goes to `http://localhost:8080/upgrade?next=/companion`. **Back to Cosmic Companion** on that page returns here. The twelve questions do not start, and Staff do not see this student in the artwork queue.

**Premium.** The same button opens the generator once. Answer the twelve questions and summon. That matches one companion, the preference match, creates the one permanent card, and places the student in the staff queue immediately. The studio shows that companion's name, species, element, story, traits and match reasons, and **Your portrait is being crafted**. Choose the portal button again while the portrait is still waiting and it returns to that companion. It does not start the questions again. A second summon is refused. After the portrait is chosen, the portal opens the card at `http://localhost:8080/nova`.

No image API is called, and `NOVA_AI_ENABLED` / `NOVA_AI_BATCH_ENABLED` stay off.

Until staff upload two portraits of that companion, the card says **Your portrait is being crafted**. The gold frame, serial, QR code and barcode are already there. After both portraits are uploaded, the card says **Choose your companion art**. The portrait the student picks becomes the card artwork. Picking again is refused until Staff resets the choice.

The card is at:

`http://localhost:8080/nova`

The same companion is shown on `http://localhost:8080/companion` and on the student dashboard. Until the student summons, both say **Awaiting discovery**. After summoning, they say the portrait is being crafted. After two portraits are uploaded, they say **Choose your companion art**. After the student picks one, they show that portrait.

## Staff portraits

Sign in as **Staff**, then open:

`http://localhost:8080/admin/companion-craft`

The queue lists a position, how long the student has been queued, the display name, form, companion, species, element, traits, quiz personality and card public id. Staff make two portraits of that one companion. The oldest student still waiting for those portraits is marked **Next up**. Tabs are **Waiting for art** (the default), **Options ready**, **Chosen**, and **All**. **Download brief (JSON)** saves one student's artist file: card id, public id, nickname, form, rarity, submitted time, the twelve answers, identity traits, the companion's visual spec, Visual DNA, and the PNG output rules. That file has no email and no account id. Export CSV or JSON still lists the queue. Upload exactly two images for the card public id. The student picks one on the card page. **Reset art choice** lets them pick again. The serial does not change. One card stays with the student.

Aisha and Haziq cannot open that screen. The same admin check lives in the `nova_admin_*` database functions. `supabase/migrations/20261023140000_nova_staff_craft.sql`, `supabase/migrations/20261023160000_nova_craft_art_options.sql`, `supabase/migrations/20261023170000_nova_companion_journey_gate.sql`, `supabase/migrations/20261024120000_nova_craft_queue_both_picks.sql`, `supabase/migrations/20261024120100_nova_artwork_bucket_limits.sql`, and `supabase/migrations/20261024130000_nova_single_companion_submit.sql`, and `supabase/migrations/20261024140000_nova_craft_portrait_read.sql` are for review only. Do not apply them to a Supabase project from this dev bypass. A new summon enters this queue as the preference companion, and only when the paid grant is on the card. A card that was already queued keeps its companion. `nova_card_candidates` stays the companion identity. The two portraits are stored beside it.

Each student's answers, choice, and card stay in this browser's `localStorage` under `academymy.dev-auth.v1`. After pulling this update, refresh the studio page. A journey that was already saved keeps its serial. The card waits for a staff portrait instead of copying the comparison drawing.

## Public card link

Sharing is off until the student turns it on. On the My Companion tab (`http://localhost:8080/nova/studio`) the card says **Private · only opens after sharing is enabled**. Copy link, Share, WhatsApp, Instagram, TikTok, Download card image, and Copy caption stay hidden until sharing is on. Enable sharing, then use **Copy link**. The link looks like:

`http://localhost:8080/card/c/00000000-0000-4000-8000-00000000d101`

That address is Aisha's public id. It is not the card serial. Open it signed out, or in a private window. The page shows the display name, companion, traits, rarity, stars, aura and serial. The portrait appears only after Staff approves it. The QR code on the card points at the same address.

WhatsApp opens `https://wa.me/?text=` with a caption that names the companion, the card URL, Instagram `@academykssm` (https://www.instagram.com/academykssm/), TikTok `@myacademymalaysia` (https://www.tiktok.com/@myacademymalaysia), and `#AcadeMY #NovaCompanion`. Instagram and TikTok have no web share address, and AcadeMY does not post to either of them. There is no Instagram or TikTok API, developer app, or OAuth sign-in. On a phone, Instagram and TikTok open the device share sheet with the story image. On a desktop they download that image and ask you to copy the caption. **Download card image** saves the same story at 1080 by 1920. The handles live in `ACADEMY_SOCIAL_HANDLES` and the profile pages live in `ACADEMY_SOCIAL_LINKS`.

Turn sharing off and the same link shows **This card is not available**. The preview image is:

`http://localhost:8080/card/c/00000000-0000-4000-8000-00000000d101/preview.png`

It is a portrait of the safe fields. It answers 404 when sharing is off. After a dev-server restart, open My Companion or `/nova` once so a shared card is published again. `supabase/migrations/20261023150000_nova_public_card.sql` is review only. Do not apply it from this bypass. Image generation stays off.

## Turn it off

Delete `VITE_DEV_AUTH_BYPASS` from `.env.local`, or set it to `false`, then restart `npm run dev`. To clear a local journey, remove the `academymy.dev-auth.v1` entry in the browser's site data.
