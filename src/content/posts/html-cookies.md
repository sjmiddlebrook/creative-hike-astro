---
title: 'HTML Cookies'
description: 'What are HTML cookies used for and an overview of how cookies work'
pubDate: '2023-10-25'
draft: false
tags: ['web-fundamentals', 'dev', 'html']
---
## What is a cookie?

A cookie is a small amount of data stored in a user’s web browser that is passed between the server and the client.

Common use cases for cookies include session management for logins, user preferences, and tracking.

Cookies get sent along with every relevant request by the browser.

## Types of Cookies

**Session** Cookies ⇒ these are deleted when the user closes their browser

**Persistent** Cookies ⇒ remain on the user’s computer until they expire (or are deleted)

**Third-party** Cookies ⇒ used for tracking and advertising, these are set by outside domains

## How to set a cookie

Other than the key and value, cookies can be defined with a expiry date and a path. The cookie will be deleted after the expiry date if set. The path allows you to configure which URLs the cookie should be sent to.

### Client-side

```typescript
document.cookie = "foo=bar; expires=Thu, 24 Oct 2024 12:00:00 UTC; path=/";
```

### Server-side

this will depend on the framework being used but here is one way

```typescript
const response = new Response(body, {
	headers: {
		'set-cookie': 'foo=bar; expires=Thu, 24 Oct 2024 12:00:00 UTC; path=/',
	},
})
```

## Summary

One way to manage sending user session information

Good used for small amounts of data

For data needed on initial page render, cookies are often used because they are automatically sent with the request
