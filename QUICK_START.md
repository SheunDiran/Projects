# ACCORD — fastest judge-ready path

1. **Public deployment:** Connect your Vercel team, create project from `SheunDiran/Projects`, deploy production. The public URL must work in incognito without login.
2. **Meta inference without hackathon credits:** At https://build.nvidia.com/meta/muse-glimmer-30b sign into NVIDIA, choose **Generate API Key** for the free prototyping endpoint. In the deployed Accord app → **Meta AI Lab** → choose `E103` → paste the key in the password field → **Extract decisions**. Never send the key through chat or commit it to GitHub. Or configure Vercel environment variable `NVIDIA_API_KEY`.
3. **Proof:** Check that you see **LIVE META MODEL**, model `meta/muse-glimmer-30b`, provider `NVIDIA NIM`, and quoted candidates sourced from the original client request. Verify quotes match exact source text. If it fails, don't describe integration as working.
4. **Three-minute recording:** Use `accord-full-demo-preview.mp4` as a storyboard, not final eligibility proof. Screen-record the actual interaction with narration. Capture cold open, intro, dashboard, E102/E103 evidence, real AI response, impact preview, explicit confirmation, and audit history. Keep it <=3:00.
5. **Submission:** Public GitHub URL + public working deployment + publicly viewable final three-minute video. Submit at https://cerebralvalley.ai/e/meta-ai-developer-hackathon/hackathon/submit before **November 5, 2026 03:00 WAT**. Confirm the submitted state.

### What is deliberately not claimed

- The original private ChatGPT Work prototype was not exported; this is a new publicly shareable implementation of the same concept.
- Sample client data is synthetic.
- The browser-local audit events are inspectable but not tamper-resistant production-grade storage.
- Dependency impact lists are deterministic prompts for human review, not model-based forecasts.
- The supplied film is captioned rehearsal footage and not a narrated human click-through or proof of live model use.


### Demo + mobile update
Use **Meta AI Lab → Preview intended AI workflow** to demonstrate the potential interface while provider access is blocked. It is prominently labeled SIMULATED and does not call or simulate a successful API response. Verify the site at 320px, 390px, 768px, and desktop widths. The narrated demo file is an illustrative walkthrough, not a live inference demonstration.
