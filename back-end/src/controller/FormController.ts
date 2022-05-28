import { Request, Response } from "express";
import { FormBusiness } from "../business/FormBusiness";
import { IdGenerator } from "../services/generateId";
import { DeleteFormDTO } from "../types/DTO/DeleteFormDTO";
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
      const token = req.headers.authorization as string;


      const formInput: FormDTO = {
        formId,
        formName,
        token
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

  public deleteForm = async (req: Request, res: Response): Promise<void> => {
    try {
      const {id} = req.params;
      const token = req.headers.authorization as string;
      const deleteFormInput: DeleteFormDTO = {
        id,
        token
      };


      await this.formBusiness.deleteForm(deleteFormInput);

      res.status(200).send({message: "Formulário excluído com sucesso."})
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });

    }
  }
}
