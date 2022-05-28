import express from "express";
import { FormBusiness } from "../business/FormBusiness";
import { FormController } from "../controller/FormController";
import { FormDatabase } from "../data/FormDatabase";
import { FormsAndItsQuestionsDatabase } from "../data/FormsAndItsQuestionsDatabase";
import { IdGenerator } from "../services/generateId";

export const formRouter = express.Router();

const formBusiness = new FormBusiness(new FormDatabase(), new FormsAndItsQuestionsDatabase());

const formController = new FormController(new IdGenerator(), formBusiness);

formRouter.post("/create", formController.createForm);
formRouter.get("/", formController.getAllForms);
formRouter.delete("/:id", formController.deleteForm);
