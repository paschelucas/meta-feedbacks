import React, { useContext, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../Global/GlobalContext";
import { goBack } from "../../routes/coordinator";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";
import ProjectCard from "../../Components/ProjectCard.js/ProjectCard";
import Popup from "reactjs-popup";
import { useForm } from "react-hook-form";

const ProjectPage = () => {
  useUnprotectedPage();

  const navigate = useNavigate();
  const { projects, getProjects, searchInput, onChangeSearch, createNewProject } = useContext(GlobalContext);
  const {handleSubmit, register} = useForm();

  const userRole = localStorage.getItem('role');

  useEffect(() => {
      getProjects();
  }, [projects]);

  const mountProjects = projects?.filter((project) => {
      if (project.project_name.toLowerCase().includes(searchInput)) {
          return project;
      }  
   }).map((project) => {
      return (
              <ProjectCard key={project.project_id} name={project.project_name}/>
      );
  });
  
  return (
      <>

          <header>
              <h1>Projetos</h1>
              <button type="button" onClick={() => goBack(navigate)}>{'Back'}</button>

              {userRole === 'admin' ? <Popup trigger={<button type="button">Criar novo projeto</button>} position="right center">
                    {close => (
                        <form onSubmit={handleSubmit((data) => createNewProject(data, close))}>
                            <input type="text" placeholder="Insira o nome do projeto"
                            {...register('name')}/>
                            <button type="submit">Criar</button>
                        </form>
                    )}
              </Popup> : <></>}
          </header>
          <div>
              <ul>
                  <main>
                  <input type={'text'} placeholder="Projetos" value={searchInput} onChange={onChangeSearch}></input>
                      <ul>{mountProjects}</ul>
                  </main>
              </ul>
          </div>

      </>
  )
}

export default ProjectPage