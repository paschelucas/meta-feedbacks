import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../Global/GlobalContext";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";
import { useNavigate } from "react-router-dom";
import { goBack, goToSingUp } from "../../routes/coordinator";
import UserCard from "../../Components/UserCard/UserCard"
import {Header,Button,Container,H1} from "./styled";



const ColaboratorsListPage = () => {
    useUnprotectedPage();

    const navigate = useNavigate();
    const { users, getUsers } = useContext(GlobalContext);
    const [input, setInput] = useState("");

    useEffect(() => {
        getUsers();
    }, []);

    const onChangeInput = (event) => {
        setInput(event.target.value);
    }

    const mountUsers = users.map((user) => {
        return (
            <>
                <hr />
                <UserCard key={user.user_id} name={user.user_name} email={user.user_email} role={user.user_role} />
            </>
        );
    });

    return (
        <>
            
            <Header>
                <H1>Colaboradores</H1>
                <Button type="button" onClick={() => goBack(navigate)}>{'Back'}</Button>
                
            </Header>
            <Container>
            <button type="button" onClick={() => goToSingUp(navigate)}>Cadastrar novo colaborador</button>
            <input type={'text'} placeholder="Usuários" value={input} onChange={onChangeInput}></input>
            <main>
                <ul>{!input ? <p>Buscar por usuários</p> : mountUsers.length === 0 ? <p>Não encontrado 😕</p> : mountUsers}</ul>
            </main>
            </Container>
        </>
    );
};
export default ColaboratorsListPage;