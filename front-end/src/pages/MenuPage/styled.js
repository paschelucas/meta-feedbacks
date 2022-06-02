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
border-radius: 10px;
border:transparent;
background: #e0e0e0;
box-shadow:  29px 29px 51px #a6a6a6,-29px -29px 51px #ffffff;

:hover{
  background-color:#4066EB;
  color:white;
  transition:0.3s;
  cursor: pointer;
  

}

`
export const Ul = styled.ul`
    display:flex;
    flex-direction:row;
    margin: auto;
    align-items:center;

`

export const Logout = styled.div`
display:flex;
float: right;
margin-right:20px;
margin-top:15px;
`
export const Header = styled.header`
width:100vw;
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
margin-top:35px;
font-family: 'Open Sans', sans-serif;
font-weight:bold;
margin-left:25px;
`
export const PMessage = styled.p`
margin-top:25px;
font-family: 'Open Sans', sans-serif;
margin-left:25px;
`
export const ButtonLogout = styled.button`
margin-top:5px;
color:#fff;
font-family: 'Open Sans', sans-serif;


:hover{
  font-weight:bold;
  cursor: pointer;
}
`

export const Container = styled.div`
    display:flex;
    flex-direction:row;
    width:80%;
    height:60vh;
    padding:15px;
    margin: auto;
    
   
 
`