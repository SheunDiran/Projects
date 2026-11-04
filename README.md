# Accord — Evidence to Agreement

**Meta Global AI Developer Hackathon (Oct 26–Nov 4, 2026)** · Indie Developer · **Build for Your World**

Accord turns fragmented client messages into source-linked decision history. It separates commitments from suggestions, checks contradictions, previews dependencies before a change is accepted, and preserves the evidence trail for accountability. This is a **standalone, static/serverless demo** built to make the original Work prototype judge-accessible; it is **not a verified export** of the earlier private prototype.

## What it does

- Import or paste evidence (TXT/Markdown and original text), search and link exact source quotes.
- Record confirmed/proposed/rejected/superseded decisions with quote validation and source references.
- Detect contradictory values across simultaneously confirmed decisions (deterministic; not semantic inference).
- Preview proposed versus confirmed values and impacted categories without writing any changes.
- Require explicit human confirmation to supersede the earlier agreement, or reject and preserve it.
- Export/import all workspace data as JSON; inspect append-only event sequence in-browser.
- **Optional live Meta open-weight integration:** Muse Glimmer 30B via NVIDIA NIM. The model extracts proposed terms with exact evidence quotes; the API filters non-verbatim quotations. No AI results are fabricated when no API key is present.
- Includes synthetic, instantly resettable client case study. Fully responsive, no login required.

## Local run

```bash
npx serve . -l 3000
```

Open http://localhost:3000. This runs the static app only; for `/api/analyze`, deploy to Vercel with `vercel deploy` or `vercel dev`. This app has no npm dependencies.

## Model integration

Use **Meta Muse Glimmer 30B** on NVIDIA Build: https://build.nvidia.com/meta/muse-glimmer-30b . The free prototyping endpoint may require NVIDIA account setup and is subject to provider limits. The API call goes from the user's browser to `/api/analyze`, then to NVIDIA's OpenAI-compatible endpoint using `meta/muse-glimmer-30b`.

Two modes:

1. **Browser-session BYOK:** Enter an NVIDIA API key in the Meta AI Lab; it is held only in a JavaScript variable and sent on the HTTPS request, not stored in localStorage. Do not use personal data in a public hackathon demo.
2. **Server configured:** Set `NVIDIA_API_KEY` as an encrypted Vercel environment variable. Then judges can invoke Muse Glimmer without entering a key. **Warning:** publicly accessible server keys should have provider limits/restricted use to avoid misuse or charges. Prefer time-limited demo access.

The API is `/api/analyze` with `POST {text,sourceTitle}`. It rejects large text, demands JSON output, verifies that every returned quote exists in the submitted original, and returns verified candidates. An absent key returns 428 and a clear UI notice, not a fake success.

**No API key is included in source code.** This repository alone does not prove any live inference has run. For hackathon eligibility, configure the key, run a real call, and demonstrate it in the three-minute video.

## Data and limitations

- **Storage is browser-local**, not a multi-user durable backend. Export the JSON to preserve your work. Reset is destructive by design. No login/access controls.
- Proof-of-concept quote validation is a strict substring check; it does not prove the quote's context or that an agreement is legally binding.
- Dependency impact alerts are an explicit, deterministic checklist, not computed cost projections.
- The sample includes only synthetic records. Do not upload confidential client data.
- File parsing supports TXT/Markdown; PDF, images, audio, OCR, real-time collaboration and reviewer authentication are not yet implemented.
- No generated demo video is included; record browser use live and verify links are public.

## Structure

- `index.html`, `styles.css`, `app.js`: static client-side demo.
- `api/analyze.js`: NVIDIA Muse Glimmer serverless inference integration.
- `api/health.js`: deployment readiness (reports whether env key is present, not whether a call succeeded).
- `tests/`: dependency-free smoke/domain tests.
- `SUBMISSION.md`: submission copy and video walkthrough.

## Why it fits

Problem statement: **Build for Your World.** Freelancers and small teams often lose track of what changed during scattered email/WhatsApp conversations. Accord makes every agreement inspectable by linking each decision to its source, keeping an explicit human approval gate, and surfacing change ripple effects before commitments are overwritten.

## Tests

```bash
npm test
```

## License

MIT. Model weights are not bundled. Muse Glimmer model attribution: Meta; review its model license before production use.


## 2026 judge-focused presentation

The interface now begins with a cinematic but accessible editorial intro, a high-contrast agreement overview, and a six-scene guided demo tour. Select **Explore the live workspace**, or use **Take the 6-scene tour**. In the app, select **↶ Intro** to replay or **✦ Demo tour** for scene notes. The in-product story and client names are synthetic. See `DEMO_VIDEO_SCRIPT.md` for the original narrated 3-minute storyboard.
