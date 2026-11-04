# Accord — Meta Global AI Developer Hackathon submission pack

## Project summary (draft)

**Accord: Evidence to Agreement** is an agreement memory and change-preview workspace for freelancers and small teams. Agreements rarely disappear in a single dramatic breach; they drift across chat messages, late-night emails, unclear voice notes, and unconfirmed requests. Accord captures original source evidence, extracts candidate commitments using Meta Muse Glimmer 30B when configured, connects each decision to a verbatim source quote, separates new requests from existing commitments, and shows potentially affected dependencies before any change is accepted. Human confirmation is mandatory and the earlier record remains auditable.

**Track:** Indie Developer

**Problem statement:** Build for Your World

**User:** Freelancers, consultants, small creative studios, remote teams.

**One-line impact:** Stop losing the agreement behind the conversation.

## Model usage (fill with truthful results after live test)

- Meta model: Muse Glimmer 30B (`meta/muse-glimmer-30b`).
- Provider: NVIDIA NIM prototyping API at `https://integrate.api.nvidia.com/v1/chat/completions`.
- Role: Evidence-grounded commitment extraction from the original source text.
- Safety: Backend drops candidates whose quoted evidence isn't an exact substring of the input; human reviews and confirms. No AI-generated changes are automatically approved.
- **Verification before submission:** Set API key, press `Extract decisions with Muse Glimmer` on sample evidence, inspect response and save one proposal. Record this working behavior in the video.

## Product highlights

1. Original-text evidence library and source citations.
2. Human-confirmed decision ledger with separate proposed/confirmed status.
3. Contradiction detection across confirmed topic values.
4. Non-mutating before/after impact preview with dependency checklist.
5. Explicit supersession or rejection, with audit events and export.
6. Optional live Meta open-weight inference and exact-quote postvalidation.

## Three-minute demo — see `DEMO_VIDEO_SCRIPT.md` for full shot-by-shot narration

The cinematic opening, redesigned overview and guided six-scene product tour are now part of the source. A silent opening teaser is provided as a separate media file.

## Three-minute demo script

**0:00–0:20 — The pain:** “When a client says ‘Can you add a dashboard and still launch a week earlier?’, did the team agree? Accord makes the difference visible.” Show Overview with pending changes.

**0:20–0:45 — The evidence:** Open Evidence. Show the original confirmed kickoff and the later proposed client message. Highlight verbatim quotes.

**0:45–1:25 — Meta AI extraction:** Open Meta AI Lab. Run Muse Glimmer against the client's change request. Show suggested candidate(s), evidence quote and that they're merely proposals. **Only show this as live after a real successful inference; otherwise acknowledge no available key.**

**1:25–2:05 — Change simulator:** Show 'Launch November 18' vs 'Launch November 11' and the impacts on QA, asset intake, delivery plan and communications. Explain this is a human-review dependency checklist.

**2:05–2:35 — Confirm or reject:** Click Confirm and show prior confirmed term becomes superseded; inspect Audit Trail. (Reset sample before each recording.)

**2:35–3:00 — Impact:** “Accord replaces ‘I thought we agreed’ with 'Here is the source, the decision, and the chain of consequences.'” End on Overview and mention local-first limitations honestly.

## Final compliance checklist

- [ ] Publish app to a public, access-unrestricted URL.
- [ ] Publish repository publicly (do not include secrets).
- [ ] Configure NVIDIA API key or other approved provider access and **verify at least one real Meta Muse Glimmer call**.
- [ ] Record a video no longer than three minutes, showing features built during the hackathon and live functionality.
- [ ] Host video publicly / unlisted viewable without signing in.
- [ ] Verify that all links open in incognito window.
- [ ] Submit at https://cerebralvalley.ai/e/meta-ai-developer-hackathon/hackathon/submit by **Wed Nov 4 2026, 9:00 PM ET (Thu Nov 5 03:00 WAT)**.
- [ ] Retain submission receipt or confirmation screenshot.

## Suggested X demo post (optional)

Built Accord for the Meta Global AI Developer Hackathon: the missing memory between “Can we change this?” and “Yes, we agreed.” Source-backed decisions, conflict detection and change previews—without silent rewrites. [ADD DEMO LINK]
