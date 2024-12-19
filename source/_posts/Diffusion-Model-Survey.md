---
title: "Diffusion Models: A Comprehensive Survey of Methods and Applications"
toc: true
thumbnail: https://t.mwm.moe/fj?random=Diffusion-Models-Survey
cover: https://t.mwm.moe/fj?random=Diffusion-Models-Survey
date: 2024-09-24 16:03:42
tags: 
    - Diffusion Model
    - Survey
categories: 
    - Paper
    - Diffusion Model
---

Diffusion models have emerged as a powerful new family of deep generative models with record-breaking performance in many applications, including image synthesis, video generation, and molecule design. In this survey, we provide an overview of the rapidly expanding body of work on diffusion models, categorizing the research into three key areas: efficient sampling, improved likelihood estimation, and handling data with special structures. We also discuss the potential for combining diffusion models with other generative models for enhanced results. We further review the wide-ranging applications of diffusion models in fields spanning from computer vision, natural language processing, temporal data modeling, to interdisciplinary applications in other scientific disciplines.

<!--more-->

## FOUNDATIONS OF DIFFUSION MODELS

Diffusion models are a family of probabilistic generative models that progressively destruct data by injecting noise, then learn to reverse this process for sample generation. Current research on diffusion models is mostly based on three predominant formulations: denoising diffusion probabilistic models (DDPMs), score-based generative models (SGMs), and stochastic differential equations (Score SDEs).

### Denoising Diffusion Probabilistic Models (DDPMs)

A denoising diffusion probabilistic model (DDPM) makes use of two Markov chains: a forward chain that perturbs data to noise, and a reverse chain that converts noise back to data.

