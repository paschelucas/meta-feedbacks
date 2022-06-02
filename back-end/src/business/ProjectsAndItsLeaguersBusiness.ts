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
      const [foundProject, foundLeaguer, notUniqueLeaguer] =
        await Promise.allSettled([
          this.projectDatabase.getProjectById(projectId),
          this.leaguerDatabase.findLeaguerById(leaguerId),
          this.projectsAndItsLeaguersDatabase.uniqueLeaguerVerifier(
            projectId,
            leaguerId
          ),
        ]);

      if (!foundProject) {
        throw new CustomError(404, "Projeto não encontrado.");
      }

      if (!foundLeaguer) {
        throw new CustomError(404, "Leaguer não encontrado.");
      }

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

  public removeLeaguerFromAProject = async (
    projectId: string,
    leaguerId: string
  ) => {
    try {
      if (!projectId || !leaguerId) {
        throw new CustomError(422, "Por favor, preencha todos os campos.");
      }

      const [foundProject, foundLeaguer] =
        await Promise.allSettled([
          this.projectDatabase.getProjectById(projectId),
          this.leaguerDatabase.findLeaguerById(leaguerId),
        ]);

      if (!foundProject) {
        throw new CustomError(404, "Formulário não encontrado.");
      }

      if (!foundLeaguer) {
        throw new CustomError(404, "Leaguer não encontrado.");
      }

      await this.projectsAndItsLeaguersDatabase.removeLeaguersFromAProject(
        projectId,
        leaguerId
      );
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public getLeaguersByProjectId = async (projectId: string): Promise<any> => {
    try {
      if (!projectId) {
        throw new CustomError(422, "Por favor, escolha um projeto.");
      }

      const leaguers =
        await this.projectsAndItsLeaguersDatabase.getLeaguersByProjectId(
          projectId
        );

      return leaguers;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
