# Landing-page redesign: elevate Stigmem to peer of Craik

**Status:** Approved · ready for implementation
**Date:** 2026-05-19
**Scope:** Visual + content changes to `index.html` and `styles.css` (and assets) for the parent landing page at the root of `eidetic-labs/eidetic-labs`. No new pages, no new build tooling.

## Context

The current landing page positions Craik as the flagship product and Stigmem as a small "component embedded in Craik." This understates Stigmem, which is actually:

- An independent product with its own site (`stigmem.dev`)
- Older than Craik (created 2026-05-02 vs Craik's 2026-05-15)
- An open spec + reference implementation, not a Craik-internal library
- Positioned by Stigmem's own site as ecosystem-wide infrastructure that "sits above" any agent runtime, not just Craik's

Eidetic Labs builds both. The parent page should treat them as peers with an explicit composition story.

## Goals

- Show Stigmem and Craik as **independent peers that interoperate** — each can be adopted alone, the parent page is a launchpad for both.
- Tell the "how they fit together" story concretely, not abstractly.
- Mirror the visual language already established by `craik.eidetic-labs.com` and `stigmem.dev` (Poppins, lavender accents, dot-grid, §-numbered sections, theme toggle).
- Replace the failure-mode ledger that was lifted from Craik with something unique to the parent page.

## Non-goals

- No new pages or routes (parent page stays single-page).
- No build tooling, framework, or bundler changes.
- No changes to the principles section (§05) or the lab section (§06) — both already work for two products.
- No changes to the brand mark, fonts, color tokens, header, theme toggle, or footer styling.
- No changes to the existing `craik.eidetic-labs.com` or `stigmem.dev` sites.

## Decisions

| # | Decision | Source |
|---|---|---|
| 1 | Relationship framing: **independent peers that interoperate** | brainstorm Q1 |
| 2 | Stigmem already has its own site at `stigmem.dev` — parent page is a launchpad, not the canonical Stigmem home | brainstorm Q2 (user override) |
| 3 | Hero treatment: **parent-brand led** (today's hero stays, lede extends to name the two products) | visual mockup `hero-direction.html` |
| 4 | Products treatment: **alternating full-width sections** — each product its own §, mirror visuals, z-pattern flow | visual mockup `products-layout.html` |
| 5 | Composition section treatment: **worked example terminal trace** | visual mockup `composition-section.html` |
| 6 | Failure-mode ledger replacement: **Option 2 — "What survives, what doesn't"** (industry-trend → opposite-decay) | terminal Q |
| 7 | Section ordering: Stigmem first (§02), Craik second (§03) — Stigmem is foundational/older; reads naturally as "memory under runtime" | design proposal, not pushed back |

## Page outline (new)

```
Header                  (unchanged)
Hero §00                Parent-brand-led, lede extended to name two products,
                        third CTA added
§01  Premise            Editorial manifesto; final sentence names the two
                        products; ledger replaced
§02  Stigmem            Full-width section, visual on left, lavender-disc mark
§03  Craik              Full-width section, visual on right, dark C-mark
                        (mirror of §02)
§04  Composition        Terminal trace showing one fact moving through both
§05  Principles         (unchanged)
§06  The lab            (unchanged)
Footer                  Stigmem link updated to stigmem.dev
```

§-numbers shift down by one (today the page goes §01–§04; new page goes §01–§06). Site nav in the header updates accordingly.

## Section specs

### Hero §00 (changed)

**Stays:** eyebrow, headline ("Memory and governance for agent work."), em-accent on "work", E-mark hero visual with scan lines & labels, stats grid, animations, theme-toggle behavior.

**Lede (new):**
> **Eidetic** — recalled with photographic clarity. We build two pieces of the agent stack: **Stigmem**, a federated memory fabric, and **Craik**, a governed agent runtime. Each stands alone. Together, they compose.

**CTAs (three buttons):**
1. `See what we build` — primary, scrolls to `#stigmem`
2. `Visit Stigmem ↗` — ghost, links to `https://stigmem.dev`
3. `Visit Craik ↗` — ghost, links to `https://craik.eidetic-labs.com`

**Stats grid:** the `Focus` cell changes from `Agent runtime · governance` → `Stigmem · Craik`. The other two (`Founded`, `Status`) unchanged.

**Hero E-mark labels:** four corner labels stay (`MEMORY`, `GOVERNANCE`, `HANDOFF`, `RUNTIME`). Hint lines refined:
- `MEMORY` hint: `stigmem · facts` (unchanged)
- `GOVERNANCE` hint: `policy · receipts` (unchanged)
- `HANDOFF` hint: `next agent` (unchanged)
- `RUNTIME` hint: `craik · case files` (was `case file`)

### Header nav (changed)

Section links update to match the new §-numbering:

| Today | New |
|---|---|
| §01 Premise | §01 Premise |
| §02 Products | §02 Stigmem |
| §03 Principles | §03 Craik |
| §04 The lab | §04 Composition |
| | §05 Principles |
| | §06 The lab |

All six items stay in the desktop nav (six 80–100px chips fit the existing middle column). The header's existing `<760px` rule already hides `.site-nav` entirely on mobile — keep that behavior.

### §01 Premise (lightly changed)

**Stays:** the three-paragraph rhythm (setup → pull-quote → resolution), the sticky `§01 · Premise` marker, all typography (`chip`, `verb`, `quote-mark`), the visual treatment of the pull-quote.

**Setup paragraph:** unchanged.

**Pull-quote:** unchanged ("Those are necessary. They are not enough.").

**Resolution paragraph (changed final sentence):**
> An agent is useful at organizational scale only when it can **remember**, **justify**, **coordinate**, **dispute**, and **hand off** its work — across sessions, tools, runners, and the humans who review it. Eidetic Labs builds that substrate as two composable pieces: **Stigmem** for the memory, **Craik** for the run.

**Failure-mode ledger (replaced entirely):**

| # | from | to |
|---|---|---|
| 01 | Models advance | Memory regresses. |
| 02 | Tools multiply | Trust thins. |
| 03 | Agents proliferate | Handoffs vanish. |
| 04 | Runs complete | Evidence dissolves. |

Same `.premise__ledger` markup and styling as today — only the text content changes. The grid layout (`44px · 1fr · 32px · 1fr`) and the lavender `→` separator stay.

### §02 Stigmem (new)

Full-width section, two-column grid: **visual on the left**, copy on the right.

**Header:**
- Eyebrow: `§02 · Stigmem`
- Title: `The Federated Knowledge Fabric.` (with em-accent on "Fabric" using existing h2 em styling)

**Body:**
- Lede: `A shared memory layer for AI agents. Typed, provenance-tagged facts that travel across tools, platforms, and organizations.`
- Feature bullets (four):
  - Typed facts with provenance and scope
  - Federation under signed handshakes
  - Contradictions surfaced, not overwritten
  - Open spec + reference implementation

**Actions:**
- Primary button: `Visit stigmem.dev ↗` → `https://stigmem.dev`
- Install snippet: `$ pip install stigmem` with copy button (reuses `.install-snippet` markup)

**Status line (small mono caption below actions):** `preview alpha · v0.9.0a2 · Apache-2.0`

**Visual (left side):** A ~320×320 SVG of the Stigmem mark — a solid lavender (`#B4ACE6`) disc on a dot-grid backdrop, with 3–4 faint orbiting "fact" tokens labeled `entity`, `relation`, `value`, `scope`. Same animation language as the hero E-mark (slow orbits, subtle pulse). The disc echoes the simple geometric icon used on `stigmem.dev`.

### §03 Craik (new)

Full-width section, **mirrored layout**: copy on the left, **visual on the right**.

**Header:**
- Eyebrow: `§03 · Craik`
- Title: `The Agent Operating Layer.` (em-accent on "Layer")

**Body:**
- Lede: `Shared project state, policy-bound authority, durable receipts, and handoffs the next agent can trust. Runner-neutral: Codex, Claude, Gemini, direct OpenAI & Anthropic, OAI-compatible locals.`
- Feature bullets (four):
  - Case files & shared project memory
  - Receipted authority & policy envelopes
  - Durable, machine-readable handoffs
  - One governance model across runners

**Actions:**
- Primary button: `Visit craik.eidetic-labs.com ↗` → `https://craik.eidetic-labs.com`
- Install snippet: `$ pip install craik` with copy button

**Status line:** `governed MVP · 0.1.x · MIT`

**Visual (right side):** A ~320×320 SVG echoing the Craik site mark — the open C arc with a lavender (`#B4ACE6`) dot at the center on a dot-grid backdrop, with 2–3 orbital `node` chips around it labeled `case_file`, `policy`, `receipt`. Visually rhymes with §02's lavender disc, but reads as a sibling (different mark) rather than a twin.

### §04 Composition (new)

Centered single-column layout. Framing prose capped at `max-width: 62ch` for readability; the `.terminal` block underneath stretches to the full `.section` width (it already has its own internal padding).

**Header (`.section__head--center`):**
- Eyebrow: `§04 · Composition`
- Title: `One fact. Two products.` (em-accent on "Two")

**Framing paragraph (above the terminal):**
> Stigmem holds the truth. Craik governs the act. The interface is small and explicit: Craik reads facts as evidence, writes receipts back as facts, and surfaces contradictions to the inbox they share.

**Terminal trace** — reuses the existing `.terminal` component from `styles.css`:

```
~/repos/product · main                         ● ● ●
─────────────────────────────────────────────────────
$ stigmem assert  migration_0042.row_count = 12M
→ fact_8a · signed · scope=team-dba

$ craik case build  task_042
→ pulls fact_8a · 12 evidence refs

$ craik run  task_042  --policy strict.write
→ contradiction: stigmem fact_91 differs
→ surfaced to  reviewer:@dba
```

Styling tokens within the terminal:
- The `$` prompt for `stigmem` lines: lavender (`var(--lavender)`)
- The `$` prompt for `craik` lines: also lavender (consistent with existing terminal styling — no need to introduce a new color)
- `→` comment lines: dim (existing `.terminal__body .comment` styling)
- The word `contradiction` in the third command's output: subtle red highlight via a new `.mark-r` utility class — colored `#ef6a6a` at ~20% background tint, padded 1px 5px, border-radius 3px.
- `reviewer:@dba`: lavender pill via a new `.mark-l` utility class — `var(--lavender-tint)` background, `var(--lavender-deep)` text, same padding/radius as `.mark-r`.

These two utility classes are new — `styles.css` does not currently have them. They mirror the `mark-r` / `mark-l` / `mark-y` pattern used on `craik.eidetic-labs.com`'s handoff artifact, scoped to use inside the `.terminal__body` initially.

**Resolution paragraph (below the terminal):**
> Adopt Stigmem alone for cross-platform memory. Adopt Craik alone in its degraded local mode. Adopt both for the full loop — the seams are documented, the contracts are typed.

### Footer (changed)

In `.site-footer__nav`, the "Products" group:
- `Craik` link: unchanged → `https://craik.eidetic-labs.com`
- `Stigmem` link: **changes** from `#products` → `https://stigmem.dev`

Everything else in the footer unchanged.

## Removed from the page

The following are deleted (their content distributes into §02, §03, §04):

1. The current `<section class="section products" id="products">` block — superseded by §02 + §03 + §04.
2. The small `.product--small` card for Stigmem ("Embedded in Craik" — actively misleading now).
3. The `.product--upcoming` card ("What's next" — that roadmap content belongs in Craik's own docs, not the parent page).
4. The "Flagship · 0.1.x" / `Active development` meta strip — replaced by per-product status lines under each section's CTAs.

## Visual styling notes

- All new sections reuse existing token system — no new CSS variables.
- The two product `__visual` SVGs share most of the dot-grid + halo + orbit infrastructure already used by the hero E-mark. Extract that into a small reusable pattern set if it makes the markup cleaner, but it's fine to inline first and refactor later.
- The mirror layout (visual-left vs visual-right) is a single grid-column swap; can be done with a modifier class like `.product-feature--reverse`.
- All animations respect `prefers-reduced-motion` already set up in the existing stylesheet.
- Responsive: at `<1100px`, both product sections collapse to single-column (visual stacked above copy). At `<760px`, the §04 terminal trace stays usable but the framing paragraphs may need a font-size adjustment.

## Acceptance criteria

- Page renders correctly in light and dark themes at 1440px, 1100px, 760px, 414px widths.
- All three hero CTAs work (scroll-to-anchor + two external links open).
- Theme toggle still persists to localStorage.
- The install-snippet copy buttons in both §02 and §03 copy the right command.
- Header nav links scroll to the correct sections.
- Footer Stigmem link goes to `stigmem.dev`.
- No new console errors. No regression in existing test-coverage (there is none yet — just the eyeball check).

## Out of scope (deferred)

- A dedicated `/stigmem` or `/craik` sub-page on this domain. (Both products have their own sites.)
- Localization. The page stays English-only.
- Analytics. None today.
- Adding a Stigmem-specific brand mark file to `assets/logo/` — the page generates the disc mark inline via SVG.

## References

- Visual companion mockups: `.superpowers/brainstorm/72725-1779255637/content/`
  - `hero-direction.html`
  - `products-layout.html`
  - `composition-section.html`
- Existing page: `index.html`, `styles.css`
- Stigmem README: `https://github.com/eidetic-labs/stigmem`
- Craik README: `https://github.com/eidetic-labs/craik`
- Stigmem marketing site: `https://stigmem.dev`
- Craik marketing site: `https://craik.eidetic-labs.com`
- Brand tokens: `~/Downloads/eidetic-labs-brand/11_dev-tokens/`
