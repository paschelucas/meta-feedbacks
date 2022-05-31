import { Answer } from "../model/Answer";
import { BaseDatabase } from "./BaseDatabase";

export class AnswerDatabase extends BaseDatabase {
  protected TABLE_NAME = "answers";

  public postAnswer = async (answer: Answer): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME).insert({
        answer_id: answer.getAnswerId(),
        question_id: answer.getQuestionId(),
        answer_text: answer.getAnswerText(),
        leaguer_id: answer.getLeaguerId(),
        user_id: answer.getUserId(),
      });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getAnswersByLeaguerId = async (id: string): Promise<Answer[]> => {
    try {
      const answers = await this.connection(this.TABLE_NAME).where(
        "leaguer_id",
        id
      );

      return answers;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
