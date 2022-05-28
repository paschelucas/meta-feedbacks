import express from "express";
import { QuestionBusiness } from "../business/QuestionBusiness";
import { QuestionController } from "../controller/QuestionController";
import { QuestionDatabase } from "../data/QuestionDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/generateId";

export const questionRouter = express.Router();

const questionBusiness = new QuestionBusiness(new QuestionDatabase(), new Authenticator());
const questionController = new QuestionController(
  new IdGenerator(),
  questionBusiness
);

questionRouter.post("/create", questionController.createQuestion)
questionRouter.get("/", questionController.getAllQuestions)
questionRouter.put("/:id/update", questionController.updateQuestion)
questionRouter.delete("/:id", questionController.deleteQuestion)