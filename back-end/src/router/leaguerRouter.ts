import express from "express";
import LeaguerBusiness from "../business/LeaguerBusiness";
import LeaguerController from "../controller/LeaguerController";
import LeaguerDatabase from "../data/LeaguerDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/generateId";

export const leaguerRouter = express.Router();

const leaguerBusiness = new LeaguerBusiness(
    new LeaguerDatabase(),
    new IdGenerator(),
    new Authenticator());
    
const leaguerController = new LeaguerController(leaguerBusiness);

leaguerRouter.post("/create", leaguerController.createLeaguer);

leaguerRouter.get("/", leaguerController.getAllLeaguers)