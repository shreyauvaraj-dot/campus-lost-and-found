import { INITIAL_MOCK_ITEMS } from '../data/mockItems';

const STORAGE_KEY_ITEMS = 'campus_lost_found_items_v1';
const STORAGE_KEY_SAVED = 'campus_lost_found_saved_ids_v1';
const STORAGE_KEY_MY_POSTS = 'campus_lost_found_my_posts_v1';

export const storageService = {
  // Get all items (initializes with mock if first time)
  getItems: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ITEMS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(INITIAL_MOCK_ITEMS));
        return INITIAL_MOCK_ITEMS;
      }
      return JSON.parse(stored);
    } catch (err) {
      console.error('Error reading items from localStorage:', err);
      return INITIAL_MOCK_ITEMS;
    }
  },

  // Save new item
  addItem: (newItemData) => {
    try {
      const items = storageService.getItems();
      const itemWithMeta = {
        ...newItemData,
        id: `item-${Date.now()}`,
        date: new Date().toISOString(),
        status: 'active',
        views: 1
      };
      const updated = [itemWithMeta, ...items];
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(updated));

      // Record in user's personal created posts
      const myPosts = storageService.getMyPostIds();
      localStorage.setItem(STORAGE_KEY_MY_POSTS, JSON.stringify([...myPosts, itemWithMeta.id]));

      return itemWithMeta;
    } catch (err) {
      console.error('Error adding item:', err);
      throw err;
    }
  },

  // Update item (e.g. resolve / claim / edit)
  updateItem: (id, updates) => {
    try {
      const items = storageService.getItems();
      const updated = items.map((item) => {
        if (item.id === id) {
          return { ...item, ...updates };
        }
        return item;
      });
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(updated));
      return updated.find((i) => i.id === id);
    } catch (err) {
      console.error('Error updating item:', err);
      throw err;
    }
  },

  // Mark item as resolved/reunited
  resolveItem: (id, claimedBy = 'Verified Student') => {
    return storageService.updateItem(id, {
      status: 'resolved',
      resolvedDate: new Date().toISOString(),
      claimedBy
    });
  },

  // Delete item
  deleteItem: (id) => {
    try {
      const items = storageService.getItems();
      const updated = items.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(updated));

      // Also clean from my posts
      const myPosts = storageService.getMyPostIds().filter((postId) => postId !== id);
      localStorage.setItem(STORAGE_KEY_MY_POSTS, JSON.stringify(myPosts));

      return true;
    } catch (err) {
      console.error('Error deleting item:', err);
      return false;
    }
  },

  // Increment view count
  incrementViews: (id) => {
    try {
      const items = storageService.getItems();
      const updated = items.map((item) => {
        if (item.id === id) {
          return { ...item, views: (item.views || 0) + 1 };
        }
        return item;
      });
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(updated));
    } catch (err) {
      console.error('Error incrementing views:', err);
    }
  },

  // Bookmarks / Saved IDs
  getSavedIds: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SAVED);
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      return [];
    }
  },

  toggleBookmark: (id) => {
    const saved = storageService.getSavedIds();
    let updated;
    if (saved.includes(id)) {
      updated = saved.filter((i) => i !== id);
    } else {
      updated = [...saved, id];
    }
    localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(updated));
    return updated;
  },

  // User's own posts tracking
  getMyPostIds: () => {
    try {
      const posts = localStorage.getItem(STORAGE_KEY_MY_POSTS);
      return posts ? JSON.parse(posts) : ['item-1', 'item-3']; // Seed a couple for immediate demo
    } catch (err) {
      return [];
    }
  },

  // Reset all data to factory demo state
  resetToDefault: () => {
    localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(INITIAL_MOCK_ITEMS));
    localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEY_MY_POSTS, JSON.stringify(['item-1', 'item-3']));
    return INITIAL_MOCK_ITEMS;
  }
};
