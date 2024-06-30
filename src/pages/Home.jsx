import { usePokemonStore } from "../store/PokemonStore";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { HomeTemplate } from "../components/templates/HomeTemplate";
export function Home() {
  const { fetchPokemons, buscarPokemon, buscador } = usePokemonStore();
 

 useQuery({
    queryKey: ["buscar pokemon", buscador],
    queryFn: () => buscarPokemon(buscador),enabled:!!buscador
  });
 

  return <HomeTemplate />;
}
