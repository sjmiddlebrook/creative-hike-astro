import satori, { type SatoriOptions } from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { type CollectionEntry } from 'astro:content';
import postOgImage from './og-templates/post';
import siteOgImage from './og-templates/site';

async function fetchFonts() {
  const fontNormalUrl =
    'https://creativehike.com/fonts/JetBrainsMono-Regular.ttf';
  const fontBoldUrl = 'https://creativehike.com/fonts/JetBrainsMono-Bold.ttf';
  const [fontNormalRes, fontBoldRes] = await Promise.all([
    fetch(fontNormalUrl),
    fetch(fontBoldUrl),
  ]);
  const [fontNormal, fontBold] = await Promise.all([
    fontNormalRes.arrayBuffer(),
    fontBoldRes.arrayBuffer(),
  ]);
  return { fontNormal, fontBold };
};

const { fontNormal, fontBold } = await fetchFonts();

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: 'JetBrains Mono',
      data: fontNormal,
      weight: 400,
      style: 'normal',
    },
    {
      name: 'JetBrains Mono',
      data: fontBold,
      weight: 700,
      style: 'normal',
    },
  ],
};

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<'posts'>) {
  const svg = await satori(postOgImage(post), options);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await satori(siteOgImage(), options);
  return svgBufferToPngBuffer(svg);
}
