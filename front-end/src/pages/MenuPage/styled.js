import styled from "styled-components";

export const Button = styled.button`
display:flex;
flex-direction:row;
justify-content:center;
align-items:center;
font-family: 'Open Sans', sans-serif;
height:250px;
width:200px;
margin:25px;
border-radius: 25px;
border:transparent;
background: #e0e0e0;
box-shadow:  29px 29px 51px #a6a6a6,-29px -29px 51px #ffffff;

:hover{
  background-color:#4066EB;
  color:white;
  transition:0.3s;
  

}

`
export const Ul = styled.ul`
    display:flex;
    flex-direction:row;
    margin: 0 auto;
    align-items:center;

`
export const Logout = styled.div`
display:flex;
float: right;
margin-right:20px;
margin-top:15px;
`
export const Header = styled.div`

width:100%;
height:11vh;
background-color:#122870;
box-shadow:  15px 15px 30px #7d7d7d,-15px -15px 30px #ffffff;

`
export const ImgLogo = styled.img`
margin-top:15px;
margin-left:15px;
width:10%;
height:5vh;
`
export const Icons = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`
export const H2 = styled.h2`
margin-top:25px;
font-family: 'Open Sans', sans-serif;
margin-left:15px;
`
export const PMessage = styled.p`
margin-top:25px;
font-family: 'Open Sans', sans-serif;
margin-left:15px;
`


export const Container = styled.div`
    display:flex;
    flex-direction:row;
    width:80%;
    height:60vh;
    padding:15px;
    margin: auto;
    
   
 
`