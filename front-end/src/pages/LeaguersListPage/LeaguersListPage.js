import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../Global/GlobalContext";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";
import { useNavigate } from "react-router-dom";
import { goBack,goToLeaguersSignup } from "../../routes/coordinator";
import LeaguerCard from "../../components/LeaguerCard/LeaguerCard";


const LeaguersListPage = () => {
    useUnprotectedPage();

    const navigate = useNavigate();
    const { leaguers, getLeaguers, searchInput, onChangeSearch } = useContext(GlobalContext);

    const role = localStorage.getItem('role');
    const userName = localStorage.getItem('name');

    useEffect(() => {
        getLeaguers();
    }, []);

    const mountLeaguers = leaguers.filter((leaguer) => {
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
    }).map((leaguer) => {
      
      return (
          

            <div key={leaguer.leaguer_id}>

                 <hr/>
                
                <LeaguerCard 
                key={leaguer.leaguer_id}
                leaguer={leaguer} 
                name={leaguer.leaguer_name}
                turma={leaguer.leaguer_turma} 
                fase={leaguer.leaguer_fase} 
                responsavel={leaguer.leaguer_responsavel} 
                /> 
            
            </div>
        );
    });

    return (
        <>

            <header>
                <h1>Leaguers</h1>
                <button type="button" onClick={() => goBack(navigate)}>{'Back'}</button>
            </header>
            <div>
                <ul>
                    <button type="button" onClick={() => goToLeaguersSignup(navigate)}>Cadastrar novo leaguer</button>
                    <input type={'text'} placeholder="Leaguer" value={searchInput} onChange={onChangeSearch}></input>
                    <main>
                        <ul>{mountLeaguers}</ul>
                    </main>
                </ul>
            </div>

        </>
    );
};
export default LeaguersListPage;
