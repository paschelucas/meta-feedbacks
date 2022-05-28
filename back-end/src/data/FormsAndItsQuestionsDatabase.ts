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

  public removeQuestionFromAForm = async (
    formId: string,
    questionId: string
  ): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME)
        .where("form_id", formId)
        .andWhere("question_id", questionId)
        .del();
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getQuestionsByFormId = async (formId: string): Promise<any> => {
    try {
      const questions = await this.connection(this.TABLE_NAME).where("form_id", formId).join(
        "questions",
        "forms_and_its_questions.question_id",
        "questions.question_id"
      );

      return questions;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public uniqueQuestionVerifier = async (
    formId: string,
    questionId: string
  ): Promise<FormAndItsQuestions[] | undefined> => {
    try {
      const [foundQuestion] = await await this.connection(this.TABLE_NAME)
        .where("form_id", formId)
        .andWhere("question_id", questionId);

      return foundQuestion;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
