import { FormDatabase } from "../data/FormDatabase";
import { FormsAndItsQuestionsDatabase } from "../data/FormsAndItsQuestionsDatabase";
import { CustomError } from "../error/CustomError";
import { Form } from "../model/Form";
import { FormDTO } from "../types/DTO/FormDTO";

export class FormBusiness {
  constructor(private formDatabase: FormDatabase, private formsAndItsQuestionsDatabase: FormsAndItsQuestionsDatabase) {}

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

      return forms;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public deleteForm = async (formId: string): Promise<void> => {
    try {
      const foundForm = await this.formDatabase.getFormById(formId);
      if (!foundForm) {
        throw new CustomError(422, "Formulário não encontrado.");
      }

      const selectedFormQuestions = await this.formsAndItsQuestionsDatabase.getQuestionsByFormId(formId);

      for (let question of selectedFormQuestions) {
        await this.formsAndItsQuestionsDatabase.removeQuestionFromAForm(formId, question.question_id)
      }

      await this.formDatabase.deleteForm(formId)
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
