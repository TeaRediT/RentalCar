import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (cardId: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (carId) =>
        set((state) => {
          if (state.favorites.includes(carId)) {
            return {
              favorites: state.favorites.filter((id) => id !== carId),
            };
          }
          return {
            favorites: [...state.favorites, carId],
          };
        }),
    }),
    {
      name: "favorite-cars-storage",
    },
  ),
);
