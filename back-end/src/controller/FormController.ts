import { Request, Response } from "express";
import { FormBusiness } from "../business/FormBusiness";
import { IdGenerator } from "../services/generateId";
import { FormDTO } from "../types/DTO/FormDTO";

export class FormController {
  constructor(
    private idGenerator: IdGenerator,
    private formBusiness: FormBusiness
  ) {}

  public createForm = async (req: Request, res: Response): Promise<void> => {
    try {
      const { formName } = req.body;
      const formId = this.idGenerator.generateId();

      const formInput: FormDTO = {
        formId,
        formName,
      };

      await this.formBusiness.createForm(formInput);

      res.status(201).send({ message: "Formulário criado com sucesso." });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public getAllForms = async (req: Request, res: Response): Promise<void> => {
    try {
      const forms = await this.formBusiness.getAllForms();

      res.status(200).send({forms: forms})
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
}
