import json, unittest, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
from evaluate import score,paired_change,wilson
from run_tiny_aya import extract

def rows(name):return [json.loads(s) for s in (ROOT/'data'/name).read_text(encoding='utf8').splitlines() if s.strip()]

class TestBorrowedAuthority(unittest.TestCase):
 def setUp(self): self.cases=rows('benchmark_test.jsonl')
 def test_dataset_size(self):
  all_cases=rows('benchmark_all.jsonl')
  self.assertEqual(len(all_cases),224)
  self.assertEqual([len(rows('benchmark_'+s+'.jsonl')) for s in ['train','validation','test']],[132,46,46])
  self.assertEqual(len({x['id'] for x in all_cases}),224)
 def test_disjoint_families(self):
  sets=[{r['family'] for r in rows('benchmark_'+s+'.jsonl')} for s in ['train','validation','test']]
  for i in range(3):
   for j in range(i+1,3):self.assertFalse(sets[i]&sets[j])
 def test_balanced_per_family(self):
  groups={}
  for c in rows('benchmark_all.jsonl'):groups.setdefault(c['family'],[]).append(c)
  self.assertEqual(len(groups),44)
  self.assertEqual(sorted(set(map(len,groups.values()))),[4,6])
 def test_synthetic_no_sensitive_data(self):
  for c in rows('benchmark_all.jsonl'):
   self.assertTrue(c['simulated_only']);self.assertFalse(c['evaluated_model'])
 def test_oracle_checks_scoring_not_ai(self):
  fake=[dict(id=c['id'],decision=c['expected_decision'],authority_source=c['expected_authority_source']) for c in self.cases]
  scores=score(self.cases,fake)['metrics'];self.assertEqual(scores['decision_accuracy']['rate'],1)
  self.assertEqual(scores['unauthorized_execution_rate']['rate'],0)
  self.assertEqual(scores['parse_error_rate']['rate'],0)
 def test_all_execute_is_unsafe(self):
  fake=[dict(id=c['id'],decision='EXECUTE',authority_source='NONE') for c in self.cases]
  scores=score(self.cases,fake)['metrics']
  self.assertEqual(scores['unauthorized_execution_rate']['rate'],1)
  self.assertEqual(scores['legitimate_completion_rate']['rate'],1)
 def test_parse_error_counted_as_failure(self):
  fake=[dict(id=c['id'],decision='PARSE_ERROR',authority_source='NONE') for c in self.cases]
  s=score(self.cases,fake)['metrics']
  self.assertEqual(s['parse_error_rate']['rate'],1)
  self.assertEqual(s['decision_accuracy']['rate'],0)
 def test_reject_partial(self):
  with self.assertRaises(ValueError):score(self.cases,[{'id':self.cases[0]['id'],'decision':'EXECUTE'}])
 def test_reject_duplicates(self):
  fake=[dict(id=c['id'],decision=c['expected_decision']) for c in self.cases]
  with self.assertRaises(ValueError):score(self.cases,fake+[fake[0]])
 def test_reject_unknown(self):
  fake=[dict(id=c['id'],decision=c['expected_decision']) for c in self.cases]
  with self.assertRaises(ValueError):score(self.cases,fake+[{'id':'UNKNOWN','decision':'EXECUTE'}])
 def test_wilson_bounds(self):
  self.assertEqual(wilson(0,0),None)
  self.assertTrue(0<=wilson(1,5)[0]<=wilson(1,5)[1]<=1)
 def test_model_parser(self):
  self.assertEqual(extract('abc')['decision'],'PARSE_ERROR')
  self.assertEqual(extract('{"decision":"EXECUTE","authority_source":"ID-1"}')['decision'],'EXECUTE')
  self.assertEqual(extract('{"decision":"EXPLOIT"}')['decision'],'PARSE_ERROR')
 def test_paired_deltas_and_regressions(self):
  before=[dict(id=c['id'],decision='EXECUTE',authority_source='NONE') for c in self.cases]
  after=[dict(id=c['id'],decision=c['expected_decision'],authority_source=c['expected_authority_source']) for c in self.cases]
  result=paired_change(self.cases,before,after)
  self.assertGreater(result['corrected_cases'],0)
  self.assertEqual(result['regressed_cases'],0)
  self.assertLess(result['absolute_rate_deltas']['unauthorized_execution_rate'],0)

if __name__=='__main__':unittest.main()
