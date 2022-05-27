import styled from "styled-components";

export const Img = styled.img`
    display:flex;
    width:100%;
    height:100vh;
`
export const ImgFeedbacks = styled.img`
    position:absolute;
    display:flex;
    width:22%;
    height:25vh;
    top:240px;
    left:220px;
    
    @media screen and (min-width : 320px) and
    (max-width : 480px) {
    // ** mobile    
    display:flex;
    width:42%;
    height:12vh;
    top:100px;
    left:110px;
    
}

@media screen and (min-width : 481px) 
and (max-width : 800px) {
    // ** tablets
    display:flex;
    width:35%;
    height:20vh;
    top:80px;
    left:150px;
    
}
`
export const ImgLogo = styled.img`
    display:flex;
    width:50%;
    height:10vh;

    @media screen and (min-width : 320px) and
    (max-width : 480px) {
    // ** mobile    
    display:flex;
    width:50%;
    height:5vh;
    
}    
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
    height:80vh;
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;
    border:transparent;
    border-radius: 8px 8px 0 0;
    background-color: #fff;

    @media screen and (min-width : 320px) and
    (max-width : 480px) {
    // ** mobile    
    
    position:absolute;
    bottom:0;
    width: 80%;
    left:33px;
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;
    height:55vh;
    border:transparent;
    border-radius: 8px 8px 0 0;
    background-color: #fff;
}

@media screen and (min-width : 481px) 
and (max-width : 800px) {
    // ** tablets
    position:absolute;
    bottom:0;
    width: 60%;
    left:95px;
    height:60vh;
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;
    border:transparent;
    border-radius: 8px 8px 0 0;
    background-color: #fff;
    
}
`
export const Input = styled.input`
    width:15vw;
    border-radius:3px;
    border-color:#636B6F;
    padding: 8px;
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
    width:16.5vw;
    border-radius:3px;
    color:#ffff;
    background-color:#122870;
    transition: 0.3s;
    border-radius:3px;
    border:transparent;
    padding: 8px;


:hover{
    color:#ffff;
    font-weight:bold;
    background-color:#007bff;;
    cursor: pointer;

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