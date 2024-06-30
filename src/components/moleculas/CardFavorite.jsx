import styled from "styled-components";
export function CardFavorite({item}) {
  return (<Card>
<ImageWrapper>
  <img src={item.details.animacion}/>
</ImageWrapper>
  </Card>);
}
const Card = styled.div`
  background-color: #192438;
  border-radius: 10px;
  width: 100px;
  padding: 20px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
  height:100px;
  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 120px;
    height: 120px;
    background-color: ${(props) => props.color || "#2D3748"};
    right: 0;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    border-radius: 50%;
    filter: blur(60px);
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 120px;
    height: 120px;
    background-color: ${(props) => props.color || "#2D3748"};
    right: 0;
    top: 0px;
    left: 0px;
    bottom: 0;
    margin: auto;
    border-radius: 50%;
    filter: invert(10px);
  }
`;
const ImageWrapper = styled.div`
  margin-top: 10px;
  display:flex;
  img{
   z-index:10; 
   width:100%;
  }
  
`;