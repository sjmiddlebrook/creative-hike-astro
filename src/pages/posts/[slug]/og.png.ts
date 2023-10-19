import type { APIRoute } from 'astro';
import { type CollectionEntry, getCollection } from 'astro:content';
import { generateOgImageForPost } from '@utils/og-images';

export async function getStaticPaths() {
  const posts = await getCollection('posts').then((p) =>
    p.filter(({ data }) => !data.draft && !data.ogImage),
  );

  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) =>
  new Response(
    await generateOgImageForPost(props as CollectionEntry<'posts'>),
    {
      headers: { 'Content-Type': 'image/png' },
    },
  );
