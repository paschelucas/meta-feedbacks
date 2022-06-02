import { AnswerBusiness } from "../src/business/AnswerBusiness";
import { CustomError } from "../src/error/CustomError";
import { AnswerDTO } from "../src/types/DTO/AnswerDTO";
import { AnswerDatabaseMock } from "./mocks/AnswerDatabaseMock";
import { answerMock } from "./mocks/answerMock";
import LeaguerDatabaseMock from "./mocks/LeaguerDatabaseMock";
import { QuestionDatabaseMock } from "./mocks/QuestionDatabaseMock";
import UserDatabaseMock from "./mocks/UserDatabaseMock";

const answerBusinessMock = new AnswerBusiness(
  new AnswerDatabaseMock() as any,
  new QuestionDatabaseMock() as any,
  new LeaguerDatabaseMock() as any,
  new UserDatabaseMock() as any
);

describe("Testes de respostas:", () => {
  test("Deve retornar um erro se o texto da resposta não for enviado.", async () => {
    expect.assertions;
    try {
      const input: AnswerDTO = {
        answerId: "id_mockado",
        questionId: "qId_mockado",
        answerText: "",
        answerDate: "data_mockada",
        leaguerId: "lId_mockado",
        userId: "uId_mockado",
      };

      await answerBusinessMock.postAnswer(input);
    } catch (error: any) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual("Por favor, digite uma resposta.");
        expect(error.statusCode).toBe(422);
      }
    }
  });

  test("Deve retornar um erro se a pergunta não for encontrada.", async () => {
    expect.assertions;
    try {
      const input: AnswerDTO = {
        answerId: "id_mockado",
        questionId: "abluble",
        answerText: "texto_mockado",
        answerDate: "data_mockada",
        leaguerId: "lId_mockado",
        userId: "uId_mockado",
      };

      await answerBusinessMock.postAnswer(input);
    } catch (error: any) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual("Pergunta não encontrada.");
        expect(error.statusCode).toBe(404);
      }
    }
  });

  test("Deve retornar um erro se o leaguer não for encontrad0.", async () => {
    expect.assertions;
    try {
      const input: AnswerDTO = {
        answerId: "id_mockado",
        questionId: "qId_mockado",
        answerText: "texto_mockado",
        answerDate: "data_mockada",
        leaguerId: "abluble",
        userId: "uId_mockado",
      };

      await answerBusinessMock.postAnswer(input);
    } catch (error: any) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual("Leaguer não encontrado.");
        expect(error.statusCode).toBe(404);
      }
    }
  });

  test("Deve retornar um erro se o usuário não for encontrado.", async () => {
    expect.assertions;
    try {
      const input: AnswerDTO = {
        answerId: "id_mockado",
        questionId: "qId_mockado",
        answerText: "texto_mockado",
        answerDate: "data_mockada",
        leaguerId: "lId_mockado",
        userId: "abluble",
      };

      await answerBusinessMock.postAnswer(input);
    } catch (error: any) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual("Usuário não encontrado.");
        expect(error.statusCode).toBe(404);
      }
    }
  });

  test("Deve postar uma resposta.", async () => {
    expect.assertions;
    try {
      const input: AnswerDTO = {
        answerId: "id_mockado",
        questionId: "qId_mockado",
        answerText: "texto_mockado",
        answerDate: "data_mockada",
        leaguerId: "lId_mockado",
        userId: "uId_mockado",
      };

      await answerBusinessMock.postAnswer(input);
      expect(answerBusinessMock.postAnswer).toBeCalled();
      expect(answerBusinessMock.postAnswer).toBeCalledWith(input);
    } catch (error) {}
  });
});

describe("Testes de listagem de respostas com base no id do leaguer:", () => {
  test("Deve listar todas as respostas.", async () => {
    expect.assertions;
    try {
      const answers = await answerBusinessMock.getAnswersByLeaguerId(
        "lId_mockado"
      );
      expect(answerBusinessMock.getAnswersByLeaguerId).toBeCalled();
      expect(answers).toBeTruthy();
      expect(answers).toContain(answerMock);
    } catch (error) {}
  });
});
