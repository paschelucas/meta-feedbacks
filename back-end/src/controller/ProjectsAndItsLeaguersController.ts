import { Request, Response } from "express";
import { ProjectsAndItsLeaguersBusiness } from "../business/ProjectsAndItsLeaguersBusiness";
import { IdGenerator } from "../services/generateId";
import { InsertLeaguerInAProjectDTO } from "../types/DTO/InsertLeaguerInAProjectDTO";

export class ProjectsAndItsLeaguersController {
    constructor(
        private projectsAndItsLeaguersBusiness: ProjectsAndItsLeaguersBusiness,
        private idGenerator: IdGenerator
      ) {}

      public insertLeaguerInAProject = async (
        req: Request,
        res: Response
      ): Promise<void> => {
        try {
          const { projectId } = req.params;
          const { leaguerId } = req.body;
          const bondId = this.idGenerator.generateId();
    
          const input: InsertLeaguerInAProjectDTO = {
            bondId,
            projectId,
            leaguerId,
          };
    
          await this.projectsAndItsLeaguersBusiness.insertLeaguerInAProject(input)
    
          res
            .status(201)
            .send({ message: "Leaguer inserido no projeto com sucesso." });
        } catch (error: any) {
          const { statusCode, message } = error;
          res.status(statusCode || 400).send({ message });
        }
      };

      public removeLeaguerFromAProject = async (
        req: Request,
        res: Response
      ): Promise<void> => {
        try {
          const { projectId } = req.params;
          const { leaguerId } = req.body;
    
          await this.projectsAndItsLeaguersBusiness.removeLeaguerFromAProject(projectId, leaguerId)
    
          res
            .status(200)
            .send({ message: "Leaguer removido do projeto com sucesso." });
        } catch (error: any) {
          const { statusCode, message } = error;
          res.status(statusCode || 400).send({ message });
        }
      };
}