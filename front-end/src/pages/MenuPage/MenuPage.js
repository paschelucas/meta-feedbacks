import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../Global/GlobalContext";
import useUnprotectedPage from '../../hooks/useUnprotectedPage';
import { goToLeaguersList, goToLeaguersSignup, goToColaboratorsList } from "../../routes/coordinator";
import { Header, Logout, ImgLogo, Button, Container, Ul,Icons,H2} from "./styled";
import MetaLogoWhite from '../../assets/img/MetaLogoWhite.png'
import {FiUsers} from 'react-icons/fi'
import {FiUserPlus} from 'react-icons/fi'
import {GrUserSettings} from 'react-icons/gr'


const MenuPage = () => {useUnprotectedPage();
    const { logout, userRole, userName } = useContext(GlobalContext);
    const navigate = useNavigate();

    return (
        <>
            <Header>
                <ImgLogo src={MetaLogoWhite} />
                <Logout>
                    
                <p type="button" onClick={logout}>{'Logout'}</p>
                </Logout>
            </Header>
            <main>

                <H2>Bem vinde {`${userName}`}</H2>
                <p>Suas opções como {`${userRole}`} são</p>
                <Container>
                    <Ul>

                        <li>
                            
                            <Button type="button" onClick={() => goToLeaguersList(navigate)}>
                                <Icons><FiUsers style={{fontSize:50}}/>Ver Leaguers</Icons></Button></li>
                        {(userRole === 'admin' || userRole === 'mentor') ? <li><Button uttontype="button" onClick={() => goToLeaguersSignup(navigate)}>
                        <Icons><FiUserPlus style={{fontSize:50}}/>Cadastrar Leaguers</Icons></Button>
                        </li> : <></>}
                        {userRole === 'admin' ? <li><Button type='button' onClick={() => goToColaboratorsList(navigate)}>
                        <Icons><GrUserSettings style={{fontSize:50}}/>Editar colaborador</Icons></Button></li> : <></>}

                    </Ul>
                </Container>
            </main>

        </>
    );
};
export default MenuPage;