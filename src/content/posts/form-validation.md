---
title: 'HTML Form Validation'
description: 'Basics of HTML Form Validation for the client and the server'
pubDate: '2023-10-24'
draft: false
tags: ['web-fundamentals', 'dev', 'html']
---
## Client-side validation

The browser has some built-in form validation detailed at [MDN](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#using_built-in_form_validation)

Some of the attributes on form inputs are: required, type, min, max, minLength, maxLength, pattern

When a form input violates one of these rules, a default error message will be shown and the form will not be submitted. These are the easiest to use and can be combined with custom styles by using the css pseudo-class for the state of the input.

An additional benefit is the attributes also help with screen readers by announcing the fields are required

While the built-in form validation on the client is convenient, we must also do server-side validation because the client-side is easy to bypass. For instance, a user can edit the html themselves, or they can directly submit a request to the api and bypass the form altogether

## Server-side

Server-side form validation is a must since it is your last line of defense. Your server should ensure that data conforms to the expected types and and required fields are filled. Any additional checks for valid ranges or sanitization should be done.

To help with this in a typescript environment we can use [Zod](https://zod.dev/). As a flexible schema validator, we can use Zod to parse the form data on the server to then validate the fields meet any requirements we have.

```tsx
import { z } from "zod";

const noteSchema = z.object({
  title: z.string().min(1).max(200),
	content: z.string().min(1),
});

// passes validation and value is returned
noteSchema.parse({ title: "Note", content: "Body of the note" });
// fails validation and throws error
noteSchema.parse({ title: "", content: "Body of the note" });

```
The validation methods for zod are extensive and these can be a powerful tool for checking the formData that is sent to the server.
