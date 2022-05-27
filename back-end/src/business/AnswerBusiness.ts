import { AnswerDatabase } from "../data/AnswerDatabase";
import LeaguerDatabase from "../data/LeaguerDatabase";
import { QuestionDatabase } from "../data/QuestionDatabase";
import UserDatabase from "../data/UserDatabase";
import { CustomError } from "../error/CustomError";
import { Answer } from "../model/Answer";
import { AnswerDTO } from "../types/DTO/AnswerDTO";

export class AnswerBusiness {
  constructor(
    private answerDatabase: AnswerDatabase,
    private questionDatabase: QuestionDatabase,
    private leaguerDatabase: LeaguerDatabase,
    private userDatabase: UserDatabase
  ) {}

  public postAnswer = async (answer: AnswerDTO): Promise<void> => {
    try {
      const { answerId, questionId, answerText, leaguerId, userId } = answer;

      if (!answerText) {
        throw new CustomError(422, "Por favor, digite uma resposta.");
      }

      const foundQuestion = await this.questionDatabase.getQuestionById(
        questionId
      );
      if (!foundQuestion) {
        throw new CustomError(404, "Pergunta não encontrada.");
      }

      const foundLeaguer = await this.leaguerDatabase.findLeaguerById(
        leaguerId
      );
      if (!foundLeaguer) {
        throw new CustomError(404, "Leaguer não encontrado.");
      }

      const foundUser = await this.userDatabase.getUserById(userId);
      if (!foundUser) {
        throw new CustomError(404, "Usuário não encontrado.");
      }

      const newAnswer = new Answer(
        answerId,
        questionId,
        answerText,
        leaguerId,
        userId
      );

      await this.answerDatabase.postAnswer(newAnswer);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public getAnswersByLeaguerId = async (id: string): Promise<Answer[]> => {
    try {
      if (!id) {
        throw new CustomError(422, "Id de leaguer não enviado.");
      }

      const answers = await this.answerDatabase.getAnswersByLeaguerId(id);

      return answers;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
