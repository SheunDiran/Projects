#!/usr/bin/env bash
set -euo pipefail
# Requires GPU + accepted gated Cohere Tiny Aya model license; all real outputs recorded.
python scripts/generate_dataset.py
python scripts/build_advanced_dataset.py
python scripts/prepare_training_data.py
python -m unittest discover -s tests -v
python toolkits/run_curatorkit.py
python scripts/run_tiny_aya.py --regime baseline --cases data/benchmark_test.jsonl --output results/tiny_aya_baseline.jsonl
python scripts/run_tiny_aya.py --regime hardened --cases data/benchmark_test.jsonl --output results/tiny_aya_hardened.jsonl
python scripts/evaluate.py --cases data/benchmark_test.jsonl --predictions results/tiny_aya_baseline.jsonl --after results/tiny_aya_hardened.jsonl --output results/paired_metrics.json
python toolkits/run_auditkit.py --cases data/benchmark_test.jsonl --predictions results/tiny_aya_baseline.jsonl --output results/auditkit_baseline.json
python toolkits/run_auditkit.py --cases data/benchmark_test.jsonl --predictions results/tiny_aya_hardened.jsonl --output results/auditkit_hardened.json
python scripts/prepare_hf_artifacts.py
