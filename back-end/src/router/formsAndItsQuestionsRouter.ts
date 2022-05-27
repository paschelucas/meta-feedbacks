import express from "express";
import { FormsAndItsQuestionsBusiness } from "../business/FormsAndItsQuestionsBusiness";
import { FormsAndItsQuestionsController } from "../controller/FormsAndItsQuestionsController";
import { FormDatabase } from "../data/FormDatabase";
import { FormsAndItsQuestionsDatabase } from "../data/FormsAndItsQuestionsDatabase";
import { QuestionDatabase } from "../data/QuestionDatabase";
import { IdGenerator } from "../services/generateId";

export const formsAndItsQuestionsRouter = express.Router();

const formsAndItsQuestionsBusiness = new FormsAndItsQuestionsBusiness(
  new FormsAndItsQuestionsDatabase(),
  new FormDatabase(),
  new QuestionDatabase()
);

const formsAndItsQuestionsController = new FormsAndItsQuestionsController(
  formsAndItsQuestionsBusiness,
  new IdGenerator()
);

formsAndItsQuestionsRouter.post("/:formId/insert", formsAndItsQuestionsController.insertQuestionInAForm)
