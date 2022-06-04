import styled from 'styled-components';


export const Header = styled.header`
  background-color: #122870;
`

export const Logo = styled.img`
    display:flex;
    width:15vw;
    height:15vh;
    top:240px;
    left:220px;
`

export const Main = styled.main`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 20px;
  background-color: #E5E5E5;
`

export const ConteinerCard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 2fr));
  column-gap: 2rem ;
  row-gap: 4rem ;
  background-color:red;
`

export const Card = styled.div`
  display: flex;
  border-radius: 8px;
  background-color: #FFFFFF;
  align-items: center;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`

export const ImgCard = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  
`

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  padding: 10px 10px 10px 25px;
`


 