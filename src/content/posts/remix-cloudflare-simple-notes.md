---
title: 'A Basic Notes App in Remix'
description: 'Building a Notes App to learn Remix patterns and deploying an app on Cloudflare'
pubDate: '2023-10-23'
draft: false
tags: ['remix', 'cloudflare']
---
To get comfortable with the Remix way of doing things, I tried to create a basic notes app to solidify my understanding. I also wanted to try to deploy something on Cloudflare after setting up a starter in a previous post.

The repo with the code is [here on Github](https://github.com/sjmiddlebrook/remix-cloudflare-notes-v2)

And the live demo hosted on Cloudflare is found [here](https://remix-cloudflare-notes-v2.pages.dev/)

The notes app has some basic functionality where you can add a category and then add a note within a category. I wanted to try the nested layouts in Remix so a note is nested within a category in this case.

The note creation uses actions for Remix to create, update, or delete a note. The same actions are allowed for each category.

To simplify the app, there isn’t any user authentication added. Instead I add a cookie to associate the user with their notes and if the cookie is cleared then the notes will be gone.

To persist the notes, I used Cloudflare KV to save and read from. All the logic for reading and updating notes is in the `kv-notes.ts` which could be switched out to a database for future use.
