# Two Truths — Game Spec

A "two truths and a lie" game. Each round shows three statements; exactly one is
a lie. The player taps the statement they think is the lie.

This document is a plain-English spec so the app can be rebuilt on any platform
(it currently exists as a React Native / Expo app; the intended future target is
a native iOS app in Swift/SwiftUI with offline peer-to-peer play).

## Data model

- **Statement**: `{ text: string, isLie: boolean }`
- **Round**: `{ id: string, topic: string, statements: Statement[] }`
  - Every round has exactly 3 statements, exactly one with `isLie: true`.
- Content lives in `rounds.json` (108 rounds across 16 categories). This file is
  the portable source of truth for content and drops directly into a Swift
  `Codable` struct.

Categories (with counts at time of writing): Outer Space (8), Animals (10),
Star Trek (20), Harry Potter (6), Food (6), History (5), The Human Body (5),
Geography (5), Science (5), Sports (5), Movies & Pop Culture (5), Friends (6),
Seinfeld (6), The Office (6), Music (5), Technology (5).

## Modes

The home screen offers two modes:

### Solo
- Player picks a category (or "All Categories" for a mixed game).
- Plays that category's rounds, in shuffled order.
- This is curated content — a finite sampler. It is NOT meant to be endless.

### Player (create-your-own)
- The endless, social heart of the game.
- Player writes their own three statements and marks which one is the lie.
- Rounds are saved on-device (persist between sessions).
- Player can view their rounds ("My Rounds"), play them, and delete them.
- This is what makes the app replayable forever — players fuel the content.

## Gameplay (shared by both modes)

- Within a round, the three statements are shown in shuffled order.
- Player taps one statement (their guess for the lie). First tap locks in.
- Feedback by color:
  - Correct guess (found the lie): that card turns GREEN, tagged "THE LIE ✓".
  - Wrong guess (picked a truth): that card turns RED, tagged "YOUR PICK", and
    the actual lie is revealed with a green outline, tagged "THIS WAS THE LIE".
- A result banner shows green (correct) or red (wrong) with a short message.
- Running tallies: correct (green) and wrong (red), shown in the header.
- After the last round: a summary screen with correct / wrong / accuracy %,
  a verdict line, and "Play again" (reshuffles) + return-to-menu options.
- Round ORDER is shuffled per game so sessions vary.

## Visual style

- Dark navy background (`#0f1226`), cards `#1c2044` with border `#2a2f5a`.
- Accent blue `#4361ee`, gold topic text `#ffd166`.
- Correct/green `#22c55e`, wrong/red `#e63946`.
- Large bold title, clean rounded cards, pill buttons.

## The end goal (future / native)

The long-term target is a native iOS app (Swift/SwiftUI) that supports
**offline, same-room, peer-to-peer play with no Wi-Fi** — using Apple's
MultipeerConnectivity (Bluetooth + peer-to-peer Wi-Fi), the same approach used
in the author's existing App Store apps. React Native cannot reliably deliver
that offline P2P, so the native rewrite is the intended path for multiplayer.
When rebuilding in Swift: reuse this spec + `rounds.json`, keep the two modes
and the color feedback, and model network messages as a Codable enum (one case
per message type: join, start round, submit guess, reveal, score, etc.).

## Design principles (from AGENTS.md)

- Simplest solution wins. If it gets complicated, stop and rethink simpler.
- Write code that just works: make invalid states impossible, handle real edge
  cases, verify by reasoning.
