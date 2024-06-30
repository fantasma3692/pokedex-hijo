import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePokemonStore } from "../../store/PokemonStore";

export function Buscador() {
  const {setBuscador,buscador} = usePokemonStore	()

  const buscar =(e)=>{
    setBuscador(e.target.value)
  }
  return (
    <Container>
      <section className="content">
        <Icon className="icono" icon="ic:twotone-search" />
        <input placeholder="...buscar" onChange={buscar}/>
      </section>
    </Container>
  );d
}
const Container = styled.div`
  border-radius: 10px;
  height: 60px;
  align-items: center;
  display: flex;
  color: ${(props) => props.theme.text};
  border: 2px solid ${({ theme }) => theme.color2};
  .content {
    padding: 15px;
    gap: 10px;
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    .icono {
      font-size: 30px;
      cursor: pointer;
    }
    input {
      font-size: 18px;
      width: 100%;
      outline: none;
      background: none;
      border: 0;
      color: ${(props) => props.theme.text};
    }
  }
`;
