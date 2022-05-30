import React, { useContext, useEffect } from "react";
import GlobalContext from "../../Global/GlobalContext";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";
import UserCard from '../../Components/UserCard/UserCard';
import { useNavigate } from "react-router-dom";
import { goBack, goToSingUp } from "../../routes/coordinator";

const ColaboratorsListPage = () => {
    useUnprotectedPage();

    const navigate = useNavigate();
    const {users, getUsers} = useContext(GlobalContext);

    useEffect(() => {
        getUsers();
    }, []);

    const mountUsers = users.map((user) => {
        return (
            <>
            <hr />
                <UserCard key={user.user_id} name={user.user_name} email={user.user_email} role={user.user_role}/>
            </>
        );
    });

    return (
        <>
            <header>
                <button type="button" onClick={() => goBack(navigate)}>{'<'}</button>
                <h1>Colaboradores</h1>
            </header>
            <button type="button" onClick={() => goToSingUp(navigate)}>Cadastrar novo colaborador</button>
            <main>
                <ul>{mountUsers}</ul>
            </main>
        </>
    );
};
export default ColaboratorsListPage;