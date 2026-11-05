#!/usr/bin/env python3
"""Real CuratorKIT -> AuditKIT integration smoke, using *label replay* only.

This verifies both Lexsi libraries and their data handoff on a CPU runner; it is
NOT a Cohere inference run or evidence of model performance. Only training split
CuratorKIT exports are used here. Held-out baseline and hardened evaluations
are handled separately by scripts/run_tiny_aya.py + scripts/evaluate.py.
"""
import json
from pathlib import Path
import auditkit as ak

ROOT = Path(__file__).resolve().parents[1]
curated_dir = ROOT / 'results' / 'curatorkit'
source = curated_dir / 'sft_alpaca.jsonl'
manifest = curated_dir / 'manifest.json'
if not manifest.is_file() or not source.is_file():
    raise RuntimeError('CuratorKIT output missing; run toolkits/run_curatorkit.py first')
rows = [json.loads(line) for line in source.read_text(encoding='utf-8').splitlines() if line.strip()]
if len(rows) < 100:
    raise RuntimeError(f'Only {len(rows)} CuratorKIT examples survived curation from 132; check schema and dedup')
for row in rows:
    if not all(field in row for field in ('instruction', 'input', 'output')):
        raise RuntimeError('CuratorKIT export has unexpected structure')

# We deliberately replay the curated labels. This validates the adapter/scorer
# integration, but cannot be used for any claims about model correctness.
selected = rows[: min(12, len(rows))]
prompts = [f"{row['instruction']}\n\n{row['input']}" for row in selected]
reference = dict(zip(prompts, [row['output'] for row in selected]))
samples = [ak.Sample(input=prompt, target=reference[prompt]) for prompt in prompts]
def replay_reference(inputs):
    return [reference[value] for value in inputs]
run = ak.evaluate(samples, model=replay_reference, scorers='exact_match')

out_dir = ROOT / 'results' / 'auditkit'
out_dir.mkdir(parents=True, exist_ok=True)
(out_dir / 'curator_chain_smoke.json').write_text(json.dumps({
    'kind': 'Lexsi CuratorKIT -> AuditKIT integration smoke',
    'curated_train_rows': len(rows),
    'evaluated_train_rows': len(selected),
    'scorer': 'AuditKIT exact_match',
    'scorer_headline': run.headline,
    'input_source': str(source.relative_to(ROOT)),
    'disclosure': 'Reference-label replay on curated TRAIN examples; NO model called; NOT a benchmark score.'
}, indent=2), encoding='utf-8')
print(f"Verified CuratorKIT -> AuditKIT adapter/scorer handoff on {len(selected)} curated TRAIN rows.")
print('Diagnostic exact match:', run.headline)
print('IMPORTANT: this is reference replay, not a Cohere model performance measurement.')
