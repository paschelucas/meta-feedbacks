import { ProjectDatabase } from "../data/ProjectDatabase";
import { CustomError } from "../error/CustomError";
import { Project } from "../model/Project";
import { Authenticator } from "../services/Authenticator";
import { ProjectDTO } from "../types/DTO/ProjectDTO";

export class ProjectBusiness {
  constructor(
    private projectDatabase: ProjectDatabase,
    private authenticator: Authenticator
  ) {}

  public createProject = async (project: ProjectDTO): Promise<void> => {
    try {
      const { id, name, token } = project;

      if (!token) {
        throw new CustomError(401, "Usuário não identificado.");
      }

      const tokenData = this.authenticator.getTokenData(token);
      if (tokenData.role !== "admin") {
        throw new CustomError(403, "Usuário não autorizado.");
      }

      if (!name) {
        throw new CustomError(
          422,
          "Por favor, escolha um nome para o projeto."
        );
      }

      const foundProject = await this.projectDatabase.getProjectByName(name);

      if (foundProject) {
        throw new CustomError(422, "Já existe um projeto com este nome.");
      }
      const newProject = new Project(id, name);
      await this.projectDatabase.createProject(newProject);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public getAllProjects = async (): Promise<Project[]> => {
    try {
      const projects = await this.projectDatabase.getAllProjects();

      return projects;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public updateProject = async (project: ProjectDTO): Promise<void> => {
    try {
      const { id, name, token } = project;
      if (!token) {
        throw new CustomError(401, "Usuário não identificado.");
      }

      const tokenData = this.authenticator.getTokenData(token);
      if (tokenData.role !== "admin") {
        throw new CustomError(403, "Usuário não autorizado.");
      }

      if (!name) {
        throw new CustomError(
          422,
          "Por favor, escolha um novo nome para o projeto."
        );
      }

      const foundProjectName = await this.projectDatabase.getProjectByName(
        name
      );
      if (foundProjectName) {
        throw new CustomError(422, "Já existe um projeto com este nome.");
      }

      const foundProject = await this.projectDatabase.getProjectById(id);
      if (!foundProject) {
        throw new CustomError(404, "Projeto não encontrado.");
      }
      await this.projectDatabase.updateProject(project);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public deleteProject = async (project: ProjectDTO): Promise<void> => {
    try {
      const { id, token } = project;

      if (!token) {
        throw new CustomError(401, "Usuário não identificado.");
      }

      const tokenData = this.authenticator.getTokenData(token);
      if (tokenData.role !== "admin") {
        throw new CustomError(403, "Usuário não autorizado.");
      }

      if (!id) {
        throw new CustomError(
          422,
          "Por favor, escolha um projeto."
        );
      }

      const foundProject = await this.projectDatabase.getProjectById(id);
      if (!foundProject) {
        throw new CustomError(404, "Projeto não encontrado.");
      }

      await this.projectDatabase.deleteProject(id);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
