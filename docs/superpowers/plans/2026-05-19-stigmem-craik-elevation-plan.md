# Stigmem-Craik Elevation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the Eidetic Labs landing page (`index.html`, `styles.css`) so Stigmem and Craik are presented as independent peers with a "how they fit together" section, per the approved spec at `docs/superpowers/specs/2026-05-19-stigmem-craik-elevation-design.md`.

**Architecture:** Pure static-site edits — no build tooling, no framework, no test framework. Verification is by visual screenshot (headless Chrome) and `grep`-based markup checks against a running local server. Implementation lives on the same `spec/two-product-elevation` branch the spec was committed to; everything ships in one PR/merge to `main`.

**Tech Stack:** Plain HTML, CSS, vanilla JS. Local preview via `python3 -m http.server`. Visual verification via headless Google Chrome (`/Applications/Google Chrome.app`).

---

## Reference: spec sections

Each task below maps to one or more sections of the spec at `docs/superpowers/specs/2026-05-19-stigmem-craik-elevation-design.md`. Re-read the relevant section before starting each task.

## Reference: file inventory

| File | Action | What changes |
|---|---|---|
| `index.html` | Modify | Header nav (4→6 items), hero lede+CTAs+stats+RUNTIME label, §01 Premise resolution + ledger, delete old §02, add §02 Stigmem + §03 Craik + §04 Composition, footer Stigmem link |
| `styles.css` | Modify | Add `.product-feature` (full-width section), `.product-feature--reverse` (mirror), Stigmem/Craik visual classes, `.mark-r` / `.mark-l` utilities, mobile rules for new sections |
| `theme.js` | No change | Existing copy-to-clipboard already handles `[data-copy]` for new install snippets |
| `docs/superpowers/specs/...` | No change | Spec is the source of truth, not modified |
| `docs/superpowers/plans/...` | This file | The plan |

No new files are created. No assets are added (the two product visuals are generated inline via SVG).

---

## Preflight (one-time setup)

- [ ] **Step P.1: Confirm you're on the right branch**

Run: `cd ~/eidetic-labs && git branch --show-current`
Expected: `spec/two-product-elevation`

If not on that branch:
```bash
cd ~/eidetic-labs && git checkout spec/two-product-elevation
```

- [ ] **Step P.2: Confirm the spec is present**

Run: `ls -la ~/eidetic-labs/docs/superpowers/specs/2026-05-19-stigmem-craik-elevation-design.md`
Expected: file exists, ~10 KB

- [ ] **Step P.3: Confirm working tree is clean**

Run: `cd ~/eidetic-labs && git status --short`
Expected: empty output (no uncommitted changes)

If unexpected files appear, ask the user before continuing.

- [ ] **Step P.4: Start (or confirm) the local preview server on port 4747**

Run:
```bash
lsof -ti:4747 >/dev/null 2>&1 && echo "already running" || {
  cd ~/eidetic-labs && python3 -m http.server 4747 >/tmp/eidetic-server.log 2>&1 &
  disown; sleep 0.5;
}
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:4747/
```
Expected: `HTTP 200` (whether the server was already up or freshly started).

- [ ] **Step P.5: Confirm headless Chrome is available for screenshots**

Run: `ls "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`
Expected: file exists.

If missing, fall back to `open http://localhost:4747` and ask the user to confirm visually instead of taking screenshots.

---

## Task 1: CSS scaffolding (new section + utility classes)

**Why first:** Every later task assumes these classes exist. Land them first so each markup task has somewhere to hang.

**Files:**
- Modify: `styles.css` — append a new block at the end, just before the responsive `@media` block at line ~700

**Spec sections to re-read:** "§02 Stigmem", "§03 Craik", "§04 Composition", "Visual styling notes"

- [ ] **Step 1.1: Find the insertion point in `styles.css`**

Open `styles.css`. Find the comment line `/* ───────── Responsive ───────── */` (currently around line 705). All new CSS goes immediately *before* that comment so the responsive overrides at the bottom can override the new rules.

- [ ] **Step 1.2: Add the `.product-feature` section styles**

Insert the following block before the `/* ───────── Responsive ───────── */` comment:

