// Initial BOEA Blog & News Data (Empty until published by admin)
export const INITIAL_BLOG_POSTS = [];

const LOCAL_STORAGE_KEY = 'boea_blog_posts';

export function getStoredBlogPosts() {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading blog posts from localStorage:', e);
  }
  return INITIAL_BLOG_POSTS;
}

export function saveBlogPosts(posts) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
  } catch (e) {
    console.error('Error saving blog posts to localStorage:', e);
  }
}
