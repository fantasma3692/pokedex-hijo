import styled from "styled-components";
import { usePokemonFavoritosStore } from "../../store/PokemonFavoritosStore";
import { CardFavorite } from "../moleculas/CardFavorite";
export function Favoritos() {
  const { favorites } = usePokemonFavoritosStore();
  return (
    <Container>
      {favorites.map((item, index) => {
        return <CardFavorite key={index} item={item} />;
      })}
    </Container>
  );
}
const Container = styled.div`
display:flex;
gap:20px;
`;