```css
/* ───────── Product features (§02 Stigmem, §03 Craik) ───────── */
.product-feature {
  align-items: center;
  display: grid;
  gap: clamp(40px, 6vw, 80px);
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  margin: 0 auto;
  max-width: var(--max);
  padding: clamp(80px, 10vw, 144px) var(--gutter);
  position: relative;
}
.product-feature--reverse {
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
}
.product-feature--reverse .product-feature__copy { order: 1; }
.product-feature--reverse .product-feature__stage { order: 2; }
.product-feature:not(.product-feature--reverse) .product-feature__stage { order: 1; }
.product-feature:not(.product-feature--reverse) .product-feature__copy { order: 2; }

.product-feature__copy {
  display: flex;
  flex-direction: column;
  gap: 22px;
  max-width: 56ch;
}
.product-feature__head h2 {
  font-size: clamp(2rem, 4vw, 3.6rem);
  font-weight: 300;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin-top: 14px;
}
.product-feature__lede {
  color: var(--fg-dim);
  font-size: 1.06rem;
  line-height: 1.75;
}
.product-feature__features {
  border-top: 1px solid var(--rule);
  display: grid;
  gap: 10px 24px;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  list-style: none;
  margin: 4px 0 0;
  padding: 22px 0 0;
}
.product-feature__features li {
  align-items: center;
  color: var(--fg);
  display: flex;
  font-size: 0.94rem;
  gap: 10px;
}
.product-feature__features li::before {
  color: var(--accent);
  content: '◦';
  font-weight: 700;
}
.product-feature__actions {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}
.product-feature__status {
  color: var(--fg-mute);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  margin-top: 4px;
}

.product-feature__stage {
  aspect-ratio: 1;
  justify-self: center;
  max-width: min(420px, 42vw);
  position: relative;
  width: 100%;
}
.product-feature__stage svg {
  filter: drop-shadow(0 30px 60px rgba(10, 10, 10, 0.08));
  height: 100%;
  width: 100%;
}
html[data-theme='dark'] .product-feature__stage svg {
  filter: drop-shadow(0 30px 60px rgba(124, 114, 199, 0.18));
}

/* Stigmem visual: lavender disc + faint orbit dots */
.stigmem-mark__disc { fill: #B4ACE6; }
.stigmem-mark__halo  { fill: url(#stigmem-halo); }
.stigmem-mark__orbit { fill: none; stroke: var(--accent); stroke-opacity: 0.18; stroke-dasharray: 2 6; transform-origin: 200px 200px; }
.stigmem-mark__orbit--1 { animation: spin 80s linear infinite; }
.stigmem-mark__orbit--2 { animation: spin 120s linear infinite reverse; }
.stigmem-mark__token rect { fill: var(--bg); stroke: var(--rule-strong); stroke-width: 1; }
.stigmem-mark__token text { fill: var(--fg); }
.stigmem-mark__token .t-label { font-weight: 600; letter-spacing: 0.06em; }
.stigmem-mark__pulse {
  animation: dotPulse 3.2s var(--ease) infinite;
  transform-box: fill-box;
  transform-origin: center;
}

/* Craik visual: open C arc + lavender dot + orbital node chips */
.craik-mark__arc  { fill: none; stroke: var(--mark-fill); stroke-width: 22; stroke-linecap: round; }
.craik-mark__dot  { fill: #B4ACE6; }
.craik-mark__halo { fill: url(#craik-halo); }
.craik-mark__orbit { fill: none; stroke: var(--accent); stroke-opacity: 0.18; stroke-dasharray: 2 6; transform-origin: 200px 200px; }
.craik-mark__orbit--1 { animation: spin 110s linear infinite; }
.craik-mark__node rect { fill: var(--bg); stroke: var(--rule-strong); stroke-width: 1; }
.craik-mark__node text { fill: var(--fg); }
.craik-mark__node .n-label { font-weight: 600; letter-spacing: 0.06em; }
.craik-mark__pulse {
  animation: dotPulse 2.6s var(--ease) infinite;
  transform-box: fill-box;
  transform-origin: center;
}

/* ───────── Composition (§04) ───────── */
.composition__head {
  margin-inline: auto;
  max-width: 760px;
  text-align: center;
}
.composition__head .eyebrow { margin-inline: auto; }
.composition__framing,
.composition__resolution {
  color: var(--fg-dim);
  font-size: 1.06rem;
  line-height: 1.75;
  margin: clamp(28px, 3vw, 40px) auto 0;
  max-width: 62ch;
}
.composition__terminal {
  margin: clamp(36px, 4vw, 56px) 0;
}

/* In-terminal mark utilities (§04 trace highlights) */
.terminal__body .mark-r {
  background: rgba(239, 106, 106, 0.18);
  border-radius: 3px;
  color: #ff9b9b;
  padding: 1px 5px;
}
.terminal__body .mark-l {
  background: rgba(180, 172, 230, 0.22);
  border-radius: 3px;
  color: var(--lavender);
  padding: 1px 5px;
}
```

- [ ] **Step 1.3: Verify CSS is well-formed**

Run:
```bash
curl -s -o /dev/null -w "HTTP %{http_code} · %{size_download}\n" http://localhost:4747/styles.css
```
Expected: `HTTP 200` and `size_download` larger than before (was ~30600). Should be ~33000+.

Then in a browser, hard-reload `http://localhost:4747/` and confirm the existing page still looks correct (no visual regression from the additions — the new rules only target classes that don't exist on the page yet).

- [ ] **Step 1.4: Commit**

```bash
cd ~/eidetic-labs
git add styles.css
git -c user.email=26172112+offbyonce@users.noreply.github.com -c user.name=offbyonce commit -m "$(cat <<'EOF'
CSS: scaffold .product-feature, marks, composition, mark utilities

No visual changes yet — these classes have no consumers on the page.
Lands the structural styles for §02 Stigmem, §03 Craik, §04 Composition,
and the .mark-r/.mark-l terminal-trace utilities so subsequent
markup tasks can ship in isolated diffs.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Header navigation (4 → 6 items)

**Files:**
- Modify: `index.html` — `.site-nav` block (currently around lines 53–58)

**Spec section:** "Header nav (changed)"

- [ ] **Step 2.1: Locate the current nav block**

Open `index.html` and find:

```html
<nav class="site-nav" aria-label="Primary navigation">
  <a href="#premise"><span aria-hidden="true">§01</span> Premise</a>
  <a href="#products"><span aria-hidden="true">§02</span> Products</a>
  <a href="#principles"><span aria-hidden="true">§03</span> Principles</a>
  <a href="#lab"><span aria-hidden="true">§04</span> The lab</a>
</nav>
```

- [ ] **Step 2.2: Replace with the new nav**

Replace the four `<a>` lines with these six:

```html
<nav class="site-nav" aria-label="Primary navigation">
  <a href="#premise"><span aria-hidden="true">§01</span> Premise</a>
  <a href="#stigmem"><span aria-hidden="true">§02</span> Stigmem</a>
  <a href="#craik"><span aria-hidden="true">§03</span> Craik</a>
  <a href="#composition"><span aria-hidden="true">§04</span> Composition</a>
  <a href="#principles"><span aria-hidden="true">§05</span> Principles</a>
  <a href="#lab"><span aria-hidden="true">§06</span> The lab</a>
</nav>
```

- [ ] **Step 2.3: Verify**

Run:
```bash
curl -s http://localhost:4747/ | grep -c 'href="#'
```
Expected: at least `6` (header) — there are also links elsewhere on the page so the count will be higher; the key thing is that all six new anchors appear.

Then:
```bash
curl -s http://localhost:4747/ | grep -E '#stigmem|#craik|#composition' | head -5
```
Expected: three matching lines.

In a browser, hard-reload and confirm the header now shows six numbered items. Clicking each will currently scroll nowhere (the target sections don't exist yet) except `#premise`, `#principles`, `#lab` — that's expected. Subsequent tasks add the missing anchors.

- [ ] **Step 2.4: Commit**

```bash
cd ~/eidetic-labs
git add index.html
git -c user.email=26172112+offbyonce@users.noreply.github.com -c user.name=offbyonce commit -m "Header nav: 4→6 items, renumber for new section order

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Hero updates (lede + CTAs + stats + label hint)

**Files:**
- Modify: `index.html` — `.hero__copy` block (lede, actions, stats) and the `RUNTIME` label inside the hero SVG

**Spec section:** "Hero §00 (changed)"

- [ ] **Step 3.1: Update the hero lede**

Find:

```html
<p class="hero__lede">
  <strong>Eidetic</strong> — recalled with photographic clarity. We build the substrate
  that lets coding agents remember, justify, coordinate, and hand off work across
  sessions, runners, and reviewers. The result is software work that survives
  its own run.
</p>
```

Replace with:

```html
<p class="hero__lede">
  <strong>Eidetic</strong> — recalled with photographic clarity. We build two
  pieces of the agent stack: <strong>Stigmem</strong>, a federated memory fabric,
  and <strong>Craik</strong>, a governed agent runtime. Each stands alone.
  Together, they compose.
</p>
```

- [ ] **Step 3.2: Update the hero CTAs (two → three buttons)**

Find:

```html
<div class="hero__actions">
  <a class="button button--primary" href="#products">
    See what we build
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </a>
  <a class="button button--ghost" href="https://craik.eidetic-labs.com">
    Visit Craik
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </a>
</div>
```

Replace with:

```html
<div class="hero__actions">
  <a class="button button--primary" href="#stigmem">
    See what we build
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </a>
  <a class="button button--ghost" href="https://stigmem.dev">
    Visit Stigmem
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </a>
  <a class="button button--ghost" href="https://craik.eidetic-labs.com">
    Visit Craik
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </a>
</div>
```

- [ ] **Step 3.3: Update the hero stats `Focus` row**

Find:

```html
<div>
  <dt>Focus</dt>
  <dd>Agent runtime · governance</dd>
</div>
```

Replace with:

```html
<div>
  <dt>Focus</dt>
  <dd>Stigmem · Craik</dd>
</div>
```

- [ ] **Step 3.4: Update the hero E-mark `RUNTIME` label hint**

Find (inside the `.mark-svg__labels` group):

```html
<g transform="translate(532 548)" class="mark-label">
  <rect x="-58" y="-16" width="116" height="32" rx="6" />
  <text y="-1" text-anchor="middle"><tspan class="mark-label__t">RUNTIME</tspan></text>
  <text y="11" text-anchor="middle" class="mark-label__h">case file</text>
</g>
```

Change the hint text. Replace the last `<text>` line with:

```html
              <text y="11" text-anchor="middle" class="mark-label__h">craik · case files</text>
```

(Preserve the leading indentation that surrounds the line — match the existing whitespace.)

- [ ] **Step 3.5: Verify**

Run:
```bash
curl -s http://localhost:4747/ | grep -c 'href="https://stigmem.dev"'
```
Expected: `1` (the new hero CTA).

```bash
curl -s http://localhost:4747/ | grep 'Stigmem · Craik'
```
Expected: one line.

```bash
curl -s http://localhost:4747/ | grep 'craik · case files'
```
Expected: one line.

Take a screenshot to confirm visual layout:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --hide-scrollbars --window-size=1440,900 \
  --virtual-time-budget=2000 \
  --screenshot=/tmp/eidetic-shots/task3-hero.png \
  http://localhost:4747/ 2>/dev/null
```

Read `/tmp/eidetic-shots/task3-hero.png` and confirm the hero shows: three CTA buttons, the lede mentioning Stigmem AND Craik, the stats row showing "Stigmem · Craik."

- [ ] **Step 3.6: Commit**

```bash
cd ~/eidetic-labs
git add index.html
git -c user.email=26172112+offbyonce@users.noreply.github.com -c user.name=offbyonce commit -m "Hero: name both products in lede, add Stigmem CTA, update stats

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: §01 Premise — new resolution + new ledger

**Files:**
- Modify: `index.html` — `.premise__resolution` paragraph and the `.premise__ledger` list

**Spec section:** "§01 Premise (lightly changed)"

- [ ] **Step 4.1: Update the resolution paragraph**

Find:

```html
<p class="premise__resolution">
  An agent is useful at organizational scale only when it can
  <span class="premise__verb">remember</span>,
  <span class="premise__verb">justify</span>,
  <span class="premise__verb">coordinate</span>,
  <span class="premise__verb">dispute</span>, and
  <span class="premise__verb">hand off</span> its work — across sessions,
  tools, runners, and the humans who review it. Eidetic Labs builds that
  substrate.
</p>
```

Replace with:

```html
<p class="premise__resolution">
  An agent is useful at organizational scale only when it can
  <span class="premise__verb">remember</span>,
  <span class="premise__verb">justify</span>,
  <span class="premise__verb">coordinate</span>,
  <span class="premise__verb">dispute</span>, and
  <span class="premise__verb">hand off</span> its work — across sessions,
  tools, runners, and the humans who review it. Eidetic Labs builds that
  substrate as two composable pieces: <strong>Stigmem</strong> for the
  memory, <strong>Craik</strong> for the run.
</p>
```

- [ ] **Step 4.2: Replace the failure-mode ledger**

Find the entire `<ol class="premise__ledger">` block (4 `<li>` items, currently around lines 250–283). Replace the four `<li>` entries with these:

```html
<ol class="premise__ledger" aria-label="The asymmetric decay we work on">
  <li>
    <span class="premise__ledger-num">01</span>
    <span class="premise__ledger-from">Models advance</span>
    <span class="premise__ledger-arrow" aria-hidden="true">→</span>
    <span class="premise__ledger-to">Memory regresses.</span>
  </li>
  <li>
    <span class="premise__ledger-num">02</span>
    <span class="premise__ledger-from">Tools multiply</span>
    <span class="premise__ledger-arrow" aria-hidden="true">→</span>
    <span class="premise__ledger-to">Trust thins.</span>
  </li>
  <li>
    <span class="premise__ledger-num">03</span>
    <span class="premise__ledger-from">Agents proliferate</span>
    <span class="premise__ledger-arrow" aria-hidden="true">→</span>
    <span class="premise__ledger-to">Handoffs vanish.</span>
  </li>
  <li>
    <span class="premise__ledger-num">04</span>
    <span class="premise__ledger-from">Runs complete</span>
    <span class="premise__ledger-arrow" aria-hidden="true">→</span>
    <span class="premise__ledger-to">Evidence dissolves.</span>
  </li>
</ol>
```

(The `aria-label` on the `<ol>` is also updated to match the new framing.)

- [ ] **Step 4.3: Verify**

Run:
```bash
curl -s http://localhost:4747/ | grep -c 'premise__ledger-to'
```
Expected: `4`.

```bash
curl -s http://localhost:4747/ | grep -E 'Memory regresses|Trust thins|Handoffs vanish|Evidence dissolves' | wc -l
```
Expected: `4`.

```bash
curl -s http://localhost:4747/ | grep -c 'Sessions end\|Authority drifts\|Memory is mocked\|Evidence is lost'
```
Expected: `0` (old ledger text should be fully removed).

Take a screenshot of the premise section:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --hide-scrollbars --window-size=1440,1800 \
  --virtual-time-budget=2000 \
  --screenshot=/tmp/eidetic-shots/task4-premise.png \
  http://localhost:4747/ 2>/dev/null
```

Read `/tmp/eidetic-shots/task4-premise.png` and confirm the premise section's resolution paragraph names both products and the ledger shows the four new rows.

- [ ] **Step 4.4: Commit**

```bash
cd ~/eidetic-labs
git add index.html
git -c user.email=26172112+offbyonce@users.noreply.github.com -c user.name=offbyonce commit -m "Premise: name both products in resolution, replace ledger

The previous failure-mode ledger was lifted from craik.eidetic-labs.com;
the parent page now gets its own 'industry-trend → opposite-decay'
framing to differentiate from the child site.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Remove the current §02 Products section

**Files:**
- Modify: `index.html` — delete the entire `<section class="section products" id="products">` block

**Spec section:** "Removed from the page"

**Why this is its own task:** Clean, reviewable deletion diff. The next three tasks then add the replacement content.

- [ ] **Step 5.1: Locate the block**

Find the opening tag `<section class="section products" id="products" aria-labelledby="products-title">` (currently around line 297) and its matching closing `</section>` (currently around line 401). The block contains the section head ("What we build, shipped in layers."), the Craik flagship `<article>`, and the `<div class="product-row">` containing the Stigmem and "What's next" cards.

- [ ] **Step 5.2: Delete the entire block**

Remove every line from the opening `<section class="section products" ...>` through the matching closing `</section>` inclusive.

- [ ] **Step 5.3: Verify deletion**

Run:
```bash
curl -s http://localhost:4747/ | grep -c 'class="section products"'
```
Expected: `0`.

```bash
curl -s http://localhost:4747/ | grep -c 'cap--feature\|product--flagship\|product--small\|product--upcoming'
```
Expected: `0` (all the inner classes are gone too).

```bash
curl -s http://localhost:4747/ | grep 'pip install craik'
```
Expected: empty output — the Craik install snippet that lived in the old section is gone; Task 7 will re-add it inside §03.

Reload the page in a browser. The header nav links `#stigmem`, `#craik`, `#composition` still scroll nowhere (correct — those sections don't exist yet). The page should now jump directly from §01 Premise to §03/§04 (Principles/Lab in their old numbering — they haven't been visually renumbered yet since they have no `data-num` attribute, just the visible "03"/"04" eyebrow text which the next tasks won't touch until task 9 catches them).

- [ ] **Step 5.4: Commit**

```bash
cd ~/eidetic-labs
git add index.html
git -c user.email=26172112+offbyonce@users.noreply.github.com -c user.name=offbyonce commit -m "Remove old §02 Products section

Superseded by the new §02 Stigmem, §03 Craik, and §04 Composition
sections added in the following commits.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Add §02 Stigmem section

**Files:**
- Modify: `index.html` — insert a new `<section>` block immediately after the closing `</section>` of `.premise` (where the old products section used to start)

**Spec section:** "§02 Stigmem (new)"

- [ ] **Step 6.1: Locate the insertion point**

Find the closing `</section>` of the `.premise` block (immediately after the `</ol>` of `.premise__ledger`, currently around the line where the old products section started). Insert the new content immediately after that closing tag.

- [ ] **Step 6.2: Insert the §02 Stigmem markup**

Add the following block at the insertion point:

```html
      <!-- ───────────── §02 STIGMEM ───────────── -->
      <section class="product-feature" id="stigmem" aria-labelledby="stigmem-title">
        <figure class="product-feature__stage" aria-label="The Stigmem mark — federated memory fabric">
          <svg viewBox="0 0 400 400" role="img" aria-labelledby="stigmem-svg-title">
            <title id="stigmem-svg-title">Stigmem mark: lavender disc with orbiting fact tokens</title>
            <defs>
              <radialGradient id="stigmem-halo" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stop-color="#B4ACE6" stop-opacity="0.55" />
                <stop offset="55%" stop-color="#B4ACE6" stop-opacity="0.10" />
                <stop offset="100%" stop-color="#B4ACE6" stop-opacity="0" />
              </radialGradient>
              <pattern id="stigmem-dotgrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="var(--ink-soft)" fill-opacity="0.18" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="400" height="400" fill="url(#stigmem-dotgrid)" opacity="0.55" />
            <circle cx="200" cy="200" r="170" class="stigmem-mark__halo" />
            <circle cx="200" cy="200" r="155" class="stigmem-mark__orbit stigmem-mark__orbit--1" />
            <circle cx="200" cy="200" r="115" class="stigmem-mark__orbit stigmem-mark__orbit--2" />

            <!-- The disc itself — Stigmem's geometric mark -->
            <circle cx="200" cy="200" r="64" class="stigmem-mark__disc stigmem-mark__pulse" />

            <!-- Orbiting fact tokens -->
            <g class="stigmem-mark__token" font-family="var(--font-mono)" font-size="10">
              <g transform="translate(72 120)">
                <rect x="-32" y="-13" width="64" height="26" rx="5" />
                <text y="4" text-anchor="middle" class="t-label">ENTITY</text>
              </g>
              <g transform="translate(328 120)">
                <rect x="-34" y="-13" width="68" height="26" rx="5" />
                <text y="4" text-anchor="middle" class="t-label">RELATION</text>
              </g>
              <g transform="translate(328 280)">
                <rect x="-28" y="-13" width="56" height="26" rx="5" />
                <text y="4" text-anchor="middle" class="t-label">VALUE</text>
              </g>
              <g transform="translate(72 280)">
                <rect x="-28" y="-13" width="56" height="26" rx="5" />
                <text y="4" text-anchor="middle" class="t-label">SCOPE</text>
              </g>
            </g>
          </svg>
        </figure>

        <div class="product-feature__copy">
          <header class="product-feature__head">
            <p class="eyebrow"><span class="eyebrow__num">02</span> Stigmem</p>
            <h2 id="stigmem-title">The Federated Knowledge <em>Fabric.</em></h2>
          </header>
          <p class="product-feature__lede">
            A shared memory layer for AI agents. Typed, provenance-tagged
            facts that travel across tools, platforms, and organizations.
          </p>
          <ul class="product-feature__features" role="list">
            <li>Typed facts with provenance and scope</li>
            <li>Federation under signed handshakes</li>
            <li>Contradictions surfaced, not overwritten</li>
            <li>Open spec + reference implementation</li>
          </ul>
          <div class="product-feature__actions">
            <a class="button button--primary" href="https://stigmem.dev">
              Visit stigmem.dev
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
            <code class="install-snippet" aria-label="Install command">
              <span class="install-snippet__prompt">$</span>
              <span class="install-snippet__cmd">pip install stigmem</span>
              <button type="button" class="install-snippet__copy" data-copy="pip install stigmem" aria-label="Copy install command">
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                  <rect x="8" y="8" width="11" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.6" />
                  <path d="M5 16V5a2 2 0 0 1 2-2h9" fill="none" stroke="currentColor" stroke-width="1.6" />
                </svg>
              </button>
            </code>
          </div>
          <p class="product-feature__status">preview alpha · v0.9.0a2 · Apache-2.0</p>
        </div>
      </section>
```

Note: this section is **not** `.product-feature--reverse` — the visual is on the left because of the source order (figure first). Task 7 (Craik) will use the `--reverse` modifier to flip.

- [ ] **Step 6.3: Verify**

Run:
```bash
curl -s http://localhost:4747/ | grep -c 'id="stigmem"'
```
Expected: `1`.

```bash
curl -s http://localhost:4747/ | grep -c 'href="https://stigmem.dev"'
```
Expected: `2` (one in hero CTA, one in §02 button).

```bash
curl -s http://localhost:4747/ | grep -c 'pip install stigmem'
```
Expected: `2` (one in the visible snippet, one in the `data-copy` attribute).

Take a screenshot at full page height so we can see §02 land:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --hide-scrollbars --window-size=1440,3600 \
  --virtual-time-budget=2500 \
  --screenshot=/tmp/eidetic-shots/task6-stigmem.png \
  http://localhost:4747/#stigmem 2>/dev/null
```

Read `/tmp/eidetic-shots/task6-stigmem.png`. Confirm: §02 Stigmem section is visible with the lavender disc visual on the left, the eyebrow "§02 Stigmem", title "The Federated Knowledge Fabric.", four bullets, the "Visit stigmem.dev" button, the install snippet, and the status line.

- [ ] **Step 6.4: Commit**

```bash
cd ~/eidetic-labs
git add index.html
git -c user.email=26172112+offbyonce@users.noreply.github.com -c user.name=offbyonce commit -m "Add §02 Stigmem section

Full-width product feature with the lavender-disc mark visual on the
left and copy on the right. CTAs link to stigmem.dev and 'pip install
stigmem'. Status line declares the preview-alpha license honestly.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: Add §03 Craik section (mirrored layout)

**Files:**
- Modify: `index.html` — insert another `<section>` immediately after the §02 Stigmem section

**Spec section:** "§03 Craik (new)"

- [ ] **Step 7.1: Locate the insertion point**

Insert immediately after the closing `</section>` of the §02 Stigmem block you just added.

- [ ] **Step 7.2: Insert the §03 Craik markup**

```html
      <!-- ───────────── §03 CRAIK ───────────── -->
      <section class="product-feature product-feature--reverse" id="craik" aria-labelledby="craik-title">
        <div class="product-feature__copy">
          <header class="product-feature__head">
            <p class="eyebrow"><span class="eyebrow__num">03</span> Craik</p>
            <h2 id="craik-title">The Agent Operating <em>Layer.</em></h2>
          </header>
          <p class="product-feature__lede">
            Shared project state, policy-bound authority, durable receipts,
            and handoffs the next agent can trust. Runner-neutral: Codex,
            Claude, Gemini, direct OpenAI &amp; Anthropic, OAI-compatible
            locals.
          </p>
          <ul class="product-feature__features" role="list">
            <li>Case files &amp; shared project memory</li>
            <li>Receipted authority &amp; policy envelopes</li>
            <li>Durable, machine-readable handoffs</li>
            <li>One governance model across runners</li>
          </ul>
          <div class="product-feature__actions">
            <a class="button button--primary" href="https://craik.eidetic-labs.com">
              Visit craik.eidetic-labs.com
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
            <code class="install-snippet" aria-label="Install command">
              <span class="install-snippet__prompt">$</span>
              <span class="install-snippet__cmd">pip install craik</span>
              <button type="button" class="install-snippet__copy" data-copy="pip install craik" aria-label="Copy install command">
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                  <rect x="8" y="8" width="11" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.6" />
                  <path d="M5 16V5a2 2 0 0 1 2-2h9" fill="none" stroke="currentColor" stroke-width="1.6" />
                </svg>
              </button>
            </code>
          </div>
          <p class="product-feature__status">governed MVP · 0.1.x · MIT</p>
        </div>

        <figure class="product-feature__stage" aria-label="The Craik mark — agent operating layer">
          <svg viewBox="0 0 400 400" role="img" aria-labelledby="craik-svg-title">
            <title id="craik-svg-title">Craik mark: open arc with a lavender dot and orbiting nodes</title>
            <defs>
              <radialGradient id="craik-halo" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stop-color="#B4ACE6" stop-opacity="0.50" />
                <stop offset="55%" stop-color="#B4ACE6" stop-opacity="0.08" />
                <stop offset="100%" stop-color="#B4ACE6" stop-opacity="0" />
              </radialGradient>
              <pattern id="craik-dotgrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="var(--ink-soft)" fill-opacity="0.18" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="400" height="400" fill="url(#craik-dotgrid)" opacity="0.55" />
            <circle cx="200" cy="200" r="170" class="craik-mark__halo" />
            <circle cx="200" cy="200" r="155" class="craik-mark__orbit craik-mark__orbit--1" />

            <!-- The C arc + lavender center dot -->
            <g transform="translate(200 200)">
              <path d="M 60 -25 A 65 65 0 1 0 60 25" class="craik-mark__arc" />
              <circle cx="0" cy="0" r="20" class="craik-mark__dot craik-mark__pulse" />
            </g>

            <!-- Orbital node chips -->
            <g class="craik-mark__node" font-family="var(--font-mono)" font-size="10">
              <g transform="translate(80 90)">
                <rect x="-34" y="-13" width="68" height="26" rx="5" />
                <text y="4" text-anchor="middle" class="n-label">CASE_FILE</text>
              </g>
              <g transform="translate(330 200)">
                <rect x="-28" y="-13" width="56" height="26" rx="5" />
                <text y="4" text-anchor="middle" class="n-label">POLICY</text>
              </g>
              <g transform="translate(80 310)">
                <rect x="-30" y="-13" width="60" height="26" rx="5" />
                <text y="4" text-anchor="middle" class="n-label">RECEIPT</text>
              </g>
            </g>
          </svg>
        </figure>
      </section>
```

- [ ] **Step 7.3: Verify**

```bash
curl -s http://localhost:4747/ | grep -c 'id="craik"'
```
Expected: `1`.

```bash
curl -s http://localhost:4747/ | grep -c 'product-feature--reverse'
```
Expected: `1` (only Craik uses the reverse modifier).

```bash
curl -s http://localhost:4747/ | grep -c 'pip install craik'
```
Expected: `2` (snippet text + data-copy attribute).

Screenshot:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --hide-scrollbars --window-size=1440,4200 \
  --virtual-time-budget=2500 \
  --screenshot=/tmp/eidetic-shots/task7-craik.png \
  http://localhost:4747/#craik 2>/dev/null
```

Read `/tmp/eidetic-shots/task7-craik.png`. Confirm: §03 Craik section is visible with the dark C-mark visual on the **right** (mirrored from §02), copy on the left, eyebrow "§03 Craik", title "The Agent Operating Layer.", four bullets, "Visit craik.eidetic-labs.com" button, install snippet, status line.

Z-pattern check: §02's visual is on the left, §03's visual is on the right. The eye should move down-and-across as you scroll.

- [ ] **Step 7.4: Commit**

```bash
cd ~/eidetic-labs
git add index.html
git -c user.email=26172112+offbyonce@users.noreply.github.com -c user.name=offbyonce commit -m "Add §03 Craik section (mirror layout)

Full-width product feature with the C-mark visual on the right and
copy on the left — z-pattern flow with §02 Stigmem.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: Add §04 Composition section

**Files:**
- Modify: `index.html` — insert the composition `<section>` after the §03 Craik section

**Spec section:** "§04 Composition (new)"

- [ ] **Step 8.1: Insert the §04 Composition markup**

Immediately after the §03 Craik closing `</section>`, add:

```html
      <!-- ───────────── §04 COMPOSITION ───────────── -->
      <section class="section composition" id="composition" aria-labelledby="composition-title">
        <header class="section__head section__head--center composition__head">
          <p class="eyebrow"><span class="eyebrow__num">04</span> Composition</p>
          <h2 id="composition-title">One fact. <em>Two products.</em></h2>
        </header>

        <p class="composition__framing">
          Stigmem holds the truth. Craik governs the act. The interface is small
          and explicit: Craik reads facts as evidence, writes receipts back as
          facts, and surfaces contradictions to the inbox they share.
        </p>

        <article class="terminal composition__terminal" aria-label="One fact moving through Stigmem and Craik">
          <header class="terminal__chrome">
            <span class="terminal__dot terminal__dot--r"></span>
            <span class="terminal__dot terminal__dot--y"></span>
            <span class="terminal__dot terminal__dot--g"></span>
            <span class="terminal__path">~/repos/product · main</span>
          </header>
          <div class="terminal__body">
            <p><span class="prompt">$</span> stigmem assert <span class="install-snippet__cmd">migration_0042.row_count</span> = 12M</p>
            <p class="comment">→ fact_8a · signed · scope=team-dba</p>
            <p><span class="prompt">$</span> craik case build <span class="install-snippet__cmd">task_042</span></p>
            <p class="comment">→ pulls fact_8a · 12 evidence refs</p>
            <p><span class="prompt">$</span> craik run <span class="install-snippet__cmd">task_042</span> --policy strict.write</p>
            <p class="comment">→ <span class="mark-r">contradiction</span>: stigmem fact_91 differs</p>
            <p class="comment">→ surfaced to <span class="mark-l">reviewer:@dba</span></p>
          </div>
        </article>

        <p class="composition__resolution">
          Adopt Stigmem alone for cross-platform memory. Adopt Craik alone in
          its degraded local mode. Adopt both for the full loop — the seams
          are documented, the contracts are typed.
        </p>
      </section>
```

- [ ] **Step 8.2: Verify**

```bash
curl -s http://localhost:4747/ | grep -c 'id="composition"'
```
Expected: `1`.

```bash
curl -s http://localhost:4747/ | grep -c 'class="mark-r"'
```
Expected: `1`.

```bash
curl -s http://localhost:4747/ | grep -c 'class="mark-l"'
```
Expected: `1`.

```bash
curl -s http://localhost:4747/ | grep -E 'stigmem assert|craik case build|craik run' | wc -l
```
Expected: `3`.

Screenshot:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --hide-scrollbars --window-size=1440,5000 \
  --virtual-time-budget=2500 \
  --screenshot=/tmp/eidetic-shots/task8-composition.png \
  http://localhost:4747/#composition 2>/dev/null
```

Read `/tmp/eidetic-shots/task8-composition.png`. Confirm: §04 Composition visible with centered title "One fact. Two products.", framing paragraph, the dark terminal showing three commands (stigmem assert / craik case build / craik run), the contradiction word highlighted in subtle red, `reviewer:@dba` in a lavender pill, and the resolution paragraph below.

- [ ] **Step 8.3: Commit**

```bash
cd ~/eidetic-labs
git add index.html
git -c user.email=26172112+offbyonce@users.noreply.github.com -c user.name=offbyonce commit -m "Add §04 Composition section with terminal-trace example

Shows one fact moving through both products: assert in Stigmem,
case file build in Craik, run that surfaces a contradiction. Uses
.mark-r / .mark-l utilities added in Task 1 for inline highlights.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 9: Footer Stigmem link + section renumbering

**Files:**
- Modify: `index.html` — footer Stigmem link in `.site-footer__nav`; the `eyebrow__num` values in §05 Principles and §06 The lab

**Spec section:** "Footer (changed)" + the "Page outline (new)" §-number table

The spec's page outline shows §05 Principles and §06 The lab. The eyebrow numbers in those two sections were hardcoded as `03` and `04` in the original page and need to renumber to match the new outline.

- [ ] **Step 9.1: Update the footer Stigmem link**

Find:

```html
<a href="https://craik.eidetic-labs.com">Craik</a>
<a href="#products">Stigmem</a>
```

Replace the Stigmem line with:

```html
<a href="https://stigmem.dev">Stigmem</a>
```

(Keep the Craik link unchanged.)

- [ ] **Step 9.2: Renumber the Principles section eyebrow (03 → 05)**

Find:

```html
<p class="eyebrow"><span class="eyebrow__num">03</span> Principles</p>
```

Replace with:

```html
<p class="eyebrow"><span class="eyebrow__num">05</span> Principles</p>
```

- [ ] **Step 9.3: Renumber the Lab section eyebrow (04 → 06)**

Find:

```html
<p class="eyebrow"><span class="eyebrow__num">04</span> The lab</p>
```

Replace with:

```html
<p class="eyebrow"><span class="eyebrow__num">06</span> The lab</p>
```

- [ ] **Step 9.4: Verify**

Run:
```bash
curl -s http://localhost:4747/ | grep -c 'href="#products"'
```
Expected: `0` (the dead anchor is gone).

```bash
curl -s http://localhost:4747/ | grep -c 'href="https://stigmem.dev"'
```
Expected: `3` (hero CTA + §02 button + footer link).

```bash
curl -s http://localhost:4747/ | grep -oE 'eyebrow__num">0[1-6]<' | sort | uniq -c
```
Expected output:
```
      1 eyebrow__num">01<
      1 eyebrow__num">02<
      1 eyebrow__num">03<
      1 eyebrow__num">04<
      1 eyebrow__num">05<
      1 eyebrow__num">06<
```
(Exactly six eyebrow numbers, one each from 01 to 06, no duplicates and no gaps.)

- [ ] **Step 9.5: Commit**

```bash
cd ~/eidetic-labs
git add index.html
git -c user.email=26172112+offbyonce@users.noreply.github.com -c user.name=offbyonce commit -m "Footer + renumbering: Stigmem→stigmem.dev, Principles=05, Lab=06

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 10: Final verification pass

**No file changes.** Pure verification.

**Spec section:** "Acceptance criteria"

- [ ] **Step 10.1: Light-mode full-page screenshot**

```bash
mkdir -p /tmp/eidetic-shots
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --hide-scrollbars --window-size=1440,5400 --virtual-time-budget=3000 \
  --screenshot=/tmp/eidetic-shots/final-light.png \
  http://localhost:4747/ 2>/dev/null
```

Read `/tmp/eidetic-shots/final-light.png`. Note: the hero uses `min-height: 100vh` so on a 5400px-tall window the hero will fill the viewport and lower sections won't appear in this single capture. That's expected for this verification mode — use the per-section anchor URLs in the next steps for the lower sections.

- [ ] **Step 10.2: Section-by-section anchor screenshots (light)**

```bash
for ANCHOR in stigmem craik composition principles lab; do
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
    --hide-scrollbars --window-size=1440,900 --virtual-time-budget=2500 \
    --screenshot=/tmp/eidetic-shots/final-light-${ANCHOR}.png \
    "http://localhost:4747/#${ANCHOR}" 2>/dev/null
done
ls -la /tmp/eidetic-shots/final-light-*.png
```

Read each `/tmp/eidetic-shots/final-light-<anchor>.png` and confirm the section renders correctly with no layout breaks, no clipped content, and proper visual hierarchy.

- [ ] **Step 10.3: Dark-mode screenshots**

The page picks up theme from `prefers-color-scheme` plus localStorage. The headless Chrome process uses the system color scheme by default; force dark mode by passing the flag:

```bash
for ANCHOR in "" "stigmem" "craik" "composition"; do
  NAME=${ANCHOR:-hero}
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
    --hide-scrollbars --window-size=1440,900 --virtual-time-budget=2500 \
    --force-dark-mode --enable-features=WebContentsForceDark \
    --screenshot=/tmp/eidetic-shots/final-dark-${NAME}.png \
    "http://localhost:4747/${ANCHOR:+#$ANCHOR}" 2>/dev/null
done
ls -la /tmp/eidetic-shots/final-dark-*.png
```

Note: Chrome's `--force-dark-mode` doesn't affect `prefers-color-scheme` queries directly. If the dark screenshots come out in light mode, the page's theme script reads `prefers-color-scheme` at boot — the headless Chrome may report `light` regardless of the flag. In that case, a fallback is to manually flip the data-theme attribute:

```bash
# Fallback: open in a browser, click the theme toggle, take a manual screenshot
open http://localhost:4747/
# Ask the user to click the theme toggle and verify dark mode visually
```

Either way, confirm both themes render correctly.

- [ ] **Step 10.4: Mobile screenshot (414×900 viewport)**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --hide-scrollbars --window-size=414,2400 --virtual-time-budget=3000 \
  --screenshot=/tmp/eidetic-shots/final-mobile.png \
  http://localhost:4747/ 2>/dev/null
```

Read `/tmp/eidetic-shots/final-mobile.png`. Confirm the page stacks cleanly: header collapses (no nav row), hero stacks vertically, §02 and §03 product features each collapse to single column (visual stacked above copy), §04 composition stays readable, footer rearranges to single column.

- [ ] **Step 10.5: Interactive checks (manual)**

Open `http://localhost:4747/` in a real browser and verify:

1. Theme toggle in the header switches between light and dark. Refresh — the choice persists (localStorage).
2. Each header nav link scrolls to the right section (Premise / Stigmem / Craik / Composition / Principles / Lab).
3. The three hero CTAs:
   - "See what we build" scrolls to §02 Stigmem
   - "Visit Stigmem" opens stigmem.dev in a new tab (or same tab — both are acceptable)
   - "Visit Craik" opens craik.eidetic-labs.com
4. Both install-snippet copy buttons (Stigmem and Craik) actually copy `pip install stigmem` / `pip install craik` to the clipboard. Paste somewhere to confirm.
5. Footer Stigmem link goes to stigmem.dev (not `#products`).
6. No console errors in DevTools.

- [ ] **Step 10.6: Tag the verification**

If everything passes, no additional commit needed — this task is verification only. Note in the next status update that the implementation is verified.

If anything fails, return to the relevant task to fix, then re-run this verification pass.

---

## Final state

After all ten tasks, the branch `spec/two-product-elevation` should have these commits on top of the original spec commit:

```
* CSS: scaffold .product-feature, marks, composition, mark utilities
* Header nav: 4→6 items, renumber for new section order
* Hero: name both products in lede, add Stigmem CTA, update stats
* Premise: name both products in resolution, replace ledger
* Remove old §02 Products section
* Add §02 Stigmem section
* Add §03 Craik section (mirror layout)
* Add §04 Composition section with terminal-trace example
* Footer + renumbering: Stigmem→stigmem.dev, Principles=05, Lab=06
```

When the user is ready, they (or you, with permission) push the branch and open a PR / merge to `main`. The PR description should reference the spec doc at `docs/superpowers/specs/2026-05-19-stigmem-craik-elevation-design.md`.
