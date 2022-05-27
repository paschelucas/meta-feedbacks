import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../Global/GlobalContext";
import useUnprotectedPage from '../../hooks/useUnprotectedPage';
import { goToLeaguersList, goToLeaguersSignup } from "../../routes/coordinator";

const MenuPage = () => {
    useUnprotectedPage();
    const {logout} = useContext(GlobalContext);
    const navigate = useNavigate();

    return(
        <>
        <header>
            <h1>Menu</h1>
            <button type="button" onClick={logout}>Logout</button>
        </header>
        <main>
            <h2>Bem vinde {`${'<nome da pessoa>'}`}</h2>
            <p>Suas opções como {`${'<role da pessoa>'}`} são</p>
            <ul>
                <li><button type="button" onClick={()=>goToLeaguersList(navigate)}>Ver Leaguers</button></li>
                <li><button type="button" onClick={()=>goToLeaguersSignup(navigate)}>Cadastrar Leaguers</button></li>
            </ul>
        </main>
        </>
    );
};
export default MenuPage;