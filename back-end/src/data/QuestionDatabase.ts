import { Question } from "../model/Question";
import { BaseDatabase } from "./BaseDatabase";

export class QuestionDatabase extends BaseDatabase {
  protected TABLE_NAME = "questions";

  public createQuestion = async (question: Question): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME).insert({
        question_id: question.getId(),
        question_text: question.getText(),
      });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public uniqueQuestionVerifier = async (
    question: string
  ): Promise<Question | undefined> => {
    try {
      const [foundQuestion] = await this.connection(this.TABLE_NAME).where(
        "question_text",
        question
      );
        console.log(foundQuestion)
      return foundQuestion
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
