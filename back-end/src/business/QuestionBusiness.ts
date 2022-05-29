import { QuestionDatabase } from "../data/QuestionDatabase";
import { CustomError } from "../error/CustomError";
import { Question } from "../model/Question";
import { Authenticator } from "../services/Authenticator";
import { DeleteQuestionDTO } from "../types/DTO/DeleteQuestionDTO";
import { QuestionDTO } from "../types/DTO/QuestionDTO";
import { UpdateQuestionInputDTO } from "../types/DTO/UpdateQuestionInputDTO";

export class QuestionBusiness {
  constructor(
    private questionDatabase: QuestionDatabase,
    private authenticator: Authenticator
  ) {}

  public createQuestion = async (question: QuestionDTO): Promise<void> => {
    try {
      const { text, token } = question;

      if (!token) {
        throw new CustomError(401, "Usuário não identificado.");
      }

      const tokenData = this.authenticator.getTokenData(token);
      if (tokenData.role !== "admin") {
        throw new CustomError(403, "Usuário não autorizado.");
      }

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

  public getAllQuestions = async (): Promise<Question[]> => {
    try {
      const result = await this.questionDatabase.getAllQuestions();

      return result;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public updateQuestion = async (
    input: UpdateQuestionInputDTO
  ): Promise<void> => {
    try {
      const { id, newText, token } = input;

      if (!token) {
        throw new CustomError(401, "Usuário não identificado.");
      }

      const tokenData = this.authenticator.getTokenData(token);
      if (tokenData.role !== "admin") {
        throw new CustomError(403, "Usuário não autorizado.");
      }

      if (!newText) {
        throw new CustomError(
          422,
          "Por favor, insira um texto para atualizar a pergunta selecionada."
        );
      }

      const questionExists = await this.questionDatabase.getQuestionById(id);
      if (!questionExists) {
        throw new CustomError(404, "Pergunta não encontrada.");
      }

      await this.questionDatabase.updateQuestion(input);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public deleteQuestion = async (deleteQuestionInput: DeleteQuestionDTO): Promise<void> => {
    try {
      const {id, token} = deleteQuestionInput

      if (!token) {
        throw new CustomError(401, "Usuário não identificado.");
      }

      const tokenData = this.authenticator.getTokenData(token);
      if (tokenData.role !== "admin") {
        throw new CustomError(403, "Usuário não autorizado.");
      }
      
      if (!id) {
        throw new CustomError(
          422,
          "Por favor, selecione uma pergunta para excluir."
        );
      }

      const questionExists = await this.questionDatabase.getQuestionById(id);
      if (!questionExists) {
        throw new CustomError(404, "Pergunta não encontrada.");
      }

      await this.questionDatabase.deleteQuestion(id);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
