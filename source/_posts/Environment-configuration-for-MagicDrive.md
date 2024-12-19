---
title: Environment configuration for MagicDrive
toc: true
thumbnail: https://t.mwm.moe/fj?random=Environment-configuration-for-MagicDrive
cover: https://t.mwm.moe/fj?random=Environment-configuration-for-MagicDrive
date: 2024-09-23 17:05:22
tags:
    - Diffusion Model
    - Driving Video Deneration
categories: Environment Configuration
---

A guidance of environment configuration for [MagicDrive](https://github.com/Breynald/MagicDrive).

<!--more-->

## Environment Setup

Prepare conda environment

```shell
conda create -n newenv python==3.8
conda activate newenv
```

Clone MagicDrive reop

```shell
git clone --recursive https://github.com/cure-lab/MagicDrive.git
```

Install pytorch==1.10.2, torchvision==0.11.3, cuda==11.3

```shell
pip install torchvision-0.11.3+cu113-cp38-cp38-linux_x86_64.whl
pip install torch-1.10.2+cu113-cp38-cp38-linux_x86_64.whl
```

Prepare mmcv for BEVFusion

```shell
pip install https://download.openmmlab.com/mmcv/dist/cu113/torch1.10.0/mmcv_full-1.4.5-cp38-cp38-manylinux1_x86_64.whl
```

Install other requirements

```shell
pip install -r requirements/dev.txt
```

Install diffusers

```shell
cd third_party/diffusers
pip install .
```

Install BEVFusion

```shell
cd third_party
git clone https://github.com/mit-han-lab/bevfusion.git
cd bevfusion
python setup.py develop
```

## Pretrained Weights

The training is based on [stable-diffusion-v1-5](https://huggingface.co/stable-diffusion-v1-5/stable-diffusion-v1-5). Put them at `${ROOT}/pretrained/` as follows:

```
{ROOT}/pretrained/stable-diffusion-v1-5/
├── text_encoder
├── tokenizer
├── unet
├── vae
└── ...
```

