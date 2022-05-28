import { Project } from "../model/Project";
import { ProjectDTO } from "../types/DTO/ProjectDTO";
import { BaseDatabase } from "./BaseDatabase";

export class ProjectDatabase extends BaseDatabase {
  protected TABLE_NAME = "projects";

  public createProject = async (project: Project): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME).insert({
        project_id: project.getProjectId(),
        project_name: project.getProjectName(),
      });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getAllProjects = async (): Promise<Project[]> => {
    try {
      const projects = await this.connection(this.TABLE_NAME);

      return projects;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public updateProject = async (project: ProjectDTO): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME)
        .update("project_name", project.name)
        .where("project_id", project.id);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public deleteProject = async (id: string): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME).where("project_id", id).del();
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getProjectById = async (
    id: string
  ): Promise<Project[] | undefined> => {
    try {
      const [project] = await this.connection(this.TABLE_NAME).where(
        "project_id",
        id
      );

      return project;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
