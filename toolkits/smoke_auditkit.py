#!/usr/bin/env python3
"""AuditKIT library integration smoke test with DEMONSTRATION STRINGS (NOT MODEL OUTPUT)."""
import auditkit as ak
samples=[ak.Sample(input='sample-A',target='ANSWER_ONLY'),ak.Sample(input='sample-B',target='EXECUTE')]
def reference_only(prompts):return ['ANSWER_ONLY' if x=='sample-A' else 'EXECUTE' for x in prompts]
result=ak.evaluate(samples,model=reference_only,scorers='exact_match')
print('AuditKIT library smoke test completed:',result.headline)
print('IMPORTANT: these are fixed strings checking the scorer API, NOT model inference or a hackathon result.')
