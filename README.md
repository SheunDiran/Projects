# Accord — Evidence to Agreement

### A request is not an agreement.

**An evidence-backed workspace for tracking commitments, spotting conflicting decisions, and seeing the impact of change before saying yes.**

[**Explore the live application**](https://accord-evidence-hackathon.vercel.app) · [**Watch the 2:57 narrated demonstration**](https://drive.google.com/file/d/1Dp7R1XATi_8vI0yrU9aBeXK1KVvbP7by/view?usp=drivesdk) · [**Read the API setup guide**](API_SETUP.md)

**Meta Global AI Developer Hackathon 2026** · **Indie Developer** · **Build for Your World**

---

## The problem

Imagine a studio agreeing to deliver a five-page website for ₦450,000 by November 18. Days later, the client asks for an extra dashboard, a November 11 deadline and no increase in price.

Was that request accepted? Does it replace the original agreement? What else needs to change?

Project commitments often drift across messages, emails and handoffs. Accord is designed to make the difference between **requested**, **agreed**, and **changed** visible.

## What you can try now

1. **Explore the case:** open the landing page and inspect the original source-backed story.
2. **Evidence library:** examine kickoff communications and the later change request.
3. **Decision ledger:** filter proposed, confirmed, rejected and superseded records.
4. **Impact simulator:** preview affected delivery, quality-assurance and communication dependencies without mutating the agreement.
5. **Human approval:** confirm or reject a proposed change and inspect its audit history.
6. **Meta AI Lab:** see the planned source-grounded extraction flow and try the clearly marked **Illustrative AI Workflow**. This example is simulated and does **not** call a model.

The application uses a fictional, resettable case study and browser-local storage. It is a functional prototype, **not a production agreement system**.

## Architecture

```text
Browser UI (vanilla JavaScript / CSS / HTML)
   ├── Evidence and original quotations
   ├── Decision ledger + contradiction checks
   ├── Deterministic change-impact preview
   ├── Human confirm / reject / supersede
   ├── Browser-local audit history + JSON export/import
   └── Meta AI Lab
         └── POST /api/analyze (Vercel serverless)
               ├── Meta Muse Glimmer 30B through NVIDIA NIM
               ├── Optional same-model OpenRouter fallback
               ├── Exact-quotation validation
               └── Candidate suggestions for human review
```

The backend requests a structured extraction response, verifies that each proposed supporting quotation appears in the supplied evidence, and discards suggestions without source-matching quotes. **An AI suggestion is never silently accepted as a confirmed commitment.**

### AI integration status — important disclosure

The inference integration is implemented and covered by automated tests, but **a successful hosted Meta-model inference has not yet been verified**. The NVIDIA endpoint returned **403 — Authorization failed** during production smoke testing. The fallback provider is optional and requires separate credentials. The lab's illustrative preview is deliberately labeled **SIMULATED — NO MODEL CALL**. No fabricated AI results are presented as live output.

[API setup and troubleshooting](API_SETUP.md) · [Live source overview](SUBMISSION.md)

## Responsive experience and demo

The interface has been checked in browser emulation at widths including **320px, 390px, 768px, 1024px, and 1366px**. The main navigation scrolls on narrow screens and panels wrap to fit. Accessibility features include user-initiated sound, a skip control for the case-file opening, and reduced-motion handling. Physical-device testing is still recommended.

The [**2-minute-57-second narrated video**](https://drive.google.com/file/d/1Dp7R1XATi_8vI0yrU9aBeXK1KVvbP7by/view?usp=drivesdk) shows the product story, source-linked decisions, change consequences and the clearly labeled illustrative AI workflow. This video is not footage of successful live Meta inference.

## Run locally

```bash
git clone https://github.com/SheunDiran/Projects.git
cd Projects
npm test
npx serve . -l 3000
```

Visit http://localhost:3000. The static client will run locally; `/api/analyze` requires a Vercel-compatible serverless environment. No browser API keys need to be checked into Git.

## Technology

- **Frontend:** HTML5, CSS3, vanilla JavaScript.
- **Backend:** JavaScript serverless function on Vercel.
- **Model integration:** Meta Muse Glimmer 30B through NVIDIA NIM; optional OpenRouter provider.
- **Data:** browser `localStorage` with JSON import/export.
- **Validation:** exact quote matching, explicit user confirmation, deterministic impact checklist.
- **Testing:** Node built-in test runner and automated endpoint smoke tests.

## Limitations and next steps

- The saved workspace is local to each browser; no cloud synchronization or accounts.
- Quotation substring matching is a baseline guardrail, **not** legal verification or contextual truth validation.
- Impact categories are deterministic prompts for review, not AI predictions or priced estimates.
- PDF/audio ingestion, collaboration, authentication, durable audit storage, live model validation, privacy controls and production-grade rate limiting remain future work.
- Public demo data is synthetic. **Do not enter sensitive client communications.**

## Project materials

- [Demo walkthrough](DEMO_VIDEO_SCRIPT.md)
- [Quick start](QUICK_START.md)
- [Submission information](SUBMISSION.md)
- [API connection guide](API_SETUP.md)
- [Source of the inference endpoint](api/analyze.js)
- [Tests](tests/endpoint.test.js)

Built by **Oluwaseun Oyediran** for the Meta Global AI Developer Hackathon.

**Stop losing the agreement behind the conversation.**
