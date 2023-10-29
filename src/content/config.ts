import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
	schema: ({image}) =>  z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

export const collections = { posts };
