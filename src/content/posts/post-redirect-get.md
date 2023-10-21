---
title: 'HTML Forms and PRG'
description: 'Handling HTML Form submissions and preventing a resubmission on back or refresh'
pubDate: '2023-10-21'
draft: false
tags: ['web-fundamentals', 'dev', 'html']
---

HTML Forms only allow two methods: GET and POST

```sql
<form method="GET">
```

```sql
<form method="POST">
```

For GET, the browser serializes the form data and builds a query string. The default behavior is to refresh the page with the url and the query string.

For POST, the browser does not use a query string but instead creates a payload with the data encoded as **application/x-www-form-urlencoded**

By default the POST will sent to the url but you can change the behavior with an action attribute

```sql
<form action="/somewhere-else">
```

## Fixing the Back button

After a POST is submitted and HTML is returned, if the user clicks the back button or refreshes then the browser will want to perform the same action of submitting another POST with the same data. However, this is rarely what you would want to happen. To avoid this resubmission, the server should respond to the POST with a Redirect response - status 303.

There is even a wikipedia page for the [Post-Redirect-Get Pattern](https://en.wikipedia.org/wiki/Post/Redirect/Get)

Example redirect response

```json
Response.redirect("https://www.example.com", 303);
```

After the redirect a new GET request will be made to the Location defined in the header. Now when the user refreshes the page, the resubmission will be a GET request and avoid the duplicate POST submission.
