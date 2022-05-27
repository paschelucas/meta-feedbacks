import React, { useContext } from "react"; 
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../Global/GlobalContext";
import { goBack } from "../../routes/coordinator";

const LeaguersSignUpPage = () => {
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors}} = useForm();
  const {leaguersSignup} = useContext(GlobalContext);

  return (
    <>
      <div>
        Teste
      </div>
      <div>
        <header>
          <button type="button" onClick={() => goBack(navigate)}></button>
          <h1>Cadastro de Leaguer</h1>
        </header>
        <form onSubmit={handleSubmit(leaguersSignup)}>
        <input {...register("name", {required: "Precisa ter um nome"})} type="text" placeholder="Name"/>
          {errors ? <p>{errors.name?.message}</p> : <></>}
          <input {...register("turma", {required: "Precisa ter uma turma"})} type="text" placeholder="Email"/>
          {errors ? <p>{errors.turma?.message}</p> : <></>}
          <select {...register('fase')}>
            <option value="">Selecione</option>
            <option value="introducao">Introdução</option>
            <option value="labs">Labs</option>
          </select>
          <input {...register("responsavel", {required: "Precisa ter uma senha"})} type="text" placeholder="Senha" />
          {errors ? <p>{errors.responsavel?.message}</p> : <></>}
          
          <button type="submit">Fazer cadastro</button>
        </form>
      </div>
    </>
  )
}

export default LeaguersSignUpPage