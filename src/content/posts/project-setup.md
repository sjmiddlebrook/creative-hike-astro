---
title: 'Project Setup'
description: 'Getting started with a new project'
pubDate: '2023-10-18'
tags: ['project-start']
---

Getting a repo setup before you start a project.

## Import Aliases

Clean up projects imports with aliases

Instead of referencing a Header component with the following file path `../../../components/Header`

The imports become `@components/Header`

To setup the alias, you need to set the baseUrl and then define the paths in `.tsconfig`
```json
{
  ...,
  "compilerOptions": {
    ...,
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}

```

This will help with simplifying the import statements and copying over imports to new files.

## Prettier

Code formatting is essential and I try to keep it as basic as possible

```bash
npm install -D prettier
```

Sample prettier config saved in the root directory `.prettierrc`

```json
{
  "bracketSpacing": true,
  "tabWidth": 2,
  "singleQuote": true
}
```

If working with tailwind then I also install the prettier plugin for class sorting

```bash
npm install -D prettier-plugin-tailwindcss
```

```json
{
  ...,
  "plugins": [
    "prettier-plugin-tailwindcss"
  ]
}
```
