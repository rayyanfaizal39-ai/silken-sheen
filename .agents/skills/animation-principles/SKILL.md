---
name: animation-principles
description: Apply Disney's 12 Principles of Animation to UI, web, and product motion. Use when the user asks about animation, motion design, transitions, easing, micro-interactions, GSAP/Framer Motion feel, hover/press feedback, loading states, or "make it feel more alive/polished/cinematic".
---

# Animation Principles for UI

Motion is communication. Every animation should have a reason — direct attention, show causality, confirm an action, or express personality. Never animate for decoration alone.

## The 12 Principles (applied to UI)

| # | Principle | UI application |
|---|-----------|----------------|
| 1 | **Squash & Stretch** | Buttons compress slightly on press; toasts stretch on entry. Preserve volume — width grows as height shrinks. |
| 2 | **Anticipation** | Menu handle nudges before opening; button dips before launching. Prep the eye for what's next. |
| 3 | **Staging** | One primary motion at a time. Dim/blur background when a modal opens. Direct focus. |
| 4 | **Straight Ahead vs Pose to Pose** | Use keyframe/pose-to-pose (Framer `animate`, GSAP tweens) for UI. Straight-ahead (physics, particles) only for organic effects. |
| 5 | **Follow Through & Overlapping Action** | Staggered list items (30–60ms). Card settles with a small overshoot after scale. Children lag parents. |
| 6 | **Slow In / Slow Out** | **Never use `linear`.** Default to `ease-out` (150–250ms) for entrances, `ease-in` for exits, spring for interactive. |
| 7 | **Arc** | Draggable elements and floating mascots follow curved paths, not straight lines. Use bezier or orbit math. |
| 8 | **Secondary Action** | Icon rotates while panel slides. Glow pulses while button hovers. Supports, never competes. |
| 9 | **Timing** | 100–200ms: micro-interaction. 200–400ms: page transition. 400–800ms: onboarding/celebration. Heavy = slow, light = fast. |
| 10 | **Exaggeration** | Push scale/rotation slightly past realistic (1.05, not 1.02) so the eye reads it. Especially in celebrations. |
| 11 | **Solid Drawing** | Maintain perceived weight and 3D form. Shadows shift with elevation. Don't scale text — it looks like a bug. |
| 12 | **Appeal** | Distinctive personality. Custom easing curves, signature transitions, mascot micro-motions. This is your brand. |

## Non-negotiable rules

- **Always specify properties**: `transition: transform 200ms ease-out` — never `transition: all`.
- **Never fade from `scale(0)`**: use `scale(0.95) + opacity(0)`. Nothing in reality appears from nothing.
- **Respect `prefers-reduced-motion`**: gate parallax, autoplay, and large motion.
- **60fps or nothing**: animate `transform` and `opacity`. Avoid `width`, `height`, `top`, `left`, `filter`.
- **Cancel on interrupt**: if the user re-triggers, the animation should reverse or restart, not queue.

## Recommended defaults

```css
--ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);   /* subtle overshoot */
--ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1);
--dur-micro: 150ms;
--dur-base:  250ms;
--dur-page:  400ms;
```

## Tool choice

| Need | Tool |
|------|------|
| Component enter/exit, layout shifts | Framer Motion (`AnimatePresence`, `layout`) |
| Complex timelines, scroll-triggered, orbits, hero cinematics | GSAP + ScrollTrigger |
| Simple hover/press | CSS `transition` |
| Physics-based drag | Framer Motion springs |

## Review checklist

When auditing motion, ask:
1. What is this animation communicating?
2. Is the easing non-linear?
3. Does it respect reduced-motion?
4. Is it interruptible?
5. Would removing it hurt the experience? If no — remove it.
