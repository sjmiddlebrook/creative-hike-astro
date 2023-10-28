---
title: 'Multiple Generics in TypeScript'
description: 'Example of using multiple generics in a function in TypeScript'
pubDate: '2023-10-28'
draft: false
tags: ['web-fundamentals', 'dev', 'typescript']
---
Generics can provide even more power when you use multiple generic type variables for a function

```typescript
function swapKeyValue<K, V>(key: K, value: V): [V, K] {
    return [value, key];
}
// swapped is typed [number, string]
let swapped = swapKeyValue('answer', 42)
```

Sometimes, instead of passing multiple separate arguments to a function, it might be more beneficial to pass an object with properties of different types. This approach can enhance readability, extensibility, and help manage functions with many parameters. We can still define multiple generics in the same way

```typescript
function swapKeyValue<K, V>(obj: { key: K; value: V }): [V, K] {
    return [obj.value, obj.key];
}
// swapped is typed [number, string]
let swapped = swapKeyValue({ key: 'answer', value: 42 })

```
