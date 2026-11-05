# Official Lexsi Track B checklist — verified November 5, 2026

Official: https://hackathon.lexsi.ai/

- Team 1–3 people; project developed during hackathon.
- Track B = AI Red Teaming, Safety and Alignment.
- Use dense open-weight Cohere Labs model, Tiny Aya Earth is eligible.
- Integrate **at least two** track repositories used together (three preferred): CuratorKIT, SafeTune, CircuitKIT, AuditKIT.
- Host all artifacts (datasets, adapters if any, model if modified, logs) on Hugging Face.
- Public deployment (Space, website or public repo) and before-and-after metrics **more than one**.
- Explain tasks, datasets, models, evaluation metrics and meaning of improvements in an HF Article/write-up; HF Space where relevant.
- Deadline: end of day November 14, 2026. Late/incomplete may not count.
- Our current static UI and benchmark do NOT by themselves meet the actual-model and 2-toolkit requirements.

**Selected plan:** CuratorKIT data hygiene → Tiny Aya Earth genuine inference (baseline and provenance-hardened prompt) → AuditKIT scoring. Optional SafeTune corrective experiment only if computational feasibility confirmed.

**Access hurdles:** Accept Tiny Aya Earth gated license from the HF account. GPU and Internet needed to download weights. Hugging Face token needed to publish artifacts. Current ChatGPT workspace has none of these (no GPU, no accepted model access, no HF write credential).
