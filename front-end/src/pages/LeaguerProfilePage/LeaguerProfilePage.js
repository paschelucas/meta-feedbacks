import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { goBack } from "../../routes/coordinator";
import Popup from "reactjs-popup";
import GlobalContext from "../../Global/GlobalContext";

const LeaguerProfilePage = () => {
    const navigate = useNavigate();
    const {addUserInProject, projects} = useContext(GlobalContext);
    const {handleSubmit, register} = useForm();
    const leaguerStr = localStorage.getItem('leaguer');
    const leaguer = JSON.parse(leaguerStr);

    const projectDropDown = projects.map((project) => {
        return (
            <option key={project.project_id} value={project.project_id}>{project.project_name}</option>
        );
    });

    return (
        <>
            <header>
                <h1>Perfil Leaguer</h1>
                <button type="button" onClick={() => goBack(navigate)}>{'Back'}</button>
            </header>
            <h1>Nome: {leaguer.leaguer_name}</h1>
            <p>Turma: {leaguer.leaguer_turma}</p>
            <p>Fase: {leaguer.leaguer_fase}</p>
            <p>Responsável: {leaguer.leaguer_responsavel}</p>
            <Popup trigger={<button type="button">Adicionar a um projeto</button>} position="center">
                {close => (
                <form onSubmit={handleSubmit((data)=> addUserInProject(data, leaguer.leaguer_id))}>
                    <select {...register('project')}>
                        <option value="">Selecione</option>
                        {projectDropDown}
                    </select>
                    <button type='submit'>Adicionar</button>
                </form>
                )}
            </Popup>
        </>
    );
};
export default LeaguerProfilePage;