---
title: HuggingFace datasets
toc: true
thumbnail: https://t.mwm.moe/fj?random=HuggingFace-datasets
cover: https://t.mwm.moe/fj?random=HuggingFace-datasets
date: 2024-10-14 15:28:11
tags:
    - HuggingFace
categories:
    - Code Piece
---

A guidance of usage for Hugging Face datasets.

<!--more-->

## Install

Start by installing 🤗 Datasets:

```bash
pip install datasets
```

🤗 Datasets also support audio and image data formats:

```bash
pip install datasets[audio]
pip install datasets[vision]
```

## Load Dataset

Import load_dataset:

```python
from datasets import load_dataset
```

Load remote dataset:

```python
dataset = load_dataset("glue", "mrpc", split="train")
```

Load local CSV files:

```python
dataset1 = load_dataset('csv', data_files='data.csv')
dataset2 = load_dataset('csv', data_files=['train.csv', 'test.csv'])
dataset3 = load_dataset('csv', data_files='/path/to/directory/*.csv')
```

Load local JSON files:

```python
dataset = load_dataset('json', data_files='data.json')
```

Load local TXT files:

```python
dataset = load_dataset('text', data_files='data.txt')
```

## Load from disk

The dataset downloaded to the local machine via the 🤗 `datasets` library can be loaded using the `load_from_disk()` function. This function allows you to load datasets that have been previously cached or downloaded locally, without the need to fetch them again from the 🤗 database.

```python
from datasets import load_from_disk

local_dataset = load_from_disk("./local_imdb_dataset")

print(local_dataset)
```





