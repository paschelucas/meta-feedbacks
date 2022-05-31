import { authenticationData } from "../../src/types/authenticationData";
import { UserRole } from "../../src/model/User";
export class AuthenticatorMock {
  public generate = (input: authenticationData): string => {
    return "token_mockado";
  };

  public getTokenData = (token: string): authenticationData  => {
    let userData;
    switch (token) {
      case "token_mockado":
        userData = {
          id: "id_mockado",
          role: UserRole.ADMIN,
        };
        break;
      case "token_mockado2":
        userData = {
          id: "id_mockado2",
          role: UserRole.GESTOR,
        };
        break;
      case "token_mockado3":
        userData = {
          id: "id_mockado3",
          role: UserRole.MENTOR,
        };
        break;
    }

    return userData as authenticationData;
  };
}
