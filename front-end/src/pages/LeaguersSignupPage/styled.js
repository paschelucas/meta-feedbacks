import styled from "styled-components";


export const Header = styled.header`
    display:flex;  
    justify-content:space-between;
    align-items:center;
    width:100%;
    height:11vh;
    background-color:#1a2c6a;
    box-shadow:  15px 15px 15px #7d7d7d,-15px -15px 15px #ffffff;

`
export const H1 = styled.h1`

    font-family: 'Open Sans', sans-serif;
    font-size:1.5rem;
    color:#fff;
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
export const H4 = styled.h4`
    font-family: 'Open Sans', sans-serif;
    font-size:1.5rem;
    color:#122870;
    font-weight:bold;
    margin-left:15px;
`
export const Span = styled.h4`
   margin-bottom:35px;
   
`
export const Button = styled.button`

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
    height:65vh;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:50px;
   `
export const Form = styled.form`
    
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    height:50vh;
    width:30vw;
    margin:25px;
     
 `
export const Input = styled.input`
    margin:5px;
`
export const Select = styled.select`
    margin:5px;
`