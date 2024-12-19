---
title: HuggingFace Downloader
toc: true
thumbnail: https://t.mwm.moe/fj?random=HuggingFace-Downloader
cover: https://t.mwm.moe/fj?random=HuggingFace-Downloader
date: 2024-09-22 17:31:44
tags:
    - HuggingFace
categories: Code Piece
---

Code pieces for downloading models or datasets from [Hugging Face](https://huggingface.co/).

<!--more-->

## Install

```shell
pip install huggingface_hub
huggingface-cli --help
```

## downloader.py

```python
import os
from huggingface_hub import snapshot_download

repo_id_list=[
    # samples
    "openai/clip-vit-base-patch32"
]

# download
for repo_id in repo_id_list:
    print("Start Downloading for repo {}".format(repo_id))
    local_dir = snapshot_download(repo_id=repo_id,
                                  repo_type='model',
                                  local_dir=os.path.join("Models",repo_id) ,
                                  local_dir_use_symlinks=False,
                                  cache_dir=".cache",
                                  resume_download=True,
                                  endpoint="https://hf-mirror.com",
                                  use_auth_token="hf_*************")
    print(f"File downloaded to {local_dir}")
```

## Run

```shell
python downloader.py
```



