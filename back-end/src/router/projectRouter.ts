import express from "express";
import { ProjectBusiness } from "../business/ProjectBusiness";
import { ProjectController } from "../controller/ProjectController";
import { ProjectDatabase } from "../data/ProjectDatabase";
import { ProjectsAndItsLeaguersDatabase } from "../data/ProjectsAndItsLeaguersDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/generateId";

export const projectRouter = express.Router();

const projectBusiness = new ProjectBusiness(
  new ProjectDatabase(),
  new ProjectsAndItsLeaguersDatabase(),
  new Authenticator()
);
const projectController = new ProjectController(
  projectBusiness,
  new IdGenerator()
);

projectRouter.post("/create", projectController.createProject);
projectRouter.get("/", projectController.getAllProjects);
projectRouter.patch("/:id/update", projectController.updateProject);
projectRouter.delete("/:id", projectController.updateProject);
