import { QuestionBusiness } from "../src/business/QuestionBusiness";
import { QuestionDTO } from "../src/types/DTO/QuestionDTO";
import { QuestionDatabaseMock } from "./mocks/QuestionDatabaseMock";
import { AuthenticatorMock } from "./mocks/AuthenticatorMock";
import { CustomError } from "../src/error/CustomError";
import { questionMock } from "./mocks/questionMock";
import { UpdateQuestionInputDTO } from "../src/types/DTO/UpdateQuestionInputDTO";
import { DeleteQuestionDTO } from "../src/types/DTO/DeleteQuestionDTO";

const questionBusinessMock = new QuestionBusiness(
  new QuestionDatabaseMock() as any,
  new AuthenticatorMock()
);

describe("Testes de registro de pergunta:", () => {
  test("Deve retornar um erro se o papel do usuário não for 'admin'.", async () => {
    expect.assertions;
    try {
      const input: QuestionDTO = {
        id: "id_mockado2",
        text: "texto_mockado2",
        token: "token_mockado2",
      };

      await questionBusinessMock.createQuestion(input);
    } catch (error: any) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual("Usuário não autorizado.");
        expect(error.statusCode).toBe(403);
      }
    }
  });

  test("Deve retornar um erro se o campo de texto não for preenchido.", async () => {
    expect.assertions;
    try {
      const input: QuestionDTO = {
        id: "id_mockado",
        text: "",
        token: "token_mockado",
      };

      await questionBusinessMock.createQuestion(input);
    } catch (error: any) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual("Por favor, digite uma pergunta.");
        expect(error.statusCode).toBe(422);
      }
    }
  });

  test("Deve registrar uma pergunta.", async () => {
    expect.assertions;
    try {
      const input: QuestionDTO = {
        id: "id_mockado",
        text: "texto_mockado",
        token: "token_mockado",
      };

      await questionBusinessMock.createQuestion(input);

      expect(questionBusinessMock.createQuestion).toBeCalled();
      expect(questionBusinessMock.createQuestion).toBeCalledWith(input);
    } catch (error: any) {}
  });
});

describe("Teste de retorno de todas as perguntas:", () => {
  test("Deve listar todas as perguntas", async () => {
    expect.assertions;
    try {
      const questions = await questionBusinessMock.getAllQuestions();

      expect(questions).toBeTruthy();
      expect(questions).toContain(questionMock);
    } catch (error) {}
  });
});

describe("Testes de edição de pergunta:", () => {
  test("Deve retornar um erro se o papel do usuário não for 'admin'.", async () => {
    expect.assertions;
    try {
      const input: UpdateQuestionInputDTO = {
        id: "id_mockado2",
        newText: "texto_mockado2",
        token: "token_mockado2",
      };

      await questionBusinessMock.updateQuestion(input);
    } catch (error: any) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual("Usuário não autorizado.");
        expect(error.statusCode).toBe(403);
      }
    }
  });

  test("Deve retornar um erro se a pergunta não existir.", async () => {
    expect.assertions;
    try {
      const input: UpdateQuestionInputDTO = {
        id: "id_mockado4",
        newText: "id_mockado",
        token: "token_mockado",
      };

      await questionBusinessMock.updateQuestion(input);
    } catch (error: any) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual("Pergunta não encontrada.");
        expect(error.statusCode).toBe(404);
      }
    }
  });

  test("Deve retornar um erro se o campo de texto não for preenchido.", async () => {
    expect.assertions;
    try {
      const input: QuestionDTO = {
        id: "id_mockado",
        text: "",
        token: "token_mockado",
      };

      await questionBusinessMock.createQuestion(input);
    } catch (error: any) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual("Por favor, digite uma pergunta.");
        expect(error.statusCode).toBe(422);
      }
    }
  });
});

describe("Testes de exclusão de pergunta:", () => {
  test("Deve retornar um erro se o papel do usuário não for 'admin'.", async () => {
    expect.assertions;
    try {
      const input: DeleteQuestionDTO = {
        id: "id_mockado2",
        token: "token_mockado2",
      };

      await questionBusinessMock.deleteQuestion(input);
    } catch (error: any) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual("Usuário não autorizado.");
        expect(error.statusCode).toBe(403);
      }
    }
  });

  test("Deve retornar um erro se a pergunta não existir.", async () => {
    expect.assertions;
    try {
      const input: DeleteQuestionDTO = {
        id: "id_mockado4",
        token: "token_mockado",
      };

      await questionBusinessMock.deleteQuestion(input);
    } catch (error: any) {
      if (error instanceof CustomError) {
        expect(error.message).toEqual("Pergunta não encontrada.");
        expect(error.statusCode).toBe(404);
      }
    }
  });
});
