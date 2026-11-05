#!/usr/bin/env python3
"""REAL AuditKIT evaluation of recorded model predictions. Does not generate or fake model outputs."""
import argparse,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def load(path):return [json.loads(x) for x in Path(path).read_text(encoding='utf8').splitlines() if x]
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--cases',default='data/benchmark_test.jsonl')
 ap.add_argument('--predictions',required=True);ap.add_argument('--output',default='results/auditkit_metrics.json');args=ap.parse_args()
 import auditkit as ak
 cases=load(args.cases);raw=load(args.predictions)
 preds={}
 for r in raw:
  if r['id'] in preds:raise ValueError('Duplicate ID: '+r['id'])
  preds[r['id']]=str(r.get('decision','PARSE_ERROR')).upper()
 if set(preds)!=set(c['id'] for c in cases):raise ValueError('Prediction IDs must exactly match the held-out dataset IDs')
 dataset=[]
 for c in cases:
  dataset.append(ak.Sample(input=c['id'],target=c['expected_decision']))
 def replay(inputs):return [preds[id] for id in inputs]
 result=ak.evaluate(dataset,model=replay,scorers='exact_match')
 metrics={'toolkit':'AuditKIT','n':len(cases),'headline':dict(result.headline),
  'provenance':'Replay of recorded external model predictions. No inference happens during AuditKIT scoring.',
  'prediction_file':args.predictions}
 out=Path(args.output);out.parent.mkdir(exist_ok=True,parents=True);out.write_text(json.dumps(metrics,indent=2)+'\n',encoding='utf8')
 print(json.dumps(metrics,indent=2))
if __name__=='__main__':main()
