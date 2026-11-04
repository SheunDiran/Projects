# ACCORD — Three-minute judges' demo

## Creative direction

**Premise:** Every broken client relationship has an origin story: a request mistaken for a promise. Accord shows what was said, what was agreed, and what changed — with the original evidence still attached.

**Tone:** cinematic but restrained; serious product storytelling, not a feature dump. No generic 'AI is revolutionising...' lines, no invented customer results, no artificial demo responses.

**Visual identity:** forest green / softened mint / cream, typography-led, restrained motion; use the existing product UI and screen recording. Keep text legible at 1920×1080 and 16:9. Use a light, licensed ambient sound bed at low volume or none. Original opening montage provided separately; it is silent to allow voiceover.

## EXACT TIMED SCRIPT — 2:55 to 3:00

| Time | Screen / action | Spoken words |
|---|---|---|
| **00:00–00:14** | Use `accord-opening-teaser.mp4`, or screen record the new intro. Begin with a close-up of the line **A REQUEST IS NOT AN AGREEMENT**. | “Most projects don't break because someone forgot the work. They break because two people remember the agreement differently.” |
| **00:14–00:28** | Reveal the new Accord intro. Hold on “What we said. What we agreed. What changed.” Click **Explore the live workspace**. | “A client says, ‘Could we just change one thing?’ Weeks later, everyone remembers a different yes. This is Accord — evidence to agreement.” |
| **00:28–00:50** | Dashboard overview and metrics; hover over “confirmed delivery” vs “new request”. Click **Explore the evidence**. | “Here's a real workflow, using synthetic messages. Helio Studio agreed to deliver a five-page website on November eighteenth for four hundred and fifty thousand naira. Then the client asked for an earlier launch and an extra dashboard — at the same price.” |
| **00:50–01:14** | Evidence library. Show E102, the actual confirmation. Then E103, the client's question. Zoom on original quotes. | “Accord doesn't flatten those messages into a vague summary. It stores the original source. The first message confirms the terms; the second asks for a change. Asking is not approving.” |
| **01:14–01:40** | **Only if Meta model is successfully connected:** open Meta AI Lab, choose E103 and run Muse Glimmer; show quoted proposal candidates and evidence validation. | “For complex conversations, Meta's Muse Glimmer model proposes commitments directly from the message. Accord checks that every cited quote actually appears in the source, and it never confirms an AI suggestion on its own.” |
| **01:40–02:08** | Impact simulator, select proposed timeline change from Nov 18 → Nov 11. Show dependency list and before / after. | “Now we test the consequence before saying yes. Moving the date removes seven days from the schedule, affecting quality assurance, asset handoff and client communication. Accord surfaces a review checklist. These are dependencies to assess, not invented predictions.” |
| **02:08–02:33** | Decision ledger, show confirmed vs proposed. In Impact Simulator, click **Confirm** on sample request if comfortable, then show superseded prior term. | “The proposal remains pending until someone deliberately accepts or rejects it. On approval, the old term is marked superseded — never silently rewritten. Everyone can see what changed, when and which message prompted it.” |
| **02:33–02:47** | Audit Trail and exported data; show timeline. | “Each decision has its source, its status, and a reviewable history. No more searching ten threads to explain the contract everyone thought they signed.” |
| **02:47–03:00** | Return to overview; end on product mark + tagline. | “Accord doesn't replace judgment. It gives judgment a memory. From scattered conversations to decisions you can defend. Accord. A request is not an agreement.” |

### If the Muse Glimmer live call fails

Don't record a simulated output or narrate it as if the model ran. Instead **do not claim the required hackathon model use is complete**. Prioritise fixing the integration before filing an eligible submission; the rest of the demo can be recorded for rehearsal, but the judges require actual model integration. In a rehearsal-only cut, replace the 01:14–01:40 segment with a factual explanation of the planned integration, clearly marked as *not connected*.

## The 6-scene guided tour built into Accord

The app's **Demo tour** button moves between these six real pages with compact presenter notes:

1. **The promise** — overview, baseline, pending request.
2. **The source of truth** — evidence library with verbatim text.
3. **Intelligence, with receipts** — model extraction, only if live.
4. **The seven-day dilemma** — impact preview.
5. **Not agreed until approved** — ledger and human confirmation.
6. **Every decision has a history** — audit events and export.

You can use this tour to rehearse, then dismiss the overlay for a clean screen capture.

## Recording sequence

1. Open the public deployment in incognito, 16:9 1920×1080 with Chrome at 90–100% zoom. Confirm the sample data is unchanged. No sign-in required.
2. Make a rehearsal capture that follows the six scenes. Keep mouse motion deliberate, pause on evidence quotes and on the before/after comparison.
3. Connect a genuine Meta model; perform a real inference from E103 and verify the server response. Capture it without showing the API key.
4. Record at most 3:00 total. Keep text large and audio clear, don't accelerate interaction to a blur.
5. Export H.264 MP4; publish as a public or unlisted viewable link. Double-check the video opens without the creator logged in.
6. Put the public deployment, open-source repository and video link into Cerebral Valley's submission form **before Nov 4, 2026 9:00 PM ET = Nov 5, 3:00 AM Nigeria time**.

## Submission-stage honesty

- The local-first demo runs on synthetic data in browser storage. It does not yet have multi-user sync or production tamper-resistant audit storage.
- The impact simulator is deterministic and explanatory. It flags review dependencies, not probabilistic AI predictions.
- The AI feature must use a real approved Meta model and must be demonstrated working. The credits application is optional; actual model use is not.
- The official model eligibility and deadline take precedence over any rehearsal script.
