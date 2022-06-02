import LeaguerBusiness from "../src/business/LeaguerBusiness";
import { CustomError } from "../src/error/CustomError";
import { IdGeneratorMock } from "./mocks/idGeneratorMock";
import { AuthenticatorMock } from "./mocks/AuthenticatorMock";
import LeaguerDatabaseMock from "./mocks/LeaguerDatabaseMock";
import { LeaguerInputDTO } from "../src/types/DTO/LeaguerInputDTO";
import UserDatabaseMock from "./mocks/UserDatabaseMock";
import { leaguerMock1, leaguerMock2, leaguerMock3 } from "./mocks/leaguerMock";
import { EditLeaguerInputDTO } from "../src/types/DTO/EditLeaguerInputDTO";
import { FaseRole, TurmaRole } from "../src/model/Leaguer";
import { EditFaseInputDTO } from "../src/types/DTO/EditFaseInputDTO";
 
 const leaguerBusinessMock = new LeaguerBusiness(
     new LeaguerDatabaseMock() as any,
     new IdGeneratorMock(),
     new AuthenticatorMock(),
     new UserDatabaseMock() as any
 )
 
describe("Teste de createLeaguer", () => {
    test("Erro que deve retornar quando o nome está vazio", async () => {
        expect.assertions
        try {
        const input1: LeaguerInputDTO = {
            name:"",
            turma: "turma-1",
            fase: "labs",
            responsavel: "User 03"
        }
            await leaguerBusinessMock.createLeaguer(input1, "token_mockado")
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Favor preencher todos os campos.")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    });

    test("Erro que deve retornar quando tipo de turma é inválido", async () => {
        expect.assertions
        try {
        const input2: LeaguerInputDTO = {
            name:"Leaguer Teste",
            turma: "turma-teste",
            fase: "labs",
            responsavel: "User 03"
        }
            await leaguerBusinessMock.createLeaguer(input2, "token_mockado")
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Tipo de turma inválido.")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    });
     
    test("Erro que deve retornar quando o tipo de fase é inválido", async () => {
        expect.assertions
        try {
        const input3: LeaguerInputDTO = {
            name:"Leaguer Teste",
            turma: "turma-1",
            fase: "fase-teste",
            responsavel: "User 03"
        }
            await leaguerBusinessMock.createLeaguer(input3, "token_mockado")
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Tipo de fase inválido.")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    });

    test("Erro que deve retornar quando o usuário não possui autorização", async () => {
        expect.assertions
        try {
        const input3: LeaguerInputDTO = {
            name:"Leaguer Teste",
            turma: "turma-1",
            fase: "labs",
            responsavel: "User 03"
        }
            await leaguerBusinessMock.createLeaguer(input3, "token_mockado3")
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Usuário não autorizado.")
                expect(error.statusCode).toEqual(403)
            } else {
                console.log(error)
            }
        }
    });

    test("Sucesso no cadastro", async () => {
        expect.assertions
        try {
        const input4: LeaguerInputDTO = {
            name:"Leaguer Teste",
            turma: "turma-1",
            fase: "labs",
            responsavel: "User 03"
        }

        await leaguerBusinessMock.createLeaguer(input4, "token_mockado")
        } catch (error) {
             console.log(error)
        }
    });
});

describe("Teste de retorno de todos os leaguers", () => {
    test("Deve listar todos os leaguers", async () => {
      expect.assertions;
      try {
        const leaguers = await leaguerBusinessMock.getAllLeaguers("token_mockado");
  
        expect(leaguers).toBeTruthy();
        expect(leaguers).toContain([leaguerMock1, leaguerMock2, leaguerMock3]);
      } catch (error) {}
    })
    test("Deve listar os leaguers pelos quais o usuário é responsável", async () => {
        expect.assertions;
        try {
          const leaguers = await leaguerBusinessMock.getAllLeaguers("token_mockado3");
    
          expect(leaguers).toBeTruthy();
          expect(leaguers).toContain(leaguerMock3);
        } catch (error) {}
      })

});

describe("Testes de edição de leaguer", () => {
    test("Deve retornar um erro se o tipo do usuário não for 'admin' ou 'mentor'.", async () => {
      expect.assertions;
      try {
        const input: EditLeaguerInputDTO = {
          id: "id_mockado2",
          name: "Leaguer2",
          turma: TurmaRole.TURMA1,
          fase: FaseRole.INTRO,
          responsavel: "User 03"
        };
  
        await leaguerBusinessMock.editLeaguer(input, "token_mockado3");
      } catch (error: any) {
        if (error instanceof CustomError) {
          expect(error.message).toEqual("Usuário não autorizado.");
          expect(error.statusCode).toBe(403);
        }
      }
    });
  
    test("Deve retornar um erro se o leaguer não existir.", async () => {
      expect.assertions;
      try {
        const input: EditLeaguerInputDTO = {
            id: "id_mockado8",
            name: "Leaguer2",
            turma: TurmaRole.TURMA1,
            fase: FaseRole.INTRO,
            responsavel: "User 03"
          };
  
        await leaguerBusinessMock.editLeaguer(input, "token_mockado");
      } catch (error: any) {
        if (error instanceof CustomError) {
          expect(error.message).toEqual("Leaguer não encontrado.");
          expect(error.statusCode).toBe(404);
        }
      }
    });
  
    test("Deve retornar um erro se o campo de responsável não for preenchido.", async () => {
      expect.assertions;
      try {
        const input: EditLeaguerInputDTO = {
            id: "id_mockado2",
            name: "Leaguer2",
            turma: TurmaRole.TURMA1,
            fase: FaseRole.INTRO,
            responsavel: ""
          };
  
        await leaguerBusinessMock.editLeaguer(input, "token_mockado");
      } catch (error: any) {
        if (error instanceof CustomError) {
          expect(error.message).toEqual("Favor preencher todos os campos.");
          expect(error.statusCode).toBe(422);
        }
      }
    });
});

describe("Testes de edição de fase do leaguer", () => {
    test("Deve retornar um erro se o tipo do usuário não for 'admin' ou 'mentor'.", async () => {
        expect.assertions;
        try {
          const input: EditFaseInputDTO = {
            leaguerId:"id_mockado",
            newFase:FaseRole.BETA
          };
    
          await leaguerBusinessMock.editLeaguerFase("token_mockado3", input);
        } catch (error: any) {
          if (error instanceof CustomError) {
            expect(error.message).toEqual("Usuário não autorizado.");
            expect(error.statusCode).toBe(403);
          }
        }
    });

    test("Deve retornar um erro se o leaguer não existir.", async () => {
        expect.assertions;
        try {
            const input: EditFaseInputDTO = {
                leaguerId:"id_mockado",
                newFase:FaseRole.BETA
              };
    
          await leaguerBusinessMock.editLeaguerFase("token_mockado", input);
        } catch (error: any) {
          if (error instanceof CustomError) {
            expect(error.message).toEqual("Leaguer não encontrado.");
            expect(error.statusCode).toBe(404);
          }
        }
    });

    test("Erro que deve retornar quando o tipo de fase não é passado.", async () => {
        expect.assertions
        try {
            const input3: EditFaseInputDTO = {
                leaguerId:"id_mockado",
                newFase:""
              };
            await leaguerBusinessMock.editLeaguerFase("token_mockado", input3)
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Favor informar id do leaguer e fase atualizada.")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    });

    test("Erro que deve retornar quando o tipo de fase é inválido.", async () => {
        expect.assertions
        try {
            const input3: EditFaseInputDTO = {
                leaguerId:"id_mockado",
                newFase:"avancado"
              };
            await leaguerBusinessMock.editLeaguerFase("token_mockado", input3)
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Tipo de fase inválido.")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    });
})