import { FormDatabase } from "../data/FormDatabase";
import { CustomError } from "../error/CustomError";
import { Form } from "../model/Form";
import { FormDTO } from "../types/DTO/FormDTO";

export class FormBusiness {
  constructor(private formDatabase: FormDatabase) {}

  public createForm = async (form: FormDTO) => {
    try {
      const { formId, formName } = form;

      if (!formName) {
        throw new CustomError(
          422,
          "Por favor, insira um nome para o seu formulário."
        );
      }

      const foundForm = await this.formDatabase.getFormByName(formName);
      if (foundForm) {
        throw new CustomError(422, "Já existe um formulário com este nome.");
      }

      const newForm = new Form(formId, formName);
      await this.formDatabase.createForm(newForm);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public getAllForms = async (): Promise<Form[]> => {
    try {
      const forms = await this.formDatabase.getAllForms();

      return forms
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);

    }
  }
}
