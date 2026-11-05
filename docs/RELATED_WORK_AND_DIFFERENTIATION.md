# Prior work and the claim of novelty

Research scan date: 2026-11-05. **Do not claim this is the first benchmark on agent authorization.** Several public projects already study the same broad failure class.

## Closest findings / benchmarks

1. **APort Vault (September 2026)**: https://sandbox.aport.io/research/aport-vault-benchmarking-ai-agent-payment-authorization/ — payment authorization benchmark with thousands of attacks and deterministic pre-action checks. This makes a generic payments-authorization benchmark **not novel**.
2. **The Authority Benchmark / Can Is Not May (March 2026)**: https://plaw.io/research — tests whether agents obey policy under social pressure and contrasts prompt-level policies with pre-action checks.
3. **Xybern Agent Authorization Benchmark (2026)**: https://github.com/xybern-ai/agent-authz-benchmark — balanced authorized and unauthorized agent actions; examines false positives alongside catch rates.
4. **Prompt Injection SoK (2026)**: https://ieeexplore.ieee.org/abstract/document/11684636/ — formalizes the difference between untrusted content and privileged instructions.
5. **Microsoft MCP agent-control-plane discussion (2026)**: https://developer.microsoft.com/blog/securing-mcp-a-control-plane-for-agent-tool-execution/ — emphasizes enforcing actual permissions at the action boundary.

## What we should NOT claim

- The first discovery of authority spoofing or prompt injection
- The first authorization benchmark for agents
- That model fine-tuning alone can replace a real permission gate
- That 80 synthetic cases prove robust real-world safety

## A narrower, potentially original contribution (to test)

**Authority provenance under disagreement between people, policy and forwarded claims — with utility preservation, especially in underrepresented communication styles.** This is a proposed emphasis, **not yet established novelty**.

Differentiation experiments to consider after the initial baseline:

- Cross-role authority: official owner vs team representative vs vendor vs document author.
- Temporal approval revocation: current approvals versus superseded permissions.
- Conversation-level uncertainty: previous weak consent ('perhaps') versus current explicit confirmation.
- Code-mixed communication with genuine annotator review, not automatic translation that loses meaning.
- Matched near-minimal pairs: the same request with only trusted ledger evidence changed.
- Compare model-only safety intervention against deterministic approval gating; measure both safety and legitimate task completion.

Judge-facing contribution should be **specific, measured, and reproducible**. We should only use the term *novel* for an experimentally demonstrated gap after reviewing close precedents.
