import { Question } from "../model/Question";
import { UpdateQuestionInputDTO } from "../types/DTO/UpdateQuestionInputDTO";
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

  public getAllQuestions = async (): Promise<Question[]> => {
    try {
      const result = await this.connection(this.TABLE_NAME);

      return result;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public updateQuestion = async (
    input: UpdateQuestionInputDTO
  ): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME)
        .where("question_id", input.id)
        .update("question_text", input.newText);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public deleteQuestion = async (id: string): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME)
        .where("question_id", id)
        .del();
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public uniqueQuestionVerifier = async (
    question: string
  ): Promise<Question | undefined> => {
    try {
      const [foundQuestion] = await this.connection(this.TABLE_NAME).where(
        "question_text",
        question
      );

      return foundQuestion;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
  
  public getQuestionById = async (id: string): Promise<Question[] | undefined> => {
    try {
      const [question] = await this.connection(this.TABLE_NAME).where("question_id", id);

      return question
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
      
    }
  }
}
