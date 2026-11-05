#!/usr/bin/env python3
"""Assemble an artifact folder for HF publishing. Does not publish without user-authenticated HF login."""
import json, shutil,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
TARGET=ROOT/'artifacts'/'hf_dataset_upload'
TARGET.mkdir(exist_ok=True,parents=True)
shutil.copyfile(ROOT/'hf/README.md',TARGET/'README.md')
for name in ('benchmark_train.jsonl','benchmark_validation.jsonl','benchmark_test.jsonl','manifest.json'):
 src=ROOT/'data'/name
 if not src.exists():raise RuntimeError('Missing dataset file: '+str(src))
 shutil.copyfile(src,TARGET/name)
for filename in ('paired_metrics.json','auditkit_baseline.json','auditkit_hardened.json','tiny_aya_baseline.jsonl','tiny_aya_hardened.jsonl'):
 src=ROOT/'results'/filename
 if src.exists():shutil.copyfile(src,TARGET/filename)
checksums={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(TARGET.iterdir()) if p.is_file() and p.name!='checksums.json'}
(TARGET/'checksums.json').write_text(json.dumps(checksums,indent=2)+'\n',encoding='utf-8')
print('Artifact folder prepared:',TARGET,'\nNo Hugging Face upload has happened.')
