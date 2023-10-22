---
title: 'Remix with Cloudflare'
description: 'Setting up a Remix project to deploy on Cloudflare'
pubDate: '2023-10-22'
draft: false
tags: ['remix', 'cloudflare']
---

## First Attempt

I found a page on cloudflare that covers [deploying a remix site](https://developers.cloudflare.com/pages/framework-guides/deploy-a-remix-site/)

As of writing this on October 22nd, it looked like the guide had been updated 8 days ago and should reflect the latest from Remix.

Starting with command line

```bash
npm create cloudflare@latest remix-cloudflare-notes -- --framework=remix
```

Had to login to my Cloudflare account with wrangler and let the CLI tool do the rest

Everything went pretty quickly until the “Waiting for DNS to propagate” which stopped updating after 54 seconds and never finished

```bash
Waiting for DNS to propagate (54s) ...
```

I killed the process and checked the directory and everything seemed to be in place

The App was deployed successfully but there were some issues making the first changes. After running `npm run dev` the LiveReload wasn’t working and reloading the page would generate an error in the terminal without showing any changes.

```bash
workerd/util/symbolizer.c++:98: warning: Not symbolizing stack traces because $LLVM_SYMBOLIZER is not set. To symbolize stack traces, set $LLVM_SYMBOLIZER to the location of the llvm-symbolizer binary. When running tests under bazel, use `--test_env=LLVM_SYMBOLIZER=<path>`.
workerd/jsg/jsg.c++:136: error: took recursive isolate lock; kj::getStackTrace() = 1000947e7 1004ff8fb 1005133c3 100513347 101e5b2fb 1007e8e2b 1007e9b57 100746943 100746b73
```

If I killed the dev server and restarted everything looked ok but I faced the same error with the next changes. After committing to main there was no automatic deployment. It looked like the initial project creation setup a `pages:deploy` script in the package.json which worked successfully. It wasn’t clear how to change this to be an automatic deploy with Cloudflare.

Overall the setup was smooth but if the live reload isn’t working this is kind of a non-starter. I decided to try another method to see if it was the same.

## Second Attempt

Using the official template from the Remix docs [here](https://remix.run/docs/en/main/guides/templates)

```bash
npx create-remix@latest --template remix-run/remix/templates/cloudflare-pages
```

This created a project that had the same structure but the `npm run dev` seemed to work as expected after a change and refreshing the page.

However, this approach you need to wire up the deployment in the Cloudflare dashboard manually. After pushing the starter to git, in Cloudflare under Workers & Pages, I created an application and created a project with the Connect to Git approach.

This successfully deployed the Remix project and on the next commit to git, there was an automatic deployment. The remix template seems to be the better approach for now.

## Styling with Tailwind

Following the guide from Remix [docs](https://remix.run/docs/en/main/styling/tailwind)

Everything worked as expected once the css file with the tailwind directives was added to the links export.

```typescript
import tailwindStyles from './tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindStyles },
  ...
];
```
