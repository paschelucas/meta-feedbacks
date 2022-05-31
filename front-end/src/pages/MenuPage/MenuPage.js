import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../Global/GlobalContext";
import useUnprotectedPage from '../../hooks/useUnprotectedPage';
import { goToLeaguersList, goToLeaguersSignup, goToColaboratorsList } from "../../routes/coordinator";

const MenuPage = () => {
    useUnprotectedPage();
    const {logout, userRole, userName} = useContext(GlobalContext);
    const navigate = useNavigate();

    return(
        <>
        <header>
            <h1>Menu</h1>
            <button type="button" onClick={logout}>Logout</button>
        </header>
        <main>
            <h2>Bem vinde {`${userName}`}</h2>
            <p>Suas opções como {`${userRole}`} são</p>
            <ul>
                <li><button type="button" onClick={()=>goToLeaguersList(navigate)}>Ver Leaguers</button></li>
                {(userRole === 'admin' || userRole === 'mentor') ? <li><button type="button" onClick={()=>goToLeaguersSignup(navigate)}>Cadastrar Leaguers</button></li> : <></>}
                {userRole === 'admin' ? <li><button type='button' onClick={() => goToColaboratorsList(navigate)}>Editar colaborador</button></li> : <></>}
            </ul>
        </main>
        </>
    );
};
export default MenuPage;