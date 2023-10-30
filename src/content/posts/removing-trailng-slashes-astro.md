---
title: 'Removing Trailing Slashes with Astro'
description: 'How to remove the trailing slash from an Astro static site.'
pubDate: '2023-10-30'
draft: true
tags: ['web', 'astro']
---

I have deployed a couple of sites with Astro on Cloudflare but both have been in ssr mode. Specifically, with directory mode on Cloudflare:

```javascript
// astro.config.mjs for ssr
{
  ...,
  adapter: cloudflare({ mode: 'directory' }),
}

```
However, for this site, I deployed using static mode (ssg) and deployed on cloudflare. The builds and deployments were fine but I noticed my urls had a trailing slash that I wanted to remove. After some head scratching and experimenting, I found the fix to be to update the config for build format to file.

Per the [docs](https://docs.astro.build/en/reference/configuration-reference/#buildformat), The default value is directory so updating this to file and adding the trailingSlash to never did the trick.

```javascript
// astro.config.mjs for ssg
{
  ...,
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
}

```
