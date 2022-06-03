import styled from "styled-components";


export const Header = styled.header`
    display:flex;  
    justify-content:space-between;
    align-items:center;
    width:100%;
    height:11vh;
    background-color:#122870;
    box-shadow:  15px 15px 15px #7d7d7d,-15px -15px 15px #ffffff;

`
export const H1 = styled.h1`
    display:flex;
    align-items:center;
    font-family: 'Open Sans', sans-serif;
    font-size:1.5rem;
    color:#fff;
    margin-left:15px;
    

`
export const Button = styled.button`
    display:flex;
    flex-direction:column;
    margin-right:50px;
    background-color:transparent;
    color:white;
    border:none;
    font-family: 'Open Sans', sans-serif;
    font-size:1rem;

    :hover{
        font-weight:bold;
        cursor:pointer;
    }
`

export const Main = styled.main`
    width:90vw;
    height:60vh;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:50px;
    
   `
export const Container = styled.div`
   display:flex;
   flex-direction:column;
   align-items:flex-start;
   margin:auto;
   margin-top:35px;
   width:80vw;
   height:70vh;
   border-radius: 5px;
    background: #e0e0e0;
    box-shadow:31px 31px 32px #bebebe,-31px -31px 32px #ffffff;
     
  `
  export const Ul = styled.ul`
  display:flex;
  flex-direction:column;
  margin-top:15px;
  margin-left:15px;
    
 `
 export const Btn = styled.button`
 display:flex;
 justify-content:center;
 margin-top:15px;
 font-family: 'Open Sans', sans-serif;
 font-size:1rem;
 color:#fff;
 background-color:#122870;
 border-radius:5px;
 border: solid 2px;

 :hover{
     cursor:pointer;
     color:white;
     background-color:#4066EB
     
 }
 
`

