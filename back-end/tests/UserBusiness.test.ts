import UserBusiness from "../src/business/UserBusiness";
import { CustomError } from "../src/error/CustomError";
import { HashManagerMock } from "./mocks/hashManagerMock";
import { IdGeneratorMock } from "./mocks/idGeneratorMock";
import { AuthenticatorMock } from "./mocks/AuthenticatorMock";
import UserDatabaseMock from "./mocks/UserDatabaseMock";
import { UserInputDTO } from "../src/types/DTO/UserInputDTO";
import { userMock1, userMock2, userMock3 } from "./mocks/userMock";
import { EditRoleInputDTO } from "../src/types/DTO/EditRoleInputDTO";
import { UserRole } from "../src/model/User";
import { EditPasswordInputDTO } from "../src/types/DTO/EditPasswordInputDTO";

 
 const userBusinessMock = new UserBusiness(
     new UserDatabaseMock() as any,
     new IdGeneratorMock(),
     new AuthenticatorMock(),
     new HashManagerMock()
 )
 
 describe("Teste de signUp", () => {
     test("Erro que deve retornar quando o nome está vazio", async () => {
         expect.assertions
         try {
            const input1: UserInputDTO = {
                name:"",
                email: "teste1@teste.com",
                password: "Teste1234",
                role: "admin"
            }
             await userBusinessMock.signUp(input1, "token_mockado")
         } catch (error) {
             if (error instanceof CustomError) {
                 expect(error.message).toEqual("Favor preencher todos os campos.")
                 expect(error.statusCode).toEqual(422)
             } else {
                 console.log(error)
             }
         }
     })
     test("Erro que deve retornar quando o email é inválido", async () => {
         expect.assertions
         try {
            const input2: UserInputDTO = {
                name:"Teste 01",
                email: "teste1@.testecom",
                password: "Teste1234",
                role: "admin"
            }
             await userBusinessMock.signUp(input2, "token_mockado")
         } catch (error) {
             if (error instanceof CustomError) {
                 expect(error.message).toEqual("Formato de email inválido.")
                 expect(error.statusCode).toEqual(422)
             } else {
                 console.log(error)
             }
         }
     })
     test("Erro que deve retornar quando a senha é inválida", async () => {
         expect.assertions
         try {
            const input3: UserInputDTO = {
                name:"Teste 01",
                email: "teste1@teste.com",
                password: "1234",
                role: "admin"
            }
             await userBusinessMock.signUp(input3, "token_mockado")
         } catch (error) {
             if (error instanceof CustomError) {
                 expect(error.message).toEqual("Senhas devem ter pelo menos 9 caracteres, conter um dígito, uma letra minúscula, uma maiúscula e pelo menos um dos seguintes caracteres especiais: '$', '*', '&', '@' e/ou '#'.")
                 expect(error.statusCode).toEqual(422)
             } else {
                 console.log(error)
             }
         }
     })
     test("Erro que deve retornar quando o tipo de usuário é inválido", async () => {
         expect.assertions
         try {
            const input3: UserInputDTO = {
                name:"Teste 01",
                email: "teste1@teste.com",
                password: "Teste1234",
                role: "adm"
            }
             await userBusinessMock.signUp(input3, "token_mockado")
         } catch (error) {
             if (error instanceof CustomError) {
                 expect(error.message).toEqual("Tipo de usuário inválido.")
                 expect(error.statusCode).toEqual(422)
             } else {
                 console.log(error)
             }
         }
     })
     test("Erro que deve retornar quando o usuário não possui autorização", async () => {
        expect.assertions
        try {
           const input3: UserInputDTO = {
               name:"Teste 01",
               email: "teste1@teste.com",
               password: "Teste1234",
               role: "admin"
           }
            await userBusinessMock.signUp(input3, "token_mockado3")
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Usuário não autorizado.")
                expect(error.statusCode).toEqual(403)
            } else {
                console.log(error)
            }
        }
    })
     test("Sucesso no cadastro", async () => {
         expect.assertions
         try {
            const input4: UserInputDTO = {
            name:"Teste 01",
            email: "teste1@teste.com",
            password: "Teste1234",
            role: "admin"
        }

        await userBusinessMock.signUp(input4, "token_mockado")

         } catch (error) {
             console.log(error)
         }
     })
 })
 
 describe("Teste de login", () => {
     test("Erro que deve retornar quando o email fornecido não existe", async () => {
         expect.assertions
         try {
             const input1 = {
                 email: "bla@teste.com",
                 password: "User1234"
             }
             await userBusinessMock.login(input1)
         } catch (error) {
             if (error instanceof CustomError) {
                 expect(error.message).toEqual("Este usuário não está cadastrado.")
                 expect(error.statusCode).toEqual(404)
             } else {
                 console.log(error)
             }
         }
     })
     test("Erro que deve retornar quando a senha está errada", async () => {
         expect.assertions
         try {
            const input2 = {
                email: "user01@teste.com",
                password: "teste1234"
            }
             await userBusinessMock.login(input2)
         } catch (error) {
             if (error instanceof CustomError) {
                 expect(error.message).toEqual("Email ou senha incorretos.")
                 expect(error.statusCode).toEqual(403)
             } else {
                 console.log(error)
             }
         }
     })
     test("Sucesso no login e verificação do token de acesso", async () => {
         expect.assertions
         try {
            const input3 = {
                email: "user01@teste.com",
                password: "User1234"
            }
             const result = await userBusinessMock.login(input3)
             expect(result).toEqual({ 
             "name": "User 01",
             "role": "admin",
             "token": "token_mockado" })
         } catch (error) {
             console.log(error)
         }
     })
 })

 describe("Testes de retorno de todos os usuários", () => {
    test("Erro que deve retornar quando o usuário não possui autorização", async () => {
        expect.assertions
        try {
            await userBusinessMock.getAllUsers("token_mockado3")
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Usuário não autorizado.")
                expect(error.statusCode).toEqual(403)
            } else {
                console.log(error)
            }
        }
    })
    test("Deve listar todos os leaguers", async () => {
        expect.assertions;
        try {
          const users = await userBusinessMock.getAllUsers("token_mockado");
    
          expect(users).toBeTruthy();
          expect(users).toContain([userMock1, userMock2, userMock3]);
        } catch (error) {}
      })
 })

 describe("Testes de edição de tipo do user", () => {
    test("Deve retornar um erro se o tipo do usuário não for 'admin'.", async () => {
        expect.assertions;
        try {
          const input: EditRoleInputDTO = {
            userName:"User 02",
            newRole: "admin"
          };
    
          await userBusinessMock.editUserRole(input, "token_mockado3");
        } catch (error: any) {
          if (error instanceof CustomError) {
            expect(error.message).toEqual("Usuário não autorizado.");
            expect(error.statusCode).toBe(403);
          }
        }
    });

    test("Deve retornar um erro se o user não existir.", async () => {
        expect.assertions;
        try {
            const input: EditRoleInputDTO = {
                userName:"User Inexistente",
                newRole:"admin"
              };
    
          await userBusinessMock.editUserRole(input, "token_mockado");
        } catch (error: any) {
          if (error instanceof CustomError) {
            expect(error.message).toEqual("User não encontrado.");
            expect(error.statusCode).toBe(404);
          }
        }
    });

    test("Erro que deve retornar quando o tipo de usuário não é passado.", async () => {
        expect.assertions
        try {
            const input: EditRoleInputDTO = {
                userName:"User 02",
                newRole:""
              };
            await userBusinessMock.editUserRole(input, "token_mockado")
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Favor preencher todos os campos.")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    });

    test("Erro que deve retornar quando o tipo de usuário é inválido.", async () => {
        expect.assertions
        try {
            const input: EditRoleInputDTO = {
                userName:"User 02",
                newRole:"adm"
              };
            await userBusinessMock.editUserRole(input, "token_mockado")
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Tipo de usuário inválido.")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    })

    test("Sucesso na alteracão", async () => {
        expect.assertions
        try {
            const input: EditRoleInputDTO = {
                userName:"User 02",
                newRole:"admin"
              };
            await userBusinessMock.editUserRole(input, "token_mockado")

        } catch (error) {
            console.log(error)
        }
    })
});

describe("Testes de edição de senha do user", () => {
    test("Deve retornar um erro se o email não for passado.", async () => {
        expect.assertions;
        try {
            const input: EditPasswordInputDTO = {
                email:"",
                password:"User31234",
                new_password: "User3210"
              };
    
          await userBusinessMock.editPassword(input);
        } catch (error: any) {
          if (error instanceof CustomError) {
            expect(error.message).toEqual("Favor informar email e senha provisória.");
            expect(error.statusCode).toBe(422);
          }
        }
    });

    test("Erro que deve retornar quando a senha está errada", async () => {
        expect.assertions
        try {
            const input: EditPasswordInputDTO = {
                   email: "user03@teste.com",
                   password: "User31267",
                   new_password: "User3210"
               }
                await userBusinessMock.editPassword(input)
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Email ou senha provisória incorretos.")
                expect(error.statusCode).toEqual(403)
            } else {
                console.log(error)
            }
        }
    })

    test("Sucesso na alteracão", async () => {
        expect.assertions
        try {
             const input: EditPasswordInputDTO = {
                email: "user03@teste.com",
                password: "User31234",
                new_password: "User3210*"
            }
            const result = await userBusinessMock.editPassword(input)
                expect(result).toEqual({ 
                "name": "User 03",
                "role": "gestor",
                "token": "token_mockado" })
    
            } catch (error) {
                console.log(error)
            }
    })
});