import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = (ctx) => {
  const sitemapURL = new URL("sitemap-index.xml", ctx.site);
  return new Response(getRobotsTxt(sitemapURL));
};
