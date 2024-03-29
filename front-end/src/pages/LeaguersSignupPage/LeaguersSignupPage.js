import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../Global/GlobalContext";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";
import { goBack } from "../../routes/coordinator";
import { Header,Main,H1,Form,Button,H4,Btn,Input,Select} from "./styled";


const LeaguersSignUpPage = () => {
  useUnprotectedPage();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { leaguersSignup, users, getUsers } = useContext(GlobalContext);

  useEffect(() => {
    getUsers();
  }, []);

  const responsibles = users?.map((user) => {
    return (
      <option key={user.user_id} value={user.user_name}>{user.user_name}</option>
    );
  });

  return (
    <>
      <div>

        <Header>
          <H1>Cadastro de Leaguer</H1>
          <Button type="button" onClick={() => goBack(navigate)}>{'Back'}</Button>
        </Header>
        <Main>
          <Form onSubmit={handleSubmit(leaguersSignup)}>
          
              <H4>Cadastrar Leaguer</H4>
        
            <Input {...register("name", { required: "Precisa ter um nome" })} type="text" placeholder="Name" />
            {errors ? <p>{errors.name?.message}</p> : <></>}
            <Input {...register("turma", { required: "Precisa ter uma turma" })} type="text" placeholder="Turma" />
            {errors ? <p>{errors.turma?.message}</p> : <></>}
            <Select {...register('fase')}>
              <option value="">Fase</option>
              <option value="introducao">Introdução</option>
              <option value="labs">Labs</option>
              <option value="beta">Beta</option>
            </Select>
            <Select {...register("responsavel", { required: "Precisa ter um responsável" })}>
              <option value="">Responsável</option>
              {responsibles}
            </Select>

            <Btn type="submit">Fazer cadastro</Btn>
          </Form>
        </Main>
      </div>
    </>
  )
}

export default LeaguersSignUpPage