import { Container } from "@mui/system";
import React, { useContext, useEffect } from "react"; 
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../Global/GlobalContext";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";
import { goBack } from "../../routes/coordinator";
import {Header,Main,H1} from "./styled";


const LeaguersSignUpPage = () => {
  useUnprotectedPage();
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors}} = useForm();
  const {leaguersSignup, users, getUsers} = useContext(GlobalContext);

  useEffect(() => {
    getUsers();
  }, []);

  const responsibles = users.map((user) => {
    return (
      <option key={user.user_id} value={user.user_name}>{user.user_name}</option>
    )
  });

  return (
    <>
      <div>
        
        <Header>
          <button type="button" onClick={() => goBack(navigate)}>{'<'}</button>
          <H1>Cadastro de Leaguer</H1>
        </Header>
        <Main>
        <form onSubmit={handleSubmit(leaguersSignup)}>
        <input {...register("name", {required: "Precisa ter um nome"})} type="text" placeholder="Name"/>
          {errors ? <p>{errors.name?.message}</p> : <></>}
          <input {...register("turma", {required: "Precisa ter uma turma"})} type="text" placeholder="Turma"/>
          {errors ? <p>{errors.turma?.message}</p> : <></>}
          <select {...register('fase')}>
            <option value="">Fase</option>
            <option value="introducao">Introdução</option>
            <option value="labs">Labs</option>
            <option value="beta">Beta</option>
          </select>
          <select {...register("responsavel", {required: "Precisa ter um responsável"})}>
            <option value="">Responsável</option>
            {responsibles}
          </select>
          
          <button type="submit">Fazer cadastro</button>
        </form>
        </Main>
      </div>
    </>
  )
}

export default LeaguersSignUpPage