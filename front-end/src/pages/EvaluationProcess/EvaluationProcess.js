import React from 'react'
import { goBack } from '../../routes/coordinator'
import useUnprotectedPage from '../../hooks/useUnprotectedPage';
import { useNavigate } from 'react-router-dom';
function EvaluationProcess() {
  useUnprotectedPage();
  const navigate = useNavigate();

  return (
    <>
      <header>
        <h1>Selecione a seguir as perguntas a serem feitas aos pares</h1>
        <button type="button" onClick={() => goBack(navigate)}>{'Back'}</button>
      </header>
      <form >
        <input type="checkbox" name="" id="" value="teste"/>
      </form>
    </>
  )
}

export default EvaluationProcess