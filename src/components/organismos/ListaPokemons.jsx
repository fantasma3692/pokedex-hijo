import styled from "styled-components";
import { usePokemonStore } from "../../store/PokemonStore";
import { CardPokemonLista } from "../moleculas/CardPokemonLista";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Heart } from "../moleculas/Heart";
import { usePokemonFavoritosStore } from "../../store/PokemonFavoritosStore";
export function ListaPokemons() {
  const { pokemons, fetchPokemons } = usePokemonStore();
  const { addFavoritos, removeFavorito, favorites } =
    usePokemonFavoritosStore();
  //
  //funcion para agregar a favoritos
  const handleFavoriteClick = (pokemon) => {
    const isFavorite = favorites.some((fav) => fav.details.id === pokemon.details.id);
    // console.log(favorites)
    // console.log(pokemon)
    if (isFavorite) {
      removeFavorito(pokemon.details.id);
    } else {
      addFavoritos(pokemon);
    }
    
  };
  //uso useInfiniteQuery
  const { hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["mostrar pokemons"],
    queryFn: fetchPokemons,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
    initialPageParam: 0,
  });
  //

  const queryClient = useQueryClient();
  const queryState = queryClient.getQueryState(["mostrar pokemons"]);

  const isLoading = queryState?.status.isLoading;
  const isFetching = queryState?.status.isFetching;
  const isError = queryState?.status.isError;
  const error = queryState?.error;
  
  if (isLoading) {
    return <RingLoader color="#56ef0f" />;
  }
  if (isFetching) {
    return <ClimbingBoxLoader color="#fff" />;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
 
  return (
    <Container>
      <section className="contentpokemons">
        {pokemons.map((item, index) => {
           const isFavorite = favorites.some((fav) => fav.details.id === item.details.id);
          return (
            <div key={index} className="contentCard">
              <Heart state={isFavorite} funcion={() => handleFavoriteClick(item)} />
              <CardPokemonLista item={item} />
            </div>
          );
        })}
      </section>

      <button
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage
          ? "cargando..."
          : hasNextPage
          ? "cargar mas"
          : "fin de pokemons"}
      </button>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  gap: 20px;

  width: 100%;
  justify-content: center;
  flex-direction: column;
  button {
    padding: 10px 20px;
    border: none;
    background-color: #2d3748;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    width: 50%;
    align-self: center;
    &:disabled {
      background-color: #a0aec0;
      cursor: not-allowed;
    }
  }
  .contentpokemons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    width: 100%;
    .contentCard {
      position: relative;
    }
  }
`;
