import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../Global/GlobalContext";
import { goBack } from "../../routes/coordinator";

const LeaguerProfilePage = () => {
    const navigate = useNavigate();
    const leaguerStr = localStorage.getItem('leaguer');
    const leaguer = JSON.parse(leaguerStr);

    const { project, getProject } = useContext(GlobalContext);

    useEffect(() => {
        getProject();
    }, []);

    return (
        <>
            <header>
                <h1>Perfil Leaguer</h1>
                <button type="button" onClick={() => goBack(navigate)}>{'Back'}</button>
            </header>
            <h1>Nome: {leaguer.leaguer_name}</h1>
            <p>Turma: {leaguer.leaguer_turma}</p>
            <p>Fase: {leaguer.leaguer_fase}</p>
            <p>Responsável: {leaguer.leaguer_responsavel}</p>
        </>
    );
};
export default LeaguerProfilePage;