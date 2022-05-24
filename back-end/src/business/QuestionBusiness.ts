import { QuestionDatabase } from "../data/QuestionDatabase";
import { CustomError } from "../error/CustomError";
import { Question } from "../model/Question";
import { QuestionDTO } from "../types/DTO/QuestionDTO";

export class QuestionBusiness {
  constructor(private questionDatabase: QuestionDatabase) {}

  public createQuestion = async (question: QuestionDTO): Promise<void> => {
    try {
      const { id, text } = question;

      if (!text) {
        throw new CustomError(422, "Por favor, digite uma pergunta.");
      }
      const foundQuestion = await this.questionDatabase.uniqueQuestionVerifier(
        question.text
      );

      if (foundQuestion) {
        throw new CustomError(422, "Esta pergunta já foi registrada.");
      }
      const newQuestion = new Question(question.id, question.text);

      await this.questionDatabase.createQuestion(newQuestion);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
