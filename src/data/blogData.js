// Initial BOEA Blog & News Data (Empty until published by admin)
export const INITIAL_BLOG_POSTS = [];

// Blog posts are CMS-backed (see `src/lib/cms.js`): the admin publishes once
// and every visitor reads the same list. The local cache below is only the
// fallback for first paint / unconfigured Firebase.
import { cmsFetch, cmsSave, readCache, CMS_PATHS } from '../lib/cms';

/** Synchronous cache read for first paint. */
export function getStoredBlogPosts() {
  const cached = readCache(CMS_PATHS.blog, null);
  return Array.isArray(cached) ? cached : INITIAL_BLOG_POSTS;
}

/** Live read from the database (falls back to cache / empty). */
export async function fetchBlogPosts() {
  const fetched = await cmsFetch(CMS_PATHS.blog, null);
  return Array.isArray(fetched) ? fetched : getStoredBlogPosts();
}

/** Publish a list. Returns the CMS save result `{ ok, cloud }`. */
export async function saveBlogPosts(posts) {
  return cmsSave(CMS_PATHS.blog, posts);
}
