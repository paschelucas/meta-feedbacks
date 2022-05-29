import LeaguerDatabase from "../data/LeaguerDatabase";
import { ProjectDatabase } from "../data/ProjectDatabase";
import { ProjectsAndItsLeaguersDatabase } from "../data/ProjectsAndItsLeaguersDatabase";
import { CustomError } from "../error/CustomError";
import { ProjectAndItsLeaguers } from "../model/ProjectAndItsLeaguers";
import { InsertLeaguerInAProjectDTO } from "../types/DTO/InsertLeaguerInAProjectDTO";

export class ProjectsAndItsLeaguersBusiness {
  constructor(
    private projectsAndItsLeaguersDatabase: ProjectsAndItsLeaguersDatabase,
    private projectDatabase: ProjectDatabase,
    private leaguerDatabase: LeaguerDatabase
  ) {}

  public insertLeaguerInAProject = async (
    insertLeaguerInAProjectInput: InsertLeaguerInAProjectDTO
  ) => {
    try {
      const { bondId, projectId, leaguerId } = insertLeaguerInAProjectInput;

      if (!projectId || !leaguerId) {
        throw new CustomError(422, "Por favor, preencha todos os campos.");
      }

      const foundProject = await this.projectDatabase.getProjectById(projectId);
      if (!foundProject) {
        throw new CustomError(404, "Projeto não encontrado.");
      }

      const foundLeaguer = await this.leaguerDatabase.findLeaguerById(
        leaguerId
      );
      if (!foundLeaguer) {
        throw new CustomError(404, "Leaguer não encontrado.");
      }

      const notUniqueLeaguer =
        await this.projectsAndItsLeaguersDatabase.uniqueLeaguerVerifier(
          projectId,
          leaguerId
        );

      if (notUniqueLeaguer) {
        throw new CustomError(
          422,
          "Este leaguer já foi inserido neste projeto."
        );
      }

      const newLeaguerInAProject = new ProjectAndItsLeaguers(
        bondId,
        projectId,
        leaguerId
      );

      await this.projectsAndItsLeaguersDatabase.insertLeaguerInAProject(
        newLeaguerInAProject
      );
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
