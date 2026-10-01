# Two Truths — Project Steering

Guidance for working in this repo. `SPEC.md` is the full product spec; this file
captures the rules and conventions to follow on every change.

## What this is

A "two truths and a lie" game (React Native / Expo, runs on web too). Each round
shows three statements, exactly one is a lie; the player taps the one they think
is false. Two modes: **Solo** (curated, finite content sampler) and **Player**
(create-your-own, saved on-device — the endless, replayable heart of the app).

Stack: Expo ~54, React Native 0.81, React 19, TypeScript. Persistence via
`@react-native-async-storage/async-storage`.

## Design principles

- **Simplest solution wins.** If a change starts getting complicated, stop and
  rethink for something simpler. There is no navigation library, no state
  manager — don't add one without a strong reason.
- **Make invalid states impossible.** Model data so bad states can't be
  represented; guard at the boundaries (see the load-time guard in `storage.ts`).
- **Write code that just works.** Handle real edge cases, verify by reasoning.

## Core invariant

Every `Round` has exactly **3 statements** with exactly **1** marked
`isLie: true`. This holds for both curated and player-created rounds. Any code
that creates, loads, or edits rounds must preserve it. `storage.ts` filters out
custom rounds that violate it rather than trusting stored data.

Types live in `src/types.ts`: `Statement { text, isLie }`, `Round { id, topic, statements[] }`.

## Architecture

- `App.tsx` owns all navigation via a single `screen` state union — a
  hand-rolled router. Add a screen by extending the union and the `switch`, not
  by pulling in a nav library.
- Screens live in `src/`: `HomeScreen`, `CategoryScreen`, `GameScreen`,
  `MyRoundsScreen`, `CreateRoundScreen`.
- `GameScreen` shuffles both round order (per game) and statement order (per
  round) with a non-mutating Fisher-Yates.

## Content rules (adding / editing rounds)

- **Accuracy is non-negotiable.** Every truth must be genuinely true and every
  lie genuinely false. Prefer well-documented popular myths for lies. A wrong
  "fact" breaks player trust fast — fact-check before adding.
- Curated content lives in `src/rounds.ts`, grouped into category arrays that
  are spread into `ALL_ROUNDS`. To add a category, make a new array and spread
  it in there.
- **Keep `rounds.json` in sync with `src/rounds.ts`.** `rounds.json` is the
  portable source of truth intended to drop into a Swift `Codable` struct for
  the planned native rewrite. If you change curated content, update both.
- **Grow content deliberately, never by bulk import.** Do not pull curated
  rounds from external trivia APIs (e.g. OpenTDB, The Trivia API) at runtime or
  as an automated import. Those sources carry licensing constraints (OpenTDB is
  CC BY-SA; The Trivia API's free tier is noncommercial) and crowd-sourced
  accuracy risk. Use them only as brainstorming inspiration. New rounds are
  hand-written and fact-checked against reliable sources, reviewed before they
  land, so the content stays ours, accurate, and offline-friendly.

### Legal / IP guardrails

Not legal advice, but the rules we work by to avoid infringement.

**Keep me honest on legal/IP.** Proactively flag anything that raises legal or
IP risk as we work — new content that quotes or leans on copyrighted works,
trademarked names creeping back into labels/branding, license terms on any data
we bring in, App Store IP-review exposure. Don't wait to be asked and don't
soft-pedal it. This app is intended to be monetized on the App Store, so err on
the side of raising concerns early. Still recommend a real IP-attorney consult
before launch.

- **Facts are free; expression is not.** Individual true facts aren't
  copyrightable, so stating verifiable facts in our own words is safe. Never
  copy someone else's phrasing verbatim/near-verbatim, and never copy an entire
  external set or compilation of questions.
- **Write everything in our own words.** This is what keeps the content ours and
  keeps us clear of both copyright and third-party license terms.
- **Avoid reproducing creative expression.** No verbatim quotes, lyrics, or
  distinctive dialogue from copyrighted works — reference facts about them, not
  the works' own words.
- **Pop-culture / trademark caution (matters most because we plan to monetize
  on the App Store).** Trademarked franchise names are no longer used as category
  labels: the old Star Trek / Friends / Seinfeld / The Office categories were
  merged into **"Popular Shows"**, and Harry Potter + Movies & Pop Culture into
  **"Popular Movies"**. This removes the highest-risk branding (both for
  trademark and for App Store review). The question text still references works
  by name as factual, nominative reference, which is the lower-risk part; keep it
  factual and in our own words, with no verbatim quotes/lyrics/dialogue. Do not
  reintroduce trademarked names as category labels. Before submitting to the App
  Store, get a short IP-attorney consult since this is a paid app touching
  third-party marks.
- **If real money is involved, get a short consult with an IP attorney** — cheap
  insurance before launch.

## Visual style

Dark navy background `#0f1226`, cards `#1c2044` with border `#2a2f5a`, accent
blue `#4361ee`, gold topic text `#ffd166`, correct/green `#22c55e`, wrong/red
`#e63946`. Large bold title, rounded cards, pill buttons.

## Future direction

**Offline same-room peer-to-peer play is a core, non-negotiable requirement —
it is the reason this product exists.** Players in the same room play together
with no Wi-Fi or internet, using Apple's MultipeerConnectivity (Bluetooth +
peer-to-peer Wi-Fi).

Decision (locked): the target is a **native iOS (Swift/SwiftUI) app**, not a
website or PWA. A browser cannot do offline same-room device-to-device
discovery, so the web is disqualified as the shipping platform. The current
React Native / web version is a prototype and daily-play convenience, not the
end product. Do not propose "just ship the website" as a substitute — if it ever
comes up, the answer is no, because it guts the core P2P feature.

When touching content or the data model, keep it clean enough to port to Swift:
reuse `rounds.json`, keep the two modes and color feedback, and model network
messages as a Codable enum (one case per message type: join, start round, submit
guess, reveal, score, etc.).

## Verify

Run `npm run typecheck` after changes.
