import { ProjectAndItsLeaguers } from "../model/ProjectAndItsLeaguers";
import { BaseDatabase } from "./BaseDatabase";

export class ProjectsAndItsLeaguersDatabase extends BaseDatabase {
  protected TABLE_NAME = "projects_and_its_leaguers";

  public insertLeaguerInAProject = async (
    projectAndLeaguers: ProjectAndItsLeaguers
  ): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME).insert({
        bond_id: projectAndLeaguers.getBondId(),
        project_id: projectAndLeaguers.getProjectId(),
        leaguer_id: projectAndLeaguers.getLeaguerId(),
      });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public removeLeaguersFromAProject = async (
    projectId: string,
    leaguerId: string
  ): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME)
        .where("project_id", projectId)
        .andWhere("leaguer_id", leaguerId)
        .del();
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getLeaguersByProjectId = async (projectId: string): Promise<any> => {
    try {
      const leaguers = await this.connection(this.TABLE_NAME)
        .where("project_id", projectId)
        .join(
          "leaguers",
          "projects_and_its_leaguers.leaguer_id",
          "leaguers.leaguer_id"
        );

      return leaguers;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public uniqueLeaguerVerifier = async (
    projectId: string,
    leaguerId: string
  ): Promise<ProjectAndItsLeaguers[] | undefined> => {
    try {
      const [foundLeaguer] = await this.connection(this.TABLE_NAME)
        .where("project_id", projectId)
        .andWhere("leaguer_id", leaguerId);

      return foundLeaguer;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
