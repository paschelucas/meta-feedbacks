import React, { useContext } from "react"; 
import { useForm } from "react-hook-form";
import useProtectedPage from '../../hooks/useProtectedPage'


const LoginPage = () => {
  useProtectedPage();
  const {register, handleSubmit, formState: {errors}} = useForm();
  const {login, isLoading, errorMessage} = useContext(GlobalContext);

  return (
    <div>
           
      <form onSubmit={handleSubmit(login)}>
        <Input {...register("email", {required: "Precisa ter um email válido"})} type="email" placeholder="digite seu email"/>
        {errors ? <p>{errorMessage}</p> : <></>}
        <Input {...register("password", {required: true})} type="password" placeholder="digite sua senha"/>
        {errors ? <p>{errors.password?.message}</p> : <></>}
        <Button type="submit">ENTRAR</Button>
      </form>
     
    </div>
  )
}

export default LoginPage