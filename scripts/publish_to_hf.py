#!/usr/bin/env python3
"""Explicit user-initiated upload. Uses HF login/token from the private local environment only."""
import argparse,os
from pathlib import Path

def main():
 p=argparse.ArgumentParser();p.add_argument('--repo',required=True,help='HF owner/repository for new public dataset');p.add_argument('--publish',action='store_true')
 args=p.parse_args();root=Path(__file__).resolve().parents[1]/'artifacts/hf_dataset_upload'
 if not root.exists():raise RuntimeError('Prepare files first: python scripts/prepare_hf_artifacts.py')
 if not args.publish:
  print('DRY RUN. Prepared files:',[x.name for x in root.iterdir()]);print('No HF files were published. Pass --publish only when authorized.');return
 if not os.getenv('HF_TOKEN'):raise RuntimeError('HF_TOKEN is not set in the private execution environment. Use huggingface-cli login or a secret; do not paste tokens into public chat.')
 from huggingface_hub import HfApi
 api=HfApi(token=os.environ['HF_TOKEN']);api.create_repo(repo_id=args.repo,repo_type='dataset',private=False,exist_ok=True)
 api.upload_folder(repo_id=args.repo,repo_type='dataset',folder_path=str(root),commit_message='Publish synthetic authorization provenance benchmark and observed run artifacts, where available')
 print('Published:',f'https://huggingface.co/datasets/{args.repo}')
if __name__=='__main__':main()
