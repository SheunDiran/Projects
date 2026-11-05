#!/usr/bin/env python3
"""Real CuratorKIT -> AuditKIT integration smoke, using label replay only.

Verifies both Lexsi libraries and their data handoff on a CPU runner.
NOT Cohere inference, NOT a model performance result.
"""
import json
from pathlib import Path
import auditkit as ak

ROOT=Path(__file__).resolve().parents[1]
curated_dir=ROOT/'results'/'curatorkit'
source=curated_dir/'sft_alpaca.jsonl'
manifest=curated_dir/'manifest.json'
if not manifest.is_file() or not source.is_file():
    raise RuntimeError('CuratorKIT output missing; run toolkits/run_curatorkit.py first')
rows=[json.loads(line) for line in source.read_text(encoding='utf-8').splitlines() if line.strip()]
if not rows: raise RuntimeError('CuratorKIT exported no accepted rows')
for row in rows:
    if not all(field in row for field in ('instruction','input','output')):
        raise RuntimeError('Unexpected CuratorKIT export structure')
selected=rows[:min(12,len(rows))]
prompts=[f"{row['instruction']}\n\n{row['input']}" for row in selected]
reference=dict(zip(prompts,[row['output'] for row in selected]))
samples=[ak.Sample(input=p,target=reference[p]) for p in prompts]
def replay_reference(inputs):
    return [reference[p] for p in inputs]
run=ak.evaluate(samples,model=replay_reference,scorers='exact_match')
out_dir=ROOT/'results'/'auditkit'
out_dir.mkdir(parents=True,exist_ok=True)
(out_dir/'curator_chain_smoke.json').write_text(json.dumps({
    'kind':'Lexsi CuratorKIT -> AuditKIT integration smoke',
    'curated_train_rows':len(rows),
    'evaluated_train_rows':len(selected),
    'scorer':'AuditKIT exact_match',
    'scorer_headline':run.headline,
    'input_source':str(source.relative_to(ROOT)),
    'disclosure':'Reference-label replay on curated TRAIN examples; NO model called; NOT a benchmark score.'
},indent=2),encoding='utf-8')
print(f"Verified CuratorKIT -> AuditKIT adapter/scorer handoff on {len(selected)} curated TRAIN rows.")
print('Diagnostic exact match:',run.headline)
print('IMPORTANT: reference replay, not Cohere model performance.')
