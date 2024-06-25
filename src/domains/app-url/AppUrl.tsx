import type { CollectionEntry } from "astro:content";

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
  creator(props: { slug: CollectionEntry<"creators">["slug"] }) {
    return `/creators/${props.slug}`;
  },
  game(props: { slug: CollectionEntry<"games">["slug"] }) {
    return `/games/${props.slug}`;
  },
  asset(props: { slug: CollectionEntry<"assets">["slug"] }) {
    return `/games/${props.slug}`;
  },
};
