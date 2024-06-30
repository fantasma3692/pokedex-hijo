import styled from "styled-components";
import { Buscador } from "../moleculas/Buscador";
export function Header() {

  return (
    <Container>
      <section>
        <img
          alt="Pokemon bulbasaur gif"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif"
        />
        <img
          alt="Pokemon charmander gif"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/4.gif"
        />
        <img
          alt="Pokemon squirtle gif"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif"
        />
        <img
          alt="Pokemon pikachu gif"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif"
        />
      </section>
     
      <Buscador />
    </Container>
  );
}
const Container = styled.div``;
