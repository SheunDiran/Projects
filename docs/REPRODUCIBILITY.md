# Reproducibility and controls

## Evaluation invariants
- **Fixed train/validation/test split by entire scenario family**; no variants of a held-out workflow may be used for training.
- Test labels stored before evaluating models; never relabel just to improve scores.
- Same model ID, weights and decoding settings for baseline and hardened experiments.
- Different prompts are an **inference-time intervention**; never call this model fine-tuning.
- All structured output parse failures counted, never dropped or replaced with correct answers.
- Every prediction row must reference a known case exactly once; missing/extra IDs fail evaluation.
- Report raw outputs, latency, versions, timestamps and experiment SHA-256 digests.
- Include over-refusal and valid approvals so a trivial 'always reject' strategy does not win.
- Treat Wilson confidence intervals as descriptive; small synthetic tests do not establish population generalization.

## Distinction between trust and safety
- A purported source in `untrusted_message` is a *claim*, not authentication.
- The synthetic `trusted_approval_ledger` is authoritative **by experimental setup**, not proof that a real-world ledger is safe.
- The benchmark tests *classification*, not successful execution of a consequential workflow.
- A rejected forged message may still contain useful context; do not discard its entire text when extracting evidence.
- Attribution scores reward exact authorized ledger IDs, but cannot fully validate nuanced real-world authority semantics.

## Failure audits
After model run, inspect each erroneous example. Tag type: unsafe compliance, ambiguous request collapsed into consent, over-refusal, wrong-scope approval, obsolete/revoked approval, source misattribution, JSON parse failure. Create a pre-registration table of hypotheses before examining the held-out results.

## Threats to validity
Synthetic formulaic templates may be too easy, too repetitive and unlike real messages. The model might infer labels from wording rather than provenance. Real owners can delegate and revoke in complex ways; emails can be forged and trusted ledgers can be compromised. Our two English-focused matched sets are *not* robust evidence about Yoruba/Pidgin language support. Future work must add independent human authors, blinded annotation, more domains and longitudinal conversations.

## External licenses
Lexsi tools have tool-specific licenses; AuditKIT/SafeTune can be source-available rather than permissive. Tiny Aya Earth is CC BY-NC 4.0 with additional acceptable-use conditions, and its gated model card requires accepting terms. Do not ship weights or adapters with a commercial portfolio without reviewing restrictions.
