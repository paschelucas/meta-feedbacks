import React, { useContext, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../Global/GlobalContext";
import { goBack } from "../../routes/coordinator";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";

const ProjectPage = () => {
  useUnprotectedPage();

  const navigate = useNavigate();
  const { projects, getProjects, searchInput, onChangeSearch } = useContext(GlobalContext);

  useEffect(() => {
      getProjects();
  }, []);

  const mountProjects = projects.filter((project) => {
      if (project.project_name.toLowerCase().includes(searchInput)) {
          return project;
      }  
   }).map((project) => {
      return (
          <>
              <hr />
              <div key={project.project_id} name={project.project_name}/>
          </>
      );
  });
  
  return (
      <>

          <header>
              <button type="button" onClick={() => goBack(navigate)}>{'Back'}</button>

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