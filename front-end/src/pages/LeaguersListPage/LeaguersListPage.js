import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../Global/GlobalContext";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";
import { useNavigate } from "react-router-dom";
import { goBack,goToLeaguersSignup } from "../../routes/coordinator";
import LeaguerCard from "../../Components/LeaguerCard/LeaguerCard";


const LeaguersListPage = () => {
    useUnprotectedPage();

    const navigate = useNavigate();
    const { leaguers, getLeaguers } = useContext(GlobalContext);
    const [input, setInput] = useState("");

    useEffect(() => {
        getLeaguers();
    }, []);

    const onChangeInput = (event) => {
        setInput(event.target.value);
    }
    console.log(leaguers)
    const mountLeaguers = leaguers.map((leaguer) => {
      
      return (
          

            <div key={leaguer.leaguer_id}>

                 <hr/>
                
                <LeaguerCard key={leaguer.leaguer_id} name={leaguer.leaguer_name} turma={leaguer.leaguer_turma} fase={leaguer.leaguer_fase} responsavel={leaguer.leaguer_responsavel} /> 
            
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
                    <input type={'text'} placeholder="Leaguer" value={input} onChange={onChangeInput}></input>
                    <main>
                        <ul>{mountLeaguers && mountLeaguers}</ul>
                        <ul>{!input ? <p>Buscar por leaguers</p> : mountLeaguers.length === 0 ? <p>Não encontrado 😕</p> : mountLeaguers}</ul>
                    </main>
                </ul>
            </div>

        </>
    );
};
export default LeaguersListPage;
