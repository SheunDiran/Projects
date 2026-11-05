# CI evidence — what was genuinely run

GitHub Actions verified run: https://github.com/SheunDiran/Projects/actions/runs/41987398951

- Python 3.11, deterministic 224-case synthetic dataset generation and family-disjoint splits: 132 training, 46 validation, 46 held-out test.
- 13 offline unit tests passed.
- **Actual PyPI packages installed:** CuratorKIT 0.1.22, AuditKIT 1.1.3.
- **Actual CuratorKIT CPU pipeline:** schema gate, exact dedup, text cleaning, and Alpaca training export. 132 passed, 0 rejected.
- **Actual CuratorKIT → AuditKIT handoff:** AuditKIT consumed 12 of the 132 curated training exports, using a deterministic replay of the exported reference labels. This tests the integration, not the Cohere model. The diagnostic exact-match of 1.0 is trivially expected and MUST NOT be used as an AI benchmark figure.
- CI uploads manifests, checksums, curated exports, rejection logs, and this handoff smoke under the artifact name `borrowed-authority-curation-and-scorer-smoke`.

**Not yet done:** gated Cohere Tiny Aya Earth inference, paired baseline/hardened safety metrics, model-weight safety tuning, Hugging Face publication, official submission. Those activities require the participant's accepted model terms, a GPU, and private HF account authentication.

If real model runs later become available, use the saved inference logs and separate test split to compute honest observed metrics; keep the training-only reference replay separate.
