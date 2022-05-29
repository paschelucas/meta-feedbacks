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

  public getAllProjects = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const projects = await this.projectBusiness.getAllProjects();

      res.status(200).send({ projects: projects });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public updateProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const token = req.headers.authorization as string;

      const projectInput: ProjectDTO = {
        id,
        name,
        token,
      };

      await this.projectBusiness.updateProject(projectInput);

      res.status(201).send({ message: "Projeto alterado com sucesso." });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
}
