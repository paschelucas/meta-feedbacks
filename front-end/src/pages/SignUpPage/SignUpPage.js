import React, { useContext } from "react"; 
import { useForm } from "react-hook-form";
import GlobalContext from "../../Global/GlobalContext";
import { BoxSignUp } from "./styled";
import logo from "../../assets/img/Logo.png"

const SignUpPage = () => {

  const {register, handleSubmit, formState: {errors}} = useForm();
  const {signup} = useContext(GlobalContext);

  return (
    <BoxSignUp>
      <div>
        Teste
      </div>
      <div>
        <img src={logo}/>
        <h1>Bem-vindo!</h1>
        <h1>Faça seu Cadastro</h1>
        <form onSubmit={handleSubmit(signup)}>
        <input {...register("name", {required: "Precisa ter um nome"})} type="text" placeholder="Name"/>
          {errors ? <p>{errors.name?.message}</p> : <></>}
          <input {...register("email", {required: "Precisa ter um email"})} type="email" placeholder="Email"/>
          {errors ? <p>{errors.email?.message}</p> : <></>}
          <input {...register("password", {required: "Precisa ter uma senha"})} type="password" placeholder="Senha" />
          {errors ? <p>{errors.password?.message}</p> : <></>}
          <select {...register('role')}>
            <option value="">Selecione um</option>
            <option value="admin">Adiministrador</option>
            <option value="mentor">Mentor</option>
            <option value="gestor">Gestor</option>
          </select>
          <button type="submit">Fazer cadastro</button>
        </form>
      </div>
      
    </BoxSignUp>
  )
}

export default SignUpPage