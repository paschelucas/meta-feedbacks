import styled from "styled-components"

export const Input = styled.input`
    width:15vw;
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
    width:16.5vw;
    height: 4rem;
    border-radius:3px;
    color:#ffff;
    background-color:#122870;
    transition: 0.3s;
    border-radius:3px;
    border:transparent;
    padding: 8px;
    font-size: 1.5rem;


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