import type { CollectionEntry } from "astro:content";
import type { SearchType } from "../../pages/search/_page";

export const AppUrl = {
  home() {
    return "/";
  },
  campaigns() {
    return "/campaigns";
  },
  docs() {
    return "/docs";
  },
  patreon() {
    return "https://www.patreon.com/bePatron?u=43408921";
  },
  creator(props: { slug: CollectionEntry<"creators">["slug"] }) {
    return `/creators/${props.slug}`;
  },
  game(props: { slug: CollectionEntry<"games">["slug"] }) {
    return `/games/${props.slug}`;
  },
  resource(props: { slug: CollectionEntry<"resources">["slug"] }) {
    return `/resources/${props.slug}`;
  },
  resourcePage(props: {
    slug: CollectionEntry<"resources">["slug"];
    page: string;
  }) {
    const [creatorSegment, resourceSegment, languageSegment] =
      props.slug.split("/");

    if (languageSegment) {
      return `/resources/${creatorSegment}/${resourceSegment}.${languageSegment}/${props.page}`;
    }
    return `/resources/${props.slug}/${props.page}`;
  },
  asset(props: { slug: CollectionEntry<"assets">["slug"] }) {
    return `/games/${props.slug}`;
  },
  search(props: { query?: string; type?: SearchType }) {
    const searchParams = new URLSearchParams();
    if (props.query) {
      searchParams.set("query", props.query);
    }
    if (props.type) {
      searchParams.set("type", props.type);
    }
    return `/search?${searchParams.toString()}`;
  },
};
