import { FormAndItsQuestions } from "../model/FormAndItsQuestions";
import { BaseDatabase } from "./BaseDatabase";

export class FormsAndItsQuestionsDatabase extends BaseDatabase {
  protected TABLE_NAME = "forms_and_its_questions";

  public insertQuestionInAForm = async (
    formAndQuestions: FormAndItsQuestions
  ): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME).insert({
        bond_id: formAndQuestions.getBondId(),
        form_id: formAndQuestions.getFormId(),
        question_id: formAndQuestions.getQuestionId(),
      });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
