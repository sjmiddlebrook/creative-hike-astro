---
title: 'Dynamic OG Images'
description: 'Creating Dynamic OG Images for Posts. How to generate custom images to show when urls are shared on sites such as Facebook or Twitter.'
pubDate: '2023-10-19'
draft: false
tags: ['web', 'seo']
---

## What are OG Images

OG = Open Graph

OG Images are what are shown in the preview when a website is shared on social sites. Ideally each page will have a custom image displayed that is tailored to the content on the specific url shared. We are going to break down how to dynamically generate these.

Read more about the [Open Graph Protocol](https://ogp.me/)

## Vercel Satori

Install satori from Vercel [Github](https://github.com/vercel/satori)

Satori will allow you to write JSX syntax to generate SVGs

### Using Custom Fonts

One of the options you can configure with Satori is setting up custom fonts. For this you need to get the fonts as an ArrayBuffer.

```typescript
const [fontNormalRes, fontBoldRes] = await Promise.all([
  fetch(fontNormalUrl),
  fetch(fontBoldUrl),
]);
const [fontNormal, fontBold] = await Promise.all([
  fontNormalRes.arrayBuffer(),
  fontBoldRes.arrayBuffer(),
]);
```

Then pass the options object as the second parameter when calling satori

```typescript
const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: 'JetBrains Mono',
      data: fontNormal,
      weight: 400,
      style: 'normal',
    },
    {
      name: 'JetBrains Mono',
      data: fontBold,
      weight: 700,
      style: 'normal',
    },
  ],
};
const svg = await satori(
  <div style={{ color: 'black' }}>Custom OG Image</div>
  , options
);
```

## Transforming SVG to PNG

The output of Satori will be an svg but then to transform it into a png you can use a tool like [Resvg-js](https://github.com/yisibl/resvg-js)

```typescript
const resvg = new Resvg(svg);
const pngData = resvg.render();
const png = pngData.asPng();
```

The png can then be generated at a url that is set as part of the meta data

```html
<meta property="og:image" content="url_with_dynamic_png" />
```
