import React from "react"; 
import { useNavigate } from "react-router-dom";
import { goToLogin } from "../../routes/coordinator";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404 Ops algo deu errado!</h1>
      <h2>sua página não foi encontrada</h2>
      <button onClick={() => {goToLogin(navigate)}}>Clique aqui para voltar</button>
    </div>
  )
}

export default ErrorPage