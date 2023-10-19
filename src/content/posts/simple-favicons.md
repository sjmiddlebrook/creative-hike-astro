---
title: 'Simple Favicons'
description: 'Adding a responsive favicon'
pubDate: '2023-10-20'
draft: true
tags: ['project-start', 'dev', 'css']
---

## What is a favicon?

The small icon in you browser bar that shows next to the page title.

## How to update?

One of the first things you probably want to change in a new project is the favicon.

For older projects there may be a `favicon.ico` at the website's root.

Instead of the ico format we can use an svg.

Save a `favicon.svg` in the website root and then update the `head` to include a link to the new favicon

```html
<head>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
</head>
```

## Why use SVG?

With an svg favicon we can use css media queries to update the icon if the user preference is set to dark mode

```html
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 128 128">
    <style>
        rect { fill: #4C566A; }
        @media (prefers-color-scheme: dark) {
            rect { fill: #ECEFF4; }
        }
    </style>
    <rect width="128" height="128" rx="10" />
</svg>
```

And now your favicon should adapt with the user's settings
