import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../Global/GlobalContext";
import useUnprotectedPage from '../../hooks/useUnprotectedPage';
import { goToLeaguersList, goToLeaguersSignup, goToColaboratorsList } from "../../routes/coordinator";
import { Header, Logout, ImgLogo, Button, Container, Li, IconLeaguers } from "./styled";
import MetaLogoWhite from '../../assets/img/MetaLogoWhite.png'
import { FiUsers } from 'react-icons/fi';


const MenuPage = () => {
    useUnprotectedPage();
    const { logout, userRole, userName } = useContext(GlobalContext);
    const navigate = useNavigate();

    return (
        <>
            <Header>
                <ImgLogo src={MetaLogoWhite} />
                <Logout>
                    <h1>Menu</h1>
                    <button type="button" onClick={logout}>Logout</button>
                </Logout>
            </Header>
            <main>

                <h2>Bem vinde {`${userName}`}</h2>
                <p>Suas opções como {`${userRole}`} são</p>
                <Container>
                    <Li>

                        <li><Button type="button" onClick={() => goToLeaguersList(navigate)}>Ver Leaguers</Button></li>
                        {(userRole === 'admin' || userRole === 'mentor') ? <li><Button uttontype="button" onClick={() => goToLeaguersSignup(navigate)}>Cadastrar Leaguers</Button></li> : <></>}
                        {userRole === 'admin' ? <li><Button type='button' onClick={() => goToColaboratorsList(navigate)}>Editar colaborador</Button></li> : <></>}

                    </Li>
                </Container>
            </main>

        </>
    );
};
export default MenuPage;