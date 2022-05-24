import React, { useContext } from "react"; 
import { useForm } from "react-hook-form";
import GlobalContext from '../../Global/GlobalContext.js'

const LoginPage = () => {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const {login} = useContext(GlobalContext);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(login)}>
        <input {...register("name", {required: "precisa ter um nome"})} type="text" placeholder="digite seu login"/>
        {errors ? <p>{errors.name?.message}</p> : <></>}
        <input {...register("password", {required: true})} type="text" placeholder="digite sua senha"/>
        {errors ? <p>{errors.password?.message}</p> : <></>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export default LoginPage