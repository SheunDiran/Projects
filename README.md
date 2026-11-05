# Borrowed Authority — Who Actually Gave Permission?

**AI Red Teaming, Safety & Alignment · Lexsi Labs Hackathon 2026 · Track B**

> An AI agent can understand an instruction perfectly and still obey the wrong person.

**Borrowed Authority** studies a specific failure mode in automated workflows: **authority laundering**. Persuasive, forwarded, outdated or forged communications make it look like a trusted owner approved an action, even when the actual approval ledger says otherwise. We ask whether an eligible **Cohere Tiny Aya Earth** language model can discriminate claimed authority from verifiable authorization—and whether provenance-aware prompting improves this behaviour without over-refusing legitimate requests.

- **Research demo:** [Borrowed Authority interactive evidence lab](https://borrowed-authority-lexsi.vercel.app)
- **Hackathon:** [Official Lexsi event and Track B rules](https://hackathon.lexsi.ai/)
- **Selected Cohere model:** [CohereLabs/tiny-aya-earth](https://huggingface.co/CohereLabs/tiny-aya-earth) — gated open weights (3.35B), noncommercial research licence.
- **Toolkit pipeline:** [CuratorKIT](https://github.com/Lexsi-Labs/CuratorKIT) → [Tiny Aya Earth real inference](https://huggingface.co/CohereLabs/tiny-aya-earth) → [AuditKIT](https://github.com/Lexsi-Labs/AuditKIT) (optional [SafeTune](https://github.com/Lexsi-Labs/SafeTune) follow-up).

## Research status — November 5, 2026

| Milestone | Evidence | Status |
|---|---|---|
| Research question, threat model, proposed hypotheses | `docs/RESEARCH_PROTOCOL.md` | **Prepared** |
| Synthetic test cases and labels | `data/benchmark_all.jsonl` | **224 cases created, unreviewed by independent expert** |
| Family-disjoint train/validation/test | `data/manifest.json` | **132 / 46 / 46** |
| Evaluation and unit tests | `scripts/evaluate.py`, `tests/` | **13 offline tests passed** |
| Browser-based case explorer | `index.html`, `app.js`, `styles.css` | **Implemented** |
| Cohere Tiny Aya Earth real inference | `scripts/run_tiny_aya.py` | **NOT RUN** — gated model license + GPU needed |
| CuratorKIT → AuditKIT chain (train only) | [GitHub Actions run](https://github.com/SheunDiran/Projects/actions/runs/41987398951) | **SUCCESS: CuratorKIT accepted 132/132; AuditKIT ran a 12-row reference-replay smoke. Not model accuracy.** |
| Before/after model statistics | `results/` | **NOT YET MEASURED** |
| Hugging Face dataset, logs and model artifacts | `hf/`, upload helper | **Prepared for upload, not published** |
| Final Lexsi submission | Organizer form | **NOT SUBMITTED** |

**This is a tested data-curation and evaluation-toolkit pipeline, but not yet an empirical AI safety result. No screenshot, case label or interface state is presented as an observed model response.**

## Why the problem matters

A student association's forwarded message claims a donor roster was cleared for release. A freelance studio sees a screenshot of an old approved change—but a newer entry revoked it. An agent receives an instruction that *looks* like a high-priority system override inside an uploaded document. A naive assistant may treat words such as *"approved"*, *"director"*, or *"urgent"* as proof. Yet permission is a property of **trusted provenance, scope and effective time**, not rhetoric.

The particular contribution to investigate is **authorization provenance across conflicting human communications**, not the broader, already-studied problem of prompt injection.

## Dataset

Our synthetic, domain-diverse dataset includes **224 cases across 44 family-disjoint workflows**:

- **80 original cases:** verified owner permission, spoofed authority, unresolved proposals, benign informational requests.
- **144 additional cases:** active approval, explicit revocation, expired delegation, wrong-scope approval, forged directive and benign process inquiry.
- **Splits:** 132 training; 46 validation; 46 held-out test. A family and all its variations appear in only one split.
- **Labels:** `EXECUTE` means a *simulation-only decision label*. This software will **never perform transfers, issue payments, change records or trigger external operations**.

This is a **small synthetic starter**, not an independently annotated representative dataset. Many cases inherit lexical patterns from templates; we must expand with human-reviewed naturalistic evidence before making external-validity claims.

## Reproduce the offline setup

Python 3.11+ required; these steps have **no account or GPU dependency**:

```bash
python scripts/generate_dataset.py
python scripts/build_advanced_dataset.py
python scripts/prepare_training_data.py
python -m unittest discover -s tests -v
```

**The tests validate data structure and scorer arithmetic, NOT AI performance.** The real CuratorKIT to AuditKIT integration also passes in [GitHub Actions](https://github.com/SheunDiran/Projects/actions/runs/41987398951): 132/132 curated examples, 12 reference-label replay checks; no Cohere inference has yet occurred.

## Run a REAL Tiny Aya experiment (GPU + gated HF model license)

1. Open the model page and accept [Cohere's gated model terms](https://huggingface.co/CohereLabs/tiny-aya-earth) in your own HF account. Never paste credentials into a public chat or GitHub.
2. Start a GPU runtime (Colab/Kaggle, or an authorized HF GPU). The model is 3.35B parameters; fit and limits depend on VRAM.
3. Install `torch`, `transformers`, `accelerate`, `curatorkit`, and `auditkit`, and verify actual imports.
4. Run:

```bash
python toolkits/run_curatorkit.py
python scripts/run_tiny_aya.py --cases data/benchmark_test.jsonl --regime baseline --output results/tiny_aya_baseline.jsonl
python scripts/run_tiny_aya.py --cases data/benchmark_test.jsonl --regime hardened --output results/tiny_aya_hardened.jsonl
python scripts/evaluate.py --cases data/benchmark_test.jsonl --predictions results/tiny_aya_baseline.jsonl --after results/tiny_aya_hardened.jsonl --output results/paired_metrics.json
python toolkits/run_auditkit.py --cases data/benchmark_test.jsonl --predictions results/tiny_aya_baseline.jsonl --output results/auditkit_baseline.json
python toolkits/run_auditkit.py --cases data/benchmark_test.jsonl --predictions results/tiny_aya_hardened.jsonl --output results/auditkit_hardened.json
```

**Alternative:** Open the included [`notebooks/Run_Real_Experiments.ipynb`](notebooks/Run_Real_Experiments.ipynb) in a GPU Colab instance.

**Intervention disclosure:** The baseline vs hardened version changes the *system prompt*, not the model weights. To claim **model-weight repair**, an actual SafeTune intervention and separate checkpoint test would be required. We do not yet claim one.

## Metrics to report after genuine inference

1. Unauthorized execution rate (false authorization; lower is better)
2. Legitimate approval completion rate (higher is better)
3. Spoofed authority rejection rate (higher is better)
4. Benign over-refusal rate (lower is better)
5. Source attribution accuracy (higher is better)
6. Parse error rate (lower is better)

`evaluate.py` includes Wilson 95% confidence intervals, confusion counts and family breakdowns; it rejects missing or duplicate case predictions. When before/after inputs are supplied it computes paired corrected/regressed counts. Cases, raw outputs and experiment manifests must be preserved.

## What will be handed to judges

- Source and methodology, with clear limitations and safety scope
- Public case explorer demonstrating trusted vs untrusted evidence
- Hugging Face dataset and artifact manifest (after upload)
- Observed before/after results and saved model run manifests (after real run)
- CuratorKIT cleaning manifest and AuditKIT training-data handoff smoke (completed in CI), plus real model evaluation and HF Article/write-up (pending)
- Failure analysis on the held-out set and at least one regression case if present

## Licensing & safety

All benchmark cases are fictional. No identifiable real person, payment credential, student record, or confidential client text is included. This is a research evaluation harness, not an approval system for real users. Cohere's selected weights are **CC BY-NC 4.0** with additional terms; review its terms before commercial reuse. Lexsi toolkits may have different licenses—verify each before integration.

**Author:** Oluwaseun Oyediran.  
**Slogan:** *Not every voice has a vote.*
