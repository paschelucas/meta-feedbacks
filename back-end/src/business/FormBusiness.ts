import { FormDatabase } from "../data/FormDatabase";
import { FormsAndItsQuestionsDatabase } from "../data/FormsAndItsQuestionsDatabase";
import { CustomError } from "../error/CustomError";
import { Form } from "../model/Form";
import { Authenticator } from "../services/Authenticator";
import { DeleteFormDTO } from "../types/DTO/DeleteFormDTO";
import { FormDTO } from "../types/DTO/FormDTO";

export class FormBusiness {
  constructor(
    private formDatabase: FormDatabase,
    private formsAndItsQuestionsDatabase: FormsAndItsQuestionsDatabase,
    private authenticator: Authenticator
  ) {}

  public createForm = async (form: FormDTO) => {
    try {
      const { formId, formName, token } = form;

      if (!token) {
        throw new CustomError(401, "Usuário não identificado.");
      }

      const tokenData = this.authenticator.getTokenData(token);
      if (tokenData.role !== "admin") {
        throw new CustomError(403, "Usuário não autorizado.");
      }

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

  public deleteForm = async (deleteFormInput: DeleteFormDTO): Promise<void> => {
    try {
      const { id, token } = deleteFormInput;

      
      if (!token) {
        throw new CustomError(401, "Usuário não identificado.");
      }
      
      const tokenData = this.authenticator.getTokenData(token);
      if (tokenData.role !== "admin") {
        throw new CustomError(403, "Usuário não autorizado.");
      }
      
      const [foundForm, selectedFormQuestions] = await Promise.all([
         this.formDatabase.getFormById(id),
         this.formsAndItsQuestionsDatabase.getQuestionsByFormId(id)
      ])

      if (!foundForm) {
        throw new CustomError(422, "Formulário não encontrado.");
      }

      for (let question of selectedFormQuestions) {
        await this.formsAndItsQuestionsDatabase.removeQuestionFromAForm(
          id,
          question.question_id
        );
      }

      await this.formDatabase.deleteForm(id);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
