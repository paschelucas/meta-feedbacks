import styled from "styled-components"

export const Header = styled.header`
display:flex;
width:100vw;
height:11vh;
background-color:#122870;
box-shadow:  15px 15px 30px #7d7d7d,-15px -15px 30px #ffffff;
`
export const H1 = styled.h1`
    display:flex;
    align-items:center;
    font-family: 'Open Sans', sans-serif;
    font-size:1.5rem;
    color:#fff;
    margin-left:15px;

`
export const Input = styled.input`
    width:10vw;
    border-radius:3px;
    border-color:#636B6F;
    padding: 10px;
    margin: 10px 0px;
    

    @media screen and (min-width : 320px) and
    (max-width : 480px) {
    // ** mobile    
    width:40vw;
    border-radius:3px;
    border-color:#636B6F;
    padding: 8px;
    margin: 10px 0px;  
}

@media screen and (min-width : 481px) 
and (max-width : 800px) {
    // ** tablets
    width:40vw;
    border-radius:3px;
    border-color:#636B6F;
    padding: 8px;
    margin: 10px 0px;
}

`
export const Button = styled.button`
    display:flex;
    margin-left:84vw;
    align-items:center;
    background-color:transparent;
    color:white;
    border:none;
    font-family: 'Open Sans', sans-serif;
    font-size:1rem;

    :hover{
        font-weight:bold;
        cursor:pointer;
    }


@media screen and (min-width : 320px) and
    (max-width : 480px) {
    // ** mobile    
    width:45.5vw;
    border-radius:3px;
    color:#ffff;
    background-color:#122870;
    border-radius:3px;
    border:transparent;
    padding: 8px;  
}


@media screen and (min-width : 481px) 
and (max-width : 800px) {
    // ** tablets
    width:44vw;
    border-radius:3px;
    color:#ffff;
    background-color:#122870;
    border-radius:3px;
    border:transparent;
    padding: 8px;
}
`
export const Main = styled.main`
  margin-top:25px;
  border-radius: 10px;
  border:transparent;
  background: #e0e0e0;
  box-shadow:29px 29px 51px #a6a6a6,-29px -29px 51px #ffffff;
    
ul{
  display:grid;    
  grid-template-columns:repeat(4, minmax(100px, 1fr));
  column-gap: 2rem ;
  row-gap: 4rem ;
  border-radius: 10px;
  background: #e0e0e0;
  box-shadow:  24px 24px 49px #bebebe,-24px -24px 49px #ffffff;
  }       
`

