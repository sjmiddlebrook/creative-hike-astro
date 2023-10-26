---
title: 'Conditional Types in Typescript'
description: 'Dynamic type assignments based on conditions in Typescript'
pubDate: '2023-10-26'
draft: false
tags: ['web-fundamentals', 'dev', 'typescript']
---

TypeScript offers an array of advanced type capabilities, one of the most powerful being conditional types. This feature allows developers to set types dynamically based on certain conditions.

At a first glance, the syntax for conditional types in TypeScript might seem familiar. It resembles the ternary conditional operator in JavaScript:

```javascript
condition ? value_if_true : value_if_false
```

Consider this simple JavaScript example:

```javascript
const score = 85;
const result = score >= 70 ? "pass" : "fail";
console.log(result); // Outputs: "pass"
```

Translating this idea to TypeScript, we can determine types conditionally based on a type parameter. This dynamic typing ability brings a lot of flexibility to type definitions.

Here's an illustrative example from the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html):

```typescript
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
```

In this example, `NameOrId` will resolve to either the `IdLabel` or `NameLabel` type, depending on whether the type parameter `T` is a `number` or a `string`. This enables more precise typing based on specific conditions.
