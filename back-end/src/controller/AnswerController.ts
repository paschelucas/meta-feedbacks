import { Request, Response } from "express";
import { AnswerBusiness } from "../business/AnswerBusiness";
import { IdGenerator } from "../services/generateId";
import { AnswerDTO } from "../types/DTO/AnswerDTO";

export class AnswerController {
  constructor(
    private idGenerator: IdGenerator,
    private answerBusiness: AnswerBusiness
  ) {}

  public postAnswer = async (req: Request, res: Response): Promise<void> => {
    try {
      const answerId = this.idGenerator.generateId();
      const { questionId, answerText, leaguerId, userId } = req.body;
      const answerInput: AnswerDTO = {
        answerId,
        questionId,
        answerText,
        leaguerId,
        userId,
      };
      await this.answerBusiness.postAnswer(answerInput);

      res.status(201).send({message: "Resposta postada com sucesso."})
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public getAnswersByLeaguerId = async (req: Request, res: Response): Promise<void> => {
    try {
      const leaguerId = req.params.leaguerId;

      const answers = await this.answerBusiness.getAnswersByLeaguerId(leaguerId);

      res.status(200).send({answers: answers})
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  }
}
