import type { APIRoute } from "astro";
import type { CollectionEntry } from "astro:content";
import { DLAstro } from "../../../../../../domains/dl/DLAstro";
import { DocParser } from "../../../../../../domains/document/DocParser";
import { renderOgImage } from "../../../../../../domains/og-image/renderOgImage";

export const prerender = false;

export type Params = {
  creatorSlug: CollectionEntry<"creators">["slug"];
  resourceSlug: string;
  pageSlug: string;
};

export const GET: APIRoute = async (ctx) => {
  const params = ctx.params as Params;

  const { creator, resource } = await DLAstro.getResource({
    slug: `${params.creatorSlug}/${params.resourceSlug}` as any,
    includeCreator: true,
  });

  const parser = new DocParser({
    markdown: resource.body,
    currentChapterId: params.pageSlug,
  });
  const doc = parser.getDoc();

  return await renderOgImage({
    title: resource.data.name,
    description: doc.currentPage.title,
    footerItems: [`By ${creator!.data.name}`],
    src: resource.data.image?.src,
    accentColor: resource.data.theme?.accentColor,
  });
};
