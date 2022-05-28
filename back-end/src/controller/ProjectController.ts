import { Request, Response } from "express";
import { ProjectBusiness } from "../business/ProjectBusiness";
import { IdGenerator } from "../services/generateId";
import { ProjectDTO } from "../types/DTO/ProjectDTO";

export class ProjectController {
  constructor(
    private projectBusiness: ProjectBusiness,
    private idGenerator: IdGenerator
  ) {}

  public createProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.body;
      const token = req.headers.authorization as string;
      const id = this.idGenerator.generateId();

      const projectInput: ProjectDTO = {
        id,
        name,
        token,
      };

      await this.projectBusiness.createProject(projectInput);

      res.status(201).send({ message: "Projeto criado com sucesso." });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
}
