import React, { useContext } from "react"; 
import { useForm } from "react-hook-form";
import GlobalContext from "../../Global/GlobalContext";

const SignUpPage = () => {

  const {register, handleSubmit, formState: {errors}} = useForm();
  const {signup} = useContext(GlobalContext);

  return (
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit(signup)}>
      <input {...register("name", {required: "Precisa ter um nome"})} type="text" placeholder="Name"/>
        {errors ? <p>{errors.name?.message}</p> : <></>}
        <input {...register("email", {required: "Precisa ter um email"})} type="email" placeholder="Email"/>
        {errors ? <p>{errors.email?.message}</p> : <></>}
        <input {...register("password", {required: "Precisa ter uma senha"})} type="password" placeholder="Senha"/>
        {errors ? <p>{errors.password?.message}</p> : <></>}
        <button type="submit">Fazer cadastro</button>
      </form>
    </div>
  )
}

export default SignUpPage