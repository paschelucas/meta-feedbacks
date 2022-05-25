import React, { useContext } from "react"; 
import { useForm } from "react-hook-form";
import GlobalContext from '../../Global/GlobalContext.js'
import { ContainerLogin } from "./styled.js";

const LoginPage = () => {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const {login} = useContext(GlobalContext);

  return (
    <ContainerLogin>
      <h1>Login</h1>
      <h3><strong>Bem vindo !</strong></h3>
      <h4>faça o seu login</h4>
      <form onSubmit={handleSubmit(login)}>
        <input {...register("name", {required: "precisa ter um nome"})} type="text" placeholder="digite seu login"/>
        {errors ? <p>{errors.name?.message}</p> : <></>}
        <input {...register("password", {required: true})} type="text" placeholder="digite sua senha"/>
        {errors ? <p>{errors.password?.message}</p> : <></>}
        <button type="submit">Entrar</button>
      </form>
    </ContainerLogin>
  )
}

export default LoginPage