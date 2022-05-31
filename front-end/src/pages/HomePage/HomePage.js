import React, { useContext, useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { goToLogin } from "../../routes/coordinator";
import { Body, Card, CardInfo, ConteinerCard, Header, ImgCard, Logo } from "./styled";
import logo from "../../assets/img/logofeedbacks.png"
import GlobalState from "../../Global/GlobalState";

const HomePage = () => {

  const navigate = useNavigate();
  // const { leaguers, setLeaguers, loading } = useContext(GlobalState)
  // const [input, setInput] = useState('')

  // useEffect(() => {
  // }, [leaguers])
  
  setTimeout(()=>{
    goToLogin(navigate);
  }, 1250)

  // const onChangeInput = (event) => {
  //   setInput(event.target.value);
  // }

  // const usersFilter = leaguers.leaguers?.filter((leaguers) => {
  //   return !input
  //     ? false
  //     : leaguers?.leaguer_name.toLowerCase().includes(input.toLowerCase())
  // })

  // .map((leaguers) => {
  //   return (
  //     <Card>
  //       <div><ImgCard src="https://picsum.photos/200"/></div>
  //       <CardInfo>
  //         <h4>{leaguers.leaguer_name}</h4>
  //         <p>{leaguers.leaguer_turma}</p>
  //         <p>{leaguers.leaguer_fase}</p>
  //         <p>{leaguers.leaguer_name}</p>
  //       </CardInfo>
  //     </Card>
  //   )
  // })

  return (
    <div>
      <Header>
        <Logo src={logo} />
      </Header>
      <Body>
        <h3>Página inicial</h3>
        <div>
          <input 
            // placeholder=""
            // value={input}
            // onChange={onChangeInput}
          />
          <button>Filtrar</button>
          <ConteinerCard>
            {/* {!input ? <p>Busca por nome </p> : usersFilter.length === 0 ? <p>Usuário não encontrado 😕</p> : usersFilter} */}
          </ConteinerCard>
        </div>
      </Body>
    </div>
  )
}

export default HomePage