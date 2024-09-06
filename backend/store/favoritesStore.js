import {create} from 'zustand';

const useFavoritesStore = create((set, get) => ({
  favoriteProducts: [],
  addFavoriteProduct: (product) =>
    set((state) => ({
      favoriteProducts: [...state.favoriteProducts, product],
    })),
  removeFavoriteProduct: (productId) =>
    set((state) => ({
      favoriteProducts: state.favoriteProducts.filter((fav) => fav.id !== productId),
    })),
  isFavoriteProduct: (productId) =>
    get().favoriteProducts.some((fav) => fav.id === productId),
}));

export const useAddFavoriteProduct = () => useFavoritesStore((state) => state.addFavoriteProduct);
export const useRemoveFavoriteProduct = () => useFavoritesStore((state) => state.removeFavoriteProduct);
export const useFavoriteProducts = () => useFavoritesStore((state) => state.favoriteProducts);
export const useIsFavoriteProduct = (productId) => useFavoritesStore((state) => state.isFavoriteProduct(productId));