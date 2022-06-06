import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../Global/GlobalContext";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";
import { useNavigate } from "react-router-dom";
import { goBack, goToSingUp } from "../../routes/coordinator";
import UserCard from "../../Components/UserCard/UserCard"
import { Header, Button, H1, Container,Ul,Btn } from "./styled";



const CollaboratorsListPage = () => {
    useUnprotectedPage();

    const navigate = useNavigate();
    const { users, getUsers, searchInput, onChangeSearch } = useContext(GlobalContext);

    useEffect(() => {
        getUsers();
    }, [users]);

    const mountUsers = users.filter((user) => {
        if (user.user_name.toLowerCase().includes(searchInput)) {
            return user;
        }  
     }).map((user) => {
        return (
            <UserCard key={user.user_id} name={user.user_name} email={user.user_email} role={user.user_role} />
        );
    });

    return (
        <>

            <Header>
                <H1>Colaboradores</H1>
                <Button type="button" onClick={() => goBack(navigate)}>{'Back'}</Button>

            </Header>
            <Container>
                <Ul>
                    <main>
                    <input type={'text'} placeholder="Colaboradores" value={searchInput} onChange={onChangeSearch}></input>
                    <Btn type="button" onClick={() => goToSingUp(navigate)}>Cadastrar novo colaborador</Btn>
                        <ul>{mountUsers}</ul>
                    </main>
                </Ul>
            </Container>

        </>
    );
};
export default CollaboratorsListPage;