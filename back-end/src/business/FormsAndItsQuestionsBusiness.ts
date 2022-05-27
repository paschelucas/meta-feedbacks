import { FormDatabase } from "../data/FormDatabase";
import { FormsAndItsQuestionsDatabase } from "../data/FormsAndItsQuestionsDatabase";
import { QuestionDatabase } from "../data/QuestionDatabase";
import { CustomError } from "../error/CustomError";
import { FormAndItsQuestions } from "../model/FormAndItsQuestions";
import { InsertQuestionInAFormDTO } from "../types/DTO/InsertQuestionInAFormDTO";

export class FormsAndItsQuestionsBusiness {
  constructor(
    private formsAndItsQuestionsDatabase: FormsAndItsQuestionsDatabase,
    private formDatabase: FormDatabase,
    private questionDatabase: QuestionDatabase
  ) {}
  public insertQuestionInAForm = async (
    insertQuestionInAFormInput: InsertQuestionInAFormDTO
  ) => {
    try {
      const { bondId, formId, questionId } = insertQuestionInAFormInput;

      if (!formId || !questionId) {
        throw new CustomError(422, "Por favor, preencha todos os campos.");
      }
      
      const foundForm = await this.formDatabase.getFormById(formId);
      if (!foundForm) {
        throw new CustomError(404, "Formulário não encontrado.");
      }
  
      const foundQuestion = await this.questionDatabase.getQuestionById(
        questionId
      );
      if (!foundQuestion) {
        throw new CustomError(404, "Pergunta não encontrada.");
      }

      const newQuestionInAForm = new FormAndItsQuestions(
        bondId,
        formId,
        questionId
      );
      await this.formsAndItsQuestionsDatabase.insertQuestionInAForm(
        newQuestionInAForm
      );
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
