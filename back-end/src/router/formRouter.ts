import express from "express";
import { FormBusiness } from "../business/FormBusiness";
import { FormController } from "../controller/FormController";
import { FormDatabase } from "../data/FormDatabase";
import { IdGenerator } from "../services/generateId";

export const formRouter = express.Router();

const formBusiness = new FormBusiness(new FormDatabase());

const formController = new FormController(new IdGenerator(), formBusiness);

formRouter.post("/create", formController.createForm);
formRouter.get("/", formController.getAllForms);
