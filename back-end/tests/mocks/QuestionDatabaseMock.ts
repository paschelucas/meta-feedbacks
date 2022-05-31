import { Question } from "../../src/model/Question";
import { QuestionDTO } from "../../src/types/DTO/QuestionDTO";
import { questionMock, questionMock2, questionMock3 } from "./questionMock";

export class QuestionDatabaseMock {
  public createQuestion = async (question: Question): Promise<void> => {};

  public getAllQuestions = async (): Promise<QuestionDTO[]> => {
    const result = new Array(questionMock, questionMock2, questionMock3);

    return result;
  };

  public updateQuestion = async (): Promise<void> => {};

  public deleteQuestion = async (): Promise<void> => {};

  public getQuestionById = async (id: string): Promise<QuestionDTO | undefined> => {
    if (id === 'id_mockado') {
        return questionMock
    } else if (id === 'id_mockado2') {
        return questionMock2
    } else if (id === 'id_mockado3'){
        return questionMock3
    }

    return undefined
  }
}
