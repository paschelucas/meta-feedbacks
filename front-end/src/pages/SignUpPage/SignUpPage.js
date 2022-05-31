import React, { useContext } from "react"; 
import GlobalContext from "../../Global/GlobalContext";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";
import { useForm } from "react-hook-form";
import { BoxSignUp } from "./styled";
import { CircularProgress } from "@mui/material";
import { goBack } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  useUnprotectedPage();
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors}} = useForm();
  const {signup, isLoading} = useContext(GlobalContext);

  return (
    <BoxSignUp>
      <div>
        <header>
          <button type="button" onClick={() => goBack(navigate)}>{'<'}</button>
          <h1>Cadastrar novo colaborador</h1>
        </header>  
        <hr />
        <form onSubmit={handleSubmit(signup)}>
        <input {...register("name", {required: "Precisa ter um nome"})} type="text" placeholder="Name"/>
          {errors ? <p>{errors.name?.message}</p> : <></>}
          <input {...register("email", {required: "Precisa ter um email"})} type="email" placeholder="Email"/>
          {errors ? <p>{errors.email?.message}</p> : <></>}
          <input {...register("password", {required: "A senha precisa ter no minímo 9 caracteres, com letras maiúsculas, minúsculas, simbolos e números" })} type="password" placeholder="Senha" />
          {errors ? <p>{errors.password?.message}</p> : <></>}
          <select {...register('role', {required: true})}>
            <option value="">Selecione</option>
            <option value="admin">Adiministrador</option>
            <option value="mentor">Mentor</option>
            <option value="gestor">Gestor</option>
          </select>
          <button type="submit">{isLoading ? <CircularProgress sx={'color: white; width: 2px'}/> : 'cadastrar'}</button>
        </form>
      </div>
      
    </BoxSignUp>
  )
}

export default SignUpPage