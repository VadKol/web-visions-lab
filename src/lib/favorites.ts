const STORAGE_KEY = "blog_favorites";

export interface FavoriteArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  tag_list: string[];
  user: {
    name: string;
    profile_image: string;
  };
  reading_time_minutes: number;
  cover_image: string | null;
  saved_at: string;
}

export const getFavorites = (): FavoriteArticle[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const addFavorite = (article: Omit<FavoriteArticle, "saved_at">): void => {
  const favorites = getFavorites();
  if (!favorites.some((f) => f.id === article.id)) {
    favorites.unshift({ ...article, saved_at: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }
};

export const removeFavorite = (articleId: number): void => {
  const favorites = getFavorites().filter((f) => f.id !== articleId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};

export const isFavorite = (articleId: number): boolean => {
  return getFavorites().some((f) => f.id === articleId);
};

export const clearFavorites = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
