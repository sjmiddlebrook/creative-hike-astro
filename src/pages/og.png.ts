import type { APIRoute } from "astro";
import { generateOgImageForSite } from "@utils/og-images";

export const GET: APIRoute = async () =>
  new Response(await generateOgImageForSite(), {
    headers: { "Content-Type": "image/png" },
  });
