import { getCollection } from "astro:content";

export async function getPosts({ limit }: { limit?: number } = {}) {
  const isDevMode = import.meta.env.DEV;
  let posts = await getCollection("posts");
  posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  posts = posts.filter((post) => {
    // in dev mode we want to see all posts
    if (isDevMode) return true;
    return !post.data.draft
  });

  if (limit) {
    return posts.slice(0, limit);
  }
  return posts;
}
