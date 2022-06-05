import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../Global/GlobalContext";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";
import { useNavigate } from "react-router-dom";
import { goBack, goToLeaguersSignup } from "../../routes/coordinator";
import LeaguerCard from "../../components/LeaguerCard/LeaguerCard";
import { Main,Header,H1,Button,} from './styled'

const LeaguersListPage = () => {
    useUnprotectedPage();

    const navigate = useNavigate();
    const { leaguers, getLeaguers, searchInput, onChangeSearch } = useContext(GlobalContext);

    const role = localStorage.getItem('role');
    const userName = localStorage.getItem('name');

    useEffect(() => {
        getLeaguers();
    }, [leaguers]);

    const mountLeaguers = leaguers?.filter((leaguer) => {
            if (role === 'gestor') {
                if (leaguer.leaguer_responsavel === userName) {
                    return leaguer;
                }
                else{
                    return '';
                }
            }
            if (leaguer.leaguer_name.toLowerCase().includes(searchInput)) {
                return leaguer;
            }
        }
    ).map((leaguer) => {
        return (
            <LeaguerCard
                key={leaguer.leaguer_id}
                leaguer={leaguer}
                name={leaguer.leaguer_name}
                turma={leaguer.leaguer_turma}
                fase={leaguer.leaguer_fase}
                responsavel={leaguer.leaguer_responsavel}
            />
        );
    });

    return (
        <>

            <Header>
                <H1>Leaguers</H1>
                <Button type="button" onClick={() => goBack(navigate)}>{'Back'}</Button>
            </Header>
            <div>
                <ul>
                    <input type={'text'} placeholder="Leaguer" value={searchInput} onChange={onChangeSearch}></input>
                    <Main>
                        <ul>{mountLeaguers}</ul>
                    </Main>
                </ul>
            </div>

        </>
    );
};
export default LeaguersListPage;
