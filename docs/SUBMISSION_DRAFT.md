# Lexsi AI Safety Hackathon — Submission draft (NOT YET SUBMITTED)

## Name
Borrowed Authority — When AI Confuses Claimed Permission with Verified Authorization

## Track
AI Red Teaming, Safety and Alignment (Track B)

## Elevator pitch
What if an AI agent obeys a forwarded screenshot that claims an owner approved a payment—while a trusted ledger records that the approval was revoked? Borrowed Authority investigates whether models distinguish trustworthy authorization from believable claims, including revoked consent, expired delegations, wrong-scope approvals, and fake system directives. The project includes a 224-case synthetic benchmark, an interactive evidence lab, a reproducible Cohere Tiny Aya experiment runner, a CI-verified CuratorKIT → AuditKIT training-data pipeline, and strict controls for tracking unsafe compliance and over-refusal. Our hypothesis is that provenance-aware interventions can lower unauthorized actions while preserving valid ones; **we have not yet empirically verified that hypothesis**.

## Research novelty (careful phrasing)
We focus on matched *authority provenance and lifecycle* tests where the same alleged instruction is paired with a verified active approval, revoked approval, expired delegation or unrelated scoped permission. This is a narrower contribution within existing work on prompt injection, agent security and trusted-source handling—not a claim to have invented the general problem.

## Method
Model: CohereLabs/tiny-aya-earth (eligible 3.35B open-weight, gated license). Compare baseline prompting with a provenance-aware hardening system prompt, keeping weights and deterministic decoding fixed. Train/test families are separated. CuratorKIT cleans and exports training-only source material. AuditKIT independently scores saved baseline/hardened predictions using recorded outputs. Evaluate unsafe action rate, legitimate completion, citation fidelity, over-refusal, parse failures and regressions.

## Existing completed results
- 224 synthetic annotated cases generated; 44 family groups; 132/46/46 split.
- 13 passing unit tests on dataset and score logic.
- Actual CuratorKIT → AuditKIT pipeline succeeded: https://github.com/SheunDiran/Projects/actions/runs/41987398951
- Static public explorer and repeatable scripts.

## Missing results — MUST FILL FROM REAL EXECUTION
- Baseline Tiny Aya metrics: PENDING
- Hardened Tiny Aya metrics: PENDING
- CuratorKIT cleaning: 132/132 training examples accepted in GitHub Actions; logs/artifacts available
- AuditKIT integration: 12 curated training examples processed through reference replay; this is NOT model inference
- AuditKIT real model-scoring results: PENDING
- Improvement/regression table with CI: PENDING
- Hugging Face published data/logs: PENDING
- Actual final submission receipt: PENDING

**Do not remove these missing-result notices or claim completion without running the tools and saving provenance.**

## Submitted links once published
- Public web demo: https://borrowed-authority-lexsi.vercel.app
- Public source: https://github.com/SheunDiran/Projects/tree/lexsi-borrowed-authority
- HF dataset: NOT YET PUBLISHED
- HF logs/evaluation: NOT YET PUBLISHED
- HF Article: NOT YET PUBLISHED
