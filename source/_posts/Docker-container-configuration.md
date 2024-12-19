---
title: Docker container configuration
toc: true
thumbnail: https://t.mwm.moe/fj?random=Docker container configuration
cover: https://t.mwm.moe/fj?random=Docker container configuration
date: 2024-10-01 13:46:11
tags:
    - Docker
categories:
    - Environment Configuration
---

A guidance of configuration for Docker container.



<!--more-->

## Install requirements

### Check Nvidia

```bash
nvidia-smi
```

### Install Docker

```bash
sudo apt-get update
sudo apt-get install docker.io
docker --version
```

### Install Nvidia Docker Toolkit

```bash
sudo apt-get install nvidia-docker2
sudo systemctl restart docker
```



## Create Docker container support for GPUs

### Look up in [nvidia/cuda Tags | Docker Hub](https://hub.docker.com/r/nvidia/cuda/tags)

```bash
sudo docker pull nvidia/cuda:12.4.1-base-ubuntu22.04
```

### Create container

```bash
docker run -it --gpus all --name my_gpu_container nvidia/cuda:12.4.1-base-ubuntu22.04 /bin/bash
```



## Environment configuration in container

```bash
apt-get update
...
```



## Others

### Stop container

```bash
docker stop my_gpu_container
```

### Start container

```bash
docker start my_gpu_container
```

### Enter an active container

```bash
docker exec -it my_gpu_container /bin/bash
```

### Delete container

```bash
docker rm my_gpu_container
```



