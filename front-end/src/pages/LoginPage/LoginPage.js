import React, { useContext } from "react"; 
import { useForm } from "react-hook-form";
import GlobalContext from '../../Global/GlobalContext.js'
import { ContainerLogin,Input} from "./styled.js";



const LoginPage = () => {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const {login} = useContext(GlobalContext);

  return (
    <ContainerLogin>
    
      <h3><strong>Bem vindo !</strong></h3>
      faça o seu login
      <form onSubmit={handleSubmit(login)}>
        <Input {...register("name", {required: "precisa ter um nome"})} type="text" placeholder="digite seu login"/>
        {errors ? <p>{errors.name?.message}</p> : <></>}
        <Input {...register("password", {required: true})} type="text" placeholder="digite sua senha"/>
        {errors ? <p>{errors.password?.message}</p> : <></>}
        <button type="submit">Entrar</button>
      </form>
     
    </ContainerLogin>
  )
}

export default LoginPage