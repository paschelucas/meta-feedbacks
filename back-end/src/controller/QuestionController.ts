import { Request, Response } from "express";
import { QuestionBusiness } from "../business/QuestionBusiness";
import { IdGenerator } from "../services/generateId";
import { DeleteFormDTO } from "../types/DTO/DeleteFormDTO";
import { DeleteQuestionDTO } from "../types/DTO/DeleteQuestionDTO";
import { QuestionDTO } from "../types/DTO/QuestionDTO";
import { UpdateQuestionInputDTO } from "../types/DTO/UpdateQuestionInputDTO";

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
      const token = req.headers.authorization as string;

      const question: QuestionDTO = {
        id,
        text,
        token
      };

      await this.questionBusiness.createQuestion(question);

      res.status(201).send({ message: "Pergunta criada com sucesso." });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public getAllQuestions = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const questions = await this.questionBusiness.getAllQuestions();

      res.status(200).send({ questions: questions });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public updateQuestion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const id = req.params.id;
      const { newText } = req.body;
      const token = req.headers.authorization as string;

      const updateQuestionInput: UpdateQuestionInputDTO = {
        id,
        newText,
        token
      };

      await this.questionBusiness.updateQuestion(updateQuestionInput);

      res.status(200).send({ message: "Pergunta atualizada com sucesso." });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public deleteQuestion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const id = req.params.id;
      const token = req.headers.authorization as string;

      const deleteQuestionInput: DeleteQuestionDTO = {
        id, token
      }
      await this.questionBusiness.deleteQuestion(deleteQuestionInput);


      res.status(200).send({ message: "Pergunta excluída com sucesso." });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
}
