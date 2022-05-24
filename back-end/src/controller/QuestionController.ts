import { Request, Response } from "express";
import { QuestionBusiness } from "../business/QuestionBusiness";
import { IdGenerator } from "../services/generateId";
import { QuestionDTO } from "../types/DTO/QuestionDTO";

export class QuestionController {
  constructor(
    private idGenerator: IdGenerator,
    private questionBusiness: QuestionBusiness
  ) {}

  public createQuestion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { text } = req.body;
      const id = this.idGenerator.generateId();

      const question: QuestionDTO = {
        id,
        text,
      };

      await this.questionBusiness.createQuestion(question);

      res.status(201).send({ message: "Pergunta criada com sucesso." });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
}
