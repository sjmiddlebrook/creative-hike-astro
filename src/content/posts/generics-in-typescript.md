---
title: 'Generics in TypeScript'
description: 'Basic example of a generic function in TypeScript'
pubDate: '2023-10-27'
draft: false
tags: ['web-fundamentals', 'dev', 'typescript']
---

## What Are Generics?

Generics allow us to create flexible and reusable functions that can work with any data type, while still keeping type safety.

This allows us to leverage the type-checking power of TypeScript without having to explicity type everything.

## Basic Generic Function

With generics, one function can cater to both strings and numbers, using a **type variable** 'T'. You can use any name for the Generic so 'T' is just shorthand for Type.

```tsx
function echo<T>(item: T): T {
  return item;
}
const echoStringConst = echo('test'); // will be typed as 'test'
let echoStringLet = echo('test'); // will be typed as string
const echoNumber = echo(1); // will be typed as 1
let echoNumber = echo(1); // will be typed as number
```

Functions can adapt to various data shapes without explicitly passing types. Note the distinction when using **`const`** versus **`let`**: **`const`** narrows the type, while **`let`** opts for a broader type.
