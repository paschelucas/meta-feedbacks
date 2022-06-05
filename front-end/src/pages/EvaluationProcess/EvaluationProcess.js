import React, { useContext, useEffect } from 'react'
import { goBack } from '../../routes/coordinator'
import useUnprotectedPage from '../../hooks/useUnprotectedPage';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import GlobalContext from '../../Global/GlobalContext';
function EvaluationProcess() {
  useUnprotectedPage();
  const navigate = useNavigate();
  const {handleSubmit, register} = useForm();
  const {questions, getQuestions, sendChoosenQuestions} = useContext(GlobalContext);

  useEffect(() => {
    getQuestions();
  }, [questions]);

  const showQuestions = questions.map((quest) => {
    return (
      <label key={quest.question_id}>
        <input 
          type="checkbox"
          value={quest.question_id}
          {...register('questions')}
        />
        {quest.question_text}
        <hr />
      </label>
    );
  });

  return (
    <>
      <header>
        <h1>Selecione a seguir as perguntas a serem feitas aos pares</h1>
        <button type="button" onClick={() => goBack(navigate)}>{'Back'}</button>
      </header>
      <form onSubmit={handleSubmit(sendChoosenQuestions)}>
        {showQuestions}
        <button type='submit'>Enviar perguntas</button>
      </form>
    </>
  )
}

export default EvaluationProcess