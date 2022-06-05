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
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 20px;
  background-color: #e5e5e5;
`

export const ConteinerCard = styled.div`
  display:flex;
  
      
`

export const Card = styled.div`
  display: flex;
  border-radius: 8px;
  background-color: #FFFFFF;
  align-items: center;
  flex-direction: row;
  align-items: center;
 
  
`

export const ImgCard = styled.img`
  display:flex;
  width: 70px;
  height: 70px;
  margin-top:20px;
  border-radius: 50%;
  border:solid gray 2px;
  
  
`
export const CardInfo = styled.div`
  display: flex;
  width:250px;
  height:90px;
  flex-direction: column;
  flex-wrap: nowrap;
  /* border-radius:5px;
  -webkit-box-shadow: 5px 5px 15px 5px #000000; 
  box-shadow: 5px 5px 15px 5px #000000; */
  h4{
    
    color:#4066EB;
    font-weight:bold;
  }
  
  
`