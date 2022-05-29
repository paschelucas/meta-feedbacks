import express from "express";
import { ProjectsAndItsLeaguersBusiness } from "../business/ProjectsAndItsLeaguersBusiness";
import { ProjectsAndItsLeaguersController } from "../controller/ProjectsAndItsLeaguersController";
import LeaguerDatabase from "../data/LeaguerDatabase";
import { ProjectDatabase } from "../data/ProjectDatabase";
import { ProjectsAndItsLeaguersDatabase } from "../data/ProjectsAndItsLeaguersDatabase";
import { IdGenerator } from "../services/generateId";

export const projectsAndItsLeaguersRouter = express.Router();

const projectsAndItsLeaguersBusiness = new ProjectsAndItsLeaguersBusiness(new ProjectsAndItsLeaguersDatabase(), new ProjectDatabase(), new LeaguerDatabase());

const projectsAndItsLeaguersController = new ProjectsAndItsLeaguersController(projectsAndItsLeaguersBusiness, new IdGenerator());

projectsAndItsLeaguersRouter.post("/:projectId/insert", projectsAndItsLeaguersController.insertLeaguerInAProject);
projectsAndItsLeaguersRouter.delete("/:projectId/remove", projectsAndItsLeaguersController.removeLeaguerFromAProject);
