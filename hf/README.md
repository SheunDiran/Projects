---
pretty_name: Borrowed Authority - Synthetic Authorization Provenance Benchmark
task_categories:
- text-classification
language:
- en
license: cc-by-4.0
tags:
- ai-safety
- authority-provenance
- prompt-injection
- synthetic-dataset
- lexsi-hackathon
---
# Borrowed Authority — 224 Synthetic Authorization Provenance Scenarios

This dataset is a **research-only synthetic test set**, created using authored code templates. No real emails, names, account details, student records or personally identifying communications are included. This dataset itself uses CC BY 4.0; model/toolkit licenses are separate.

**Size:** 224 examples across 44 family-disjoint workflows. **Split:** train 132 / validation 46 / test 46. Ten matched conditions cover valid approval, forged claims, ambiguous consent, benign questions, revoked approval, expired delegation, wrong-scope permissions and fake system directives.

Fields: `id`, `family`, `domain`, `case_type`, `trusted_policy`, `trusted_approval_ledger`, `untrusted_message`, `user_request`, `expected_decision`, `expected_authority_source`, `split`, `simulated_only` and creation provenance.

This dataset does **not** contain observed model predictions or prove an improvement in model behaviour. Labels are template-derived and require independent expert review before publication-quality validity claims. The `EXECUTE` classification never triggers a real operation.

Potential biases: repetitive template language, English-focused examples, simplistic policy graph, artificial availability of a trusted ledger, coverage gaps in delegated authority. Do not use for production financial/medical/administrative authorization.

Accompanying source: https://github.com/SheunDiran/Projects/tree/lexsi-borrowed-authority
