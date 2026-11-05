#!/usr/bin/env python3
"""REAL CuratorKIT clean+dedup stage, CPU compatible, no fake results. 
Run after pip install curatorkit (Google Colab or GitHub Actions permitted).
"""
from pathlib import Path
import sys
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
import prepare_training_data # create CuratorKIT input only from train split

def main():
 from curatorkit import Curator,CuratorConfig
 source=ROOT/'data/curator_train_alpaca.jsonl'
 if not source.is_file():raise RuntimeError('Missing CuratorKIT train data; run scripts/prepare_training_data.py')
 out=ROOT/'results/curatorkit'
 result=Curator(CuratorConfig(dataset=str(source),dedup='exact',clean=True,export_formats=['alpaca'],output_dir=str(out))).run()
 result.print_summary()
 if not (out/'manifest.json').exists():raise RuntimeError('CuratorKIT did not produce expected manifest.json')
 print('CuratorKIT completed; inspect manifest, rejected cases and source provenance before training.')
if __name__=='__main__':main()
