# Accord — Meta Muse Glimmer API setup and troubleshooting

**Confirmed integration:** `meta/muse-glimmer-30b`. The frontend calls `/api/analyze`, which tries NVIDIA NIM, and can use OpenRouter as an optional secondary provider when its own key is configured. No model outputs are invented. Human review is mandatory.

## One-time credentials

1. Get a **NVIDIA Build hosted inference key** from https://build.nvidia.com/meta/muse-glimmer-30b (Prototype > Generate API Key). A key created only with NGC Catalog/Secrets Manager permissions may not be authorised to invoke the hosted models.
2. In Vercel, open the `accord-evidence-hackathon` project → Settings → Environment Variables. Add/update `NVIDIA_API_KEY` as an encrypted/sensitive **Production** variable. Redeploy the **Production** deployment after saving. Keep the key out of public GitHub and chat.
3. Visit the public app → Meta AI / Model Lab, select the synthetic client change-request evidence and press **Extract decisions with Muse Glimmer**. A real successful call returns provider `NVIDIA NIM`, model `meta/muse-glimmer-30b`, and exact source-verified candidate(s).
4. If a fresh NVIDIA key still returns **403 Authorization failed**, check the account's Public API Endpoints entitlement through NVIDIA support. Several developers report missing organization permissions, even with new keys. Rotating keys repeatedly may not solve an account-level issue.

## Optional alternative: same Meta model via OpenRouter

If NVIDIA remains blocked, OpenRouter also serves `meta/muse-glimmer-30b` at `https://openrouter.ai/api/v1/chat/completions`. Add a private `OPENROUTER_API_KEY` (Production) to Vercel, then redeploy; the backend retries via OpenRouter if NVIDIA returns an access or service error. OpenRouter pricing/credits depend on account; do not add payment without deciding to incur possible charges.

## Diagnostics

`GET /api/health` indicates whether keys were configured; it cannot verify model authorisation. `POST /api/analyze` with synthetic evidence performs a real call and returns a clear provider-specific error if it fails. The app never claims a model extraction succeeded when inference failed.

**Security:** A previously pasted API key should be revoked after replacement. Keep production credentials encrypted; public deployments can incur model usage, so monitor quotas and replace or remove keys after judging. Avoid real customer/private source content in a public demo.
