import { AnswerDTO } from "../../src/types/DTO/AnswerDTO";
import { answerMock, answerMock2 } from "./answerMock";

export class AnswerDatabaseMock {
  public postAnswer = async (): Promise<void> => {};

  public getAnswersByLeaguerId = async (
    id: string
  ): Promise<AnswerDTO[] | undefined> => {
    if (id === "id_mockado") {
      return [answerMock, answerMock2];
    }

    return undefined;
  };
}
