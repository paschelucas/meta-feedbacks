import { QuestionDatabase } from "../data/QuestionDatabase";
import { CustomError } from "../error/CustomError";
import { Question } from "../model/Question";
import { QuestionDTO } from "../types/DTO/QuestionDTO";
import { UpdateQuestionInputDTO } from "../types/DTO/UpdateQuestionInputDTO";

export class QuestionBusiness {
  constructor(private questionDatabase: QuestionDatabase) {}

  public createQuestion = async (question: QuestionDTO): Promise<void> => {
    try {
      const { text } = question;

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
  
  public getAllQuestions = async (): Promise <Question[]> => {
    try {
      const result = await this.questionDatabase.getAllQuestions();

      return result
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
      
    }
  }
  
  public updateQuestion = async (input: UpdateQuestionInputDTO): Promise<void> => {
    try {
      const {id, newText} = input;

      if (!newText){
        throw new CustomError(422, "Por favor, insira um texto para atualizar a pergunta selecionada.")
      }

      const questionExists = await this.questionDatabase.getQuestionById(id);
      if (!questionExists){
        throw new CustomError(404, "Pergunta não encontrada.")
      }

      await this.questionDatabase.updateQuestion(input);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
      
    }
  }

  public deleteQuestion = async (id: string): Promise<void> => {
    try {

      if (!id){
        throw new CustomError(422, "Por favor, selecione uma pergunta para excluir.")
      }

      const questionExists = await this.questionDatabase.getQuestionById(id);
      if (!questionExists){
        throw new CustomError(404, "Pergunta não encontrada.")
      }

      await this.questionDatabase.deleteQuestion(id);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
      
    }
  }
}
