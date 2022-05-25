import React, { useContext } from "react"; 
import { useForm } from "react-hook-form";
import GlobalContext from '../../Global/GlobalContext.js'
import { ContainerLogin,Input,Img,H3,Button,Span} from "./styled.js";
import background from '../../assets/img/background.png'
import logo from '../../assets/img/logo.png'

const LoginPage = () => {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const {login} = useContext(GlobalContext);

  return (
    <div>
      <Img src={background}/>
    <ContainerLogin>
      <img src={logo}/>
      <H3><strong>Bem vindo !</strong></H3>
      <Span>faça o seu login</Span>
      <form onSubmit={handleSubmit(login)}>
        <Input {...register("name", {required: "precisa ter um nome"})} type="text" placeholder="digite seu login"/>
        {errors ? <p>{errors.name?.message}</p> : <></>}
        <Input {...register("password", {required: true})} type="text" placeholder="digite sua senha"/>
        {errors ? <p>{errors.password?.message}</p> : <></>}
        <Button type="submit">ENTRAR</Button>
      </form>
     </ContainerLogin>
    </div>
  )
}

export default LoginPage