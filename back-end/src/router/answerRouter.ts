import express from "express";
import { AnswerBusiness } from "../business/AnswerBusiness";
import { AnswerController } from "../controller/AnswerController";
import { AnswerDatabase } from "../data/AnswerDatabase";
import LeaguerDatabase from "../data/LeaguerDatabase";
import { QuestionDatabase } from "../data/QuestionDatabase";
import UserDatabase from "../data/UserDatabase";
import { IdGenerator } from "../services/generateId";

export const answerRouter = express.Router();

const answerBusiness = new AnswerBusiness(
  new AnswerDatabase(),
  new QuestionDatabase(),
  new LeaguerDatabase(),
  new UserDatabase()
);

const answerController = new AnswerController(
  new IdGenerator(),
  answerBusiness
);

answerRouter.post("/post", answerController.postAnswer);
answerRouter.get("/:leaguerId", answerController.getAnswersByLeaguerId);
