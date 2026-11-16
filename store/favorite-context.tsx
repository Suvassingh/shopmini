import { createContext, useState, type ReactNode } from "react";

type FavoritesContextType = {
  ids: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  ids: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

export default function FavoritesContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favoritesIds, setFavoritesIds] = useState<number[]>([]);

  function addFavorites(id: number) {
    setFavoritesIds((cur) => (cur.includes(id) ? cur : [...cur, id]));
  }

  function removeFavorites(id: number) {
    setFavoritesIds((cur) => cur.filter((x) => x !== id));
  }

  return (
    <FavoritesContext.Provider
      value={{
        ids: favoritesIds,
        addFavorite: addFavorites,
        removeFavorite: removeFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
