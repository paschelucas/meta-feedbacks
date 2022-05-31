import React, { useContext } from "react"; 
import { useForm } from "react-hook-form";
import GlobalContext from '../../Global/GlobalContext.js'
import { ContainerLogin,Input,Img,H3,Button,Span,ImgFeedbacks, ImgLogo} from "./styled.js";
import background from '../../assets/img/background.png'
import logo from '../../assets/img/logo.png'
import logofeedbacks from '../../assets/img/logofeedbacks.png'
import useProtectedPage from '../../hooks/useProtectedPage'
import { CircularProgress } from "@mui/material";

const LoginPage = () => {
  useProtectedPage();
  const {register, handleSubmit, formState: {errors}} = useForm();
  const {login, isLoading} = useContext(GlobalContext);

  return (
    <div>
      <ImgFeedbacks src={logofeedbacks}/>
      <Img src={background}/>
    <ContainerLogin>
      <ImgLogo src={logo}/>
      <H3><strong>Bem vindo!</strong></H3>
      <Span>Faça o seu login.</Span>
      <form onSubmit={handleSubmit(login)}>
        <Input {...register("email", {required: "Precisa ter um email válido"})} type="email" placeholder="digite seu email"/>
        {errors ? <p>{errors.email?.message}</p> : <></>}
        <Input {...register("password", {required: "Senha incorreta"})} type="password" placeholder="digite sua senha"/>
        {errors ? <p>{errors.password?.message}</p> : <></>}
        <Button type="submit">{isLoading ? <CircularProgress sx={'color: white; width: 2px'}/> : 'ENTRAR'}</Button>
      </form>
     </ContainerLogin>
    </div>
  )
}

export default LoginPage