import { Request, Response } from "express";
import { FormsAndItsQuestionsBusiness } from "../business/FormsAndItsQuestionsBusiness";
import { IdGenerator } from "../services/generateId";
import { InsertQuestionInAFormDTO } from "../types/DTO/InsertQuestionInAFormDTO";

export class FormsAndItsQuestionsController {
  constructor(
    private formAndItsQuestionsBusiness: FormsAndItsQuestionsBusiness,
    private idGenerator: IdGenerator
  ) {}

  public insertQuestionInAForm = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { formId } = req.params;
      const { questionId } = req.body;
      const bondId = this.idGenerator.generateId();

      const input: InsertQuestionInAFormDTO = {
        bondId,
        formId,
        questionId,
      };

      await this.formAndItsQuestionsBusiness.insertQuestionInAForm(input);

      res
        .status(201)
        .send({ message: "Pergunta inserida no formulário com sucesso." });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public removeQuestionFromAForm = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { formId } = req.params;
      const { questionId } = req.body;

      await this.formAndItsQuestionsBusiness.removeQuestionFromAForm(formId, questionId);

      res
        .status(200)
        .send({ message: "Pergunta removida do formulário com sucesso." });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public getQuestionsByFormId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { formId } = req.params;

      const questions = await this.formAndItsQuestionsBusiness.getQuestionsByFormId(formId);

      res
        .status(201)
        .send({ questions: questions });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });

    }
  }
}
