import styled from "styled-components";

export const Img = styled.img`
display:flex;
width:100%;
height:100vh;
`
export const ImgLogo = styled.img`
display:flex;
width:100%;
`
export const H3 = styled.h3`
font-family: 'Open Sans', sans-serif;
`
export const Span = styled.span`
margin-top:-20px;
font-family: 'Open Sans', sans-serif;
`
export const ContainerLogin = styled.div`
position:absolute;
bottom:0;
right:89px;
width: 30%;
height:65vh;
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
border:transparent;
border-radius: 8px 8px 0 0;
background-color: #fff;
`
export const Input = styled.input`
width:20vw;
border-radius:3px;
border-color:#636B6F;
padding: 8px;
margin: 10px 0px;

`
export const Button = styled.button`
width:100%;
border-radius:3px;
color:#ffff;
background-color:#122870;
border-radius:3px;
border:transparent;
padding: 8px;

:hover{
    color:#ffff;
    font-weight: bold;
    cursor: pointer;
}
`