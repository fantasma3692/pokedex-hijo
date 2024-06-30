import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { usePokemonStore } from "./PokemonStore";

export const usePokemonFavoritosStore = create(
  persist(
    (set) => ({
      favorites: [],
      favoriteCount: 0,
      addFavoritos: (p) =>
        set((state) => ({
          favorites: [...state.favorites, p],
          favoriteCount: state.favoriteCount + 1,
        })),
      clearFavoritos: () => {
        set(() => ({ favorites: [], favoriteCount: 0 }));
     
       
      },
      removeFavorito: (p) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (pokemon) => pokemon.details.id !== p
          ),
          favoriteCount: state.favoriteCount - 1,
        })),
    }),
    {
      name: "pokemon favoritos",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