![](https://raw.githubusercontent.com/Breynald/ImageSource/main/blogs/Diffusion%20Model%20Survey/DDPMs.png)

Formally, given a data distribution $x\_0 \sim q(x\_0)$, the forward Markov process generates a sequence of random variables $x\_1$, $x\_2$ . . . $x\_T$ with transition kernel $q(x\_t \mid x\_{t-1})$. The joint distribution of $x\_1$, $x\_2$ . . . $x\_T$ conditioned on $x\_0$, denoted as $q(x\_1, . . . , x\_T \mid x\_0)$: 

$$
q(x\_1, . . . , x\_T \mid x\_0) = \prod_{i=1}^T q(x\_t \mid x\_{t-1}) \tag{1.1} 
$$
One typical design for the transition kernel is Gaussian perturbation, and the most common choice for the transition kernel is
$$
q(x\_t \mid x\_{t−1}) = \mathcal{N} (x\_t ; \sqrt{1 − \beta\_t} x\_{t−1} , \beta\_t I) \tag{1.2}
$$
This Gaussian transition kernel allows us to marginalize the joint distribution in Eq. (1.1) to obtain the analytical form of  $q(x\_t \mid x\_0)$ for all $t \in {0, 1, · · · ,T }$. Specifically, with $\alpha\_t := 1 − βt$ and $\overline\alpha\_t := \prod\_{s=0}^t \alpha\_s $, we have
$$
q(x\_t \mid x\_0) = \mathcal{N}(x\_t; \sqrt{\overline\alpha\_t} x_0, (1-\overline\alpha\_t)I) \tag {1.3}
$$
Given $x\_0$, we can easily obtain a sample of $x\_t$ by sampling a Gaussian vector $\epsilon \sim \mathcal{N} (0, I)$ and applying the transformation
$$
x\_t = \sqrt{\overline\alpha\_t}x\_0 + \sqrt{1-\overline\alpha\_t}\epsilon \tag{1.4}
$$
The learnable transition kernel $p\_{\theta} (x\_{t−1} \mid x\_t )$ takes the form of
$$
p\_\theta(x\_{t-1} \mid x\_t) = \mathcal{N}(x\_{t-1}; \mu\_\theta(x\_t, t), \Sigma\_\theta(x\_t, t)) \tag{1.5}
$$
where $\theta$ denotes model parameters, and the mean $ \mu\_\theta(x\_t , t)$ and variance $\Sigma\_\theta(x\_t , t)$ are parameterized by deep neural networks.

Key to the success of this sampling process is training the reverse Markov chain to match the actual time reversal  of the forward Markov chain. This is achieved by minimizing the Kullback-Leibler (KL) divergence.

Ho et al. (2020) propose to reweight various terms in $L\_{VLB}$ for better sample quality and noticed an important equivalence between the resulting loss function and the training objective for noise-conditional score networks (NCSNs), one type of score-based generative models, in Song and Ermon. The loss takes the form of
$$
\mathbb{E}\_{t\sim\mathcal{U}[1, T], x\_0\sim q(x\_0), \epsilon\sim \mathcal{N}(0, I)}\left[\lambda(t)\Vert\epsilon - \epsilon\_\theta(x\_t, t)\Vert^2\right] \tag{1.6}
$$
where $\lambda(t)$ is a positive weighting function, $x\_t$ is computed from $x\_0$ and $\epsilon$ by Eq. (1.4), $\mathcal{U}[1, T]$ s a uniform distribution  over the set $\{1, 2, · · · ,T \}$, and $\epsilon_\theta$ is a deep neural network with parameter $\theta$ that predicts the noise vector $\epsilon$ given $x\_t$ and $t$.

### Score-Based Generative Models (SGMs)

The key idea of score-based generative models (SGMs) is to perturb data with a sequence of intensifying Gaussian noise and jointly estimate the score functions for all noisy data distributions by training a deep neural network model conditioned on noise levels (called a noise-conditional score network, NCSN).

![](https://raw.githubusercontent.com/Breynald/ImageSource/main/blogs/Diffusion%20Model%20Survey/SGMs.png)

With similar notations in DDPMs, we let $q(x\_0)$ be the data distribution, and $0 < \sigma\_1 < \sigma\_2 < · · · < \sigma\_t < · · · < \sigma_T$ be a sequence of noise levels. A typical example of SGMs involves perturbing a data point $x\_0$ to $x\_t$ by the Gaussian noise distribution $q(x\_t \mid x\_0) = \mathcal{N} (x\_t ; x\_0, \sigma\_t^2 I )$. This yields a sequence of noisy data densities $q(x\_1), q(x\_2), · · · , q(x\_T )$.

With denoising score matching and similar notations in Eq. (1.6), the training objective is given by
$$
\mathbb{E}\_{t\sim\mathcal{U}\text{〚}1, T \text{〛}, x\_0\sim q(x\_0), x\_t\sim q(x\_t\mid x\_0)}\left[\lambda(t)\sigma\_t^2\Vert \nabla\_{x\_t}\log {q(x\_t)} - s\_\theta(x\_t, t) \Vert^2 \right] \tag{1.7}
$$
$$
= \mathbb{E}\_{t\sim\mathcal{U}\text{〚}1, T \text{〛}, x\_0\sim q(x\_0), x\_t\sim q(x\_t\mid x\_0)}\left[\lambda(t)\sigma\_t^2\Vert \nabla\_{x\_t}\log {q(x\_t|x\_0)} - s\_\theta(x\_t, t) \Vert^2 \right] + const \tag{1.8}
$$
$$
= \mathbb{E}\_{t\sim\mathcal{U}\text{〚}1, T \text{〛}, x\_0\sim q(x\_0), x\_t\sim q(x\_t\mid x\_0)}\left[\lambda(t)\Vert -\frac{x\_t - x\_0}{\sigma\_t} - \sigma\_ts\_\theta(x\_t, t) \Vert^2 \right] + const \tag{1.9}
$$
$$
= \mathbb{E}\_{t\sim\mathcal{U}\text{〚}1, T \text{〛}, x\_0\sim q(x\_0), \epsilon\sim \mathcal{N}(0, I)}\left[\lambda(t)\Vert \epsilon + \sigma\_ts\_\theta(x\_t, t) \Vert^2 \right] + const \tag{1.10}
$$




### Stochastic Differential Equations (Score SDEs)

DDPMs and SGMs can be further generalized to the case of infinite time steps or noise levels, where the perturbation and denoising processes are solutions to stochastic differential equations (SDEs). We call this formulation Score SDE, as it leverages SDEs for noise perturbation and sample generation, and the denoising process requires estimating score functions of noisy data distributions.

Score SDEs perturb data to noise with a diffusion process governed by the following stochastic differential equation  (SDE):
$$
dx = f(x, t)dt + g(t)dw \tag{1.11}
$$
where $f (x, t) $and $g(t)$ are diffusion and drift functions of the SDE, and w is a standard Wiener process (a.k.a., Brownian motion). The forward processes in DDPMs and SGMs are both discretizations of this SDE. As demonstrated in Song et al. (2020), for DDPMs, the corresponding SDE is:
$$
dx = -\frac{1}{2}\beta(t)xdt + \sqrt{\beta(t)}dw \tag{1.12}
$$
where $\beta(\frac{t}{T}) = T\beta_t$ as $T$ goes to infinity; and for SGMs, the corresponding SDE is given by
$$
dx = \sqrt{\frac{d[\sigma(t)^2]}{dt}}dw \tag{1.13}
$$
where $\sigma(\frac{t}{T}) = \sigma\_t$ as $T$ goes to infinity. Here we use $q\_t (x)$ to denote the distribution of $x\_t$ in the forward process.

Crucially, for any diffusion process in the form of Eq. (1.9), Anderson shows that it can be reversed by solving the following reverse-time SDE:
$$
dx = \left[f(x, t) - g(t)^2\nabla\_x\log{q\_t(x)}\right]dt+g(t)d\overline{w} \tag{1.14}
$$
where $\overline{w}$ is a standard Wiener process when time flows backwards, and $dt$ denotes an infinitesimal negative time step.

Moreover, Song et al. (2020) prove the existence of an ordinary differential equation (ODE), namely the probability flow ODE, whose trajectories have the same marginals as the reverse-time SDE. The probability flow ODE is given by:
$$
dx = \left[ f(x, t) - \frac{1}{2}g(t)^2\nabla\_x\log{q\_t(x)} \right]dt \tag{1.15}
$$
Both the reverse-time SDE and the probability flow ODE allow sampling from the same data distribution as their trajectories have the same marginals.

Like in SGMs, we parameterize a time-dependent score model $s\_θ (x\_t , t)$ to estimate the score function by generalizing the score matching objective to continuous time, leading to the following objective:
$$
\mathbb{E}\_{t\sim\mathcal{U}[0, T], x\_0\sim q(x\_0), x\_t\sim q(x\_t\mid x\_0)}\left[\lambda(t)\Vert s\_\theta(x\_t, t) - \nabla\_{x\_t}\log {q\_{0t}(x\_t\mid x\_0)\Vert^2} \right] \tag{1.16}
$$
where $\mathcal{U}[0, T]$ denotes the uniform distribution over $[0,T ]$.

Subsequent research on diffusion models focuses on improving these classical approaches (DDPMs, SGMs, and Score SDEs) from three major directions: faster and more efficient sampling, more accurate likelihood and density estimation, and handling data with special structures (such as permutation invariance, manifold structures, and discrete data).

