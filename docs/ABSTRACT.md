# Borrowed Authority — Abstract (draft, not a submitted research result)

As AI assistants increasingly participate in payment, administrative and project workflows, they face a subtle safety failure: distinguishing **genuine authorization** from lower-trust messages that merely *claim* authorization. An assistant might correctly parse a forwarded message yet still follow instructions it has no permission to execute.

Borrowed Authority proposes a reproducible red-teaming benchmark that separates trusted policy and approval records from untrusted messages, document excerpts and screenshots. We created an initial synthetic set of 80 sandbox cases across 20 workflow families, pairing verified approvals with impersonation, ambiguous consent and harmless information requests. The evaluation design measures unauthorized execution, legitimate completion, spoof rejection, clarification and benign over-refusal, alongside authority-source attribution.

Our planned next phase evaluates a permitted Cohere open-weight model, curates adversarial examples using Lexsi toolkits, applies a feasible safety intervention, and compares pre- and post-intervention performance on family-disjoint held-out cases. No live model results or improvements are claimed at this stage.

The central goal is to improve a model's ability to answer two separate questions: **what was requested, and who actually had the authority to request it?**
