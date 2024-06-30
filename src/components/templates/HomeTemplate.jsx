import styled from "styled-components";
import { Header } from "../organismos/Header";
import { ListaPokemons } from "../organismos/ListaPokemons";
import { useIsFetching } from "@tanstack/react-query";
import { RingLoader } from "react-spinners";
import { usePokemonStore } from "../../store/PokemonStore";
import { CardPokemonBuscador } from "../moleculas/CardPokemonBuscador";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Favoritos } from "../organismos/Favoritos";
import { usePokemonFavoritosStore } from "../../store/PokemonFavoritosStore";
export function HomeTemplate() {
  const queryClient = useQueryClient();
  const { pokemonBuscado, pokemonCount, clearPokemons } = usePokemonStore();
  const { clearFavoritos } = usePokemonFavoritosStore();
  const isFetching = useIsFetching({
    queryKey: ["buscar pokemon"],
  });
  const queryState = queryClient.getQueryState(["mostrar productos"]);
  const isLoading = queryState?.isLoading;
  const isError = queryState?.isError;
  const error = queryState?.error;
  const resetQuery = () => {
    clearFavoritos()
    clearPokemons();
    queryClient.invalidateQueries("mostrar pokemons");
  };
  return (
    <Container>
      <Header />

      <section className="visor">
        <article className="area1">
          {isFetching > 0 ? (
            <RingLoader color="#fff" size={45} />
          ) : (
            <CardPokemonBuscador />
          )}
        </article>
        <article className="area2">
          <button onClick={resetQuery}>limpiar</button>
          <Favoritos />
        </article>
      </section>

      <ContainerContador>
        <Icon className="icono" icon="ic:twotone-catching-pokemon" />
        {pokemonCount} Pokemons
      </ContainerContador>
      <ListaPokemons />
    </Container>
  );
}
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .visor {
    display: flex;
    align-items: center;
    padding: 20px;
    gap: 20px;
    .area2 {
      display: flex;
      width: 100%;
      gap: 10px;
      overflow-y: auto;
      padding: 20px;
      button {
        background-color: #f04343;
        color: #fff;
        border: none;
        border-radius: 5px;
      }
    }
  }
`;
const ContainerContador = styled.section`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 25px;

  .icono {
    font-size: 30px;
  }
`;
