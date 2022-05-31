import express from "express";
import LeaguerBusiness from "../business/LeaguerBusiness";
import LeaguerController from "../controller/LeaguerController";
import LeaguerDatabase from "../data/LeaguerDatabase";
import UserDatabase from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/generateId";

export const leaguerRouter = express.Router();

const leaguerBusiness = new LeaguerBusiness(
    new LeaguerDatabase(),
    new IdGenerator(),
    new Authenticator(),
    new UserDatabase());
    
const leaguerController = new LeaguerController(leaguerBusiness);

leaguerRouter.get("", leaguerController.getAllLeaguers);

leaguerRouter.get("/byresponsible", leaguerController.getLeaguersByUserId);

leaguerRouter.post("/create", leaguerController.createLeaguer);

leaguerRouter.put("/editfase", leaguerController.editLeaguerFase);

leaguerRouter.put("/edit", leaguerController.editLeaguer);