---
title: 'Learning Floating UI'
description: 'How to use the floating-ui package in a web project'
pubDate: '2024-01-20'
draft: true
tags: ['dev', 'html']
---

## Why use Floating UI

When developing a web application you are likely going to use UI components such as tooltips, popovers, dropdowns, or overlays. All these components need to be positioned relative to another element on the screen. As a developer you now need to figure out how to place these elements so the user will always be able to see them.

**Floating-ui** automatically places these elements in the right spot on the screen, even if the user is scrolling or resizing the window. This makes sure that important information is always easy to see and use, and it looks good on different devices and browsers.

## Middleware

**Flip**: places the element on the top or bottom depending on the position of the element on the screen

- Flip => y-axis

**Shift**: places the element to the left or right depending on the content in the element and how much horizontal space there is

- Shift => x-axis

**Offset**: gives the element some space from the reference element

## floating-ui with svelte

With svelte there is a package [svelte-floating-ui](https://github.com/fedorovvvv/svelte-floating-ui) that helps to create the floating ui elements with actions and stores.
